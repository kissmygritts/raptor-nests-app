<template>
  <div class="flex flex-col w-0 flex-1 overflow-hidden">
    <map-header
      @nav:toggle="toggleNav()"
      @search="zoomToLocation"
    />

    <!-- map -->
    <main class="flex-1 relative">
      <l-map
        ref="map"
        class="w-full"
        :zoom="map.zoom"
        :center="map.center"
        :options="map.options"
      >
        <l-tile-layer :url="url" />

        <l-geo-json
          :geojson="nestGeoJson"
          :options="options"
        />

        <l-marker
          :visible="showInputLocation"
          :lat-lng="inputLocation"
        >
          <l-popup
            v-if="showInputLocation"
          >
            <p>
              <strong>x:</strong> {{ inputLocation.lng }}, <strong>y:</strong> {{ inputLocation.lat }}
            </p>

            <router-link
              :to="{ name: 'nests-new', query: { ...inputLocation }}"
              style="color: white !important;"
              class="bg-olive visited:text-white border-0 py-2 px-4 focus:outline-none hover:bg-olive-darker rounded-sm text-base"
            >
              Add Nest at this Location
            </router-link>
          </l-popup>
        </l-marker>
      </l-map>

      <map-menu-button
        @map:add-marker="addMarkerAtCenter()"
        @map:geolocate="locateMe()"
        @map:open-layers="toggleLayers()"
      />

      <!-- slide over -->
      <slide-over
        :nest="activeNest"
        :visible="slider.visible"
        @slider:toggle="toggleSlider"
      />
    </main>

    <map-layers-modal
      :visible="layers.visible"
      @layers:toggle="toggleLayers"
      @layers:change="setLayerUrl"
    />

  </div>
</template>

<script>
import L from 'leaflet'
import {
  LMarker,
  LGeoJson,
  LMap,
  LPopup,
  LTileLayer
} from 'vue2-leaflet'
import MapLayersModal from '@/components/MapLayersModal.vue'
import MapMenuButton from '@/components/MapMenuButton.vue'
import MapHeader from '@/components/MapHeader.vue'
import SlideOver from '@/components/SlideOver.vue'
import api from '@/services/api.js'
import geolocate from '@/services/geolocate.js'
import { toGeojson } from '@/utils/parse-geobuf.js'

export default {
  name: 'Home',

  components: {
    LMarker,
    LGeoJson,
    LMap,
    LPopup,
    LTileLayer,
    MapLayersModal,
    MapMenuButton,
    MapHeader,
    SlideOver
  },

  data () {
    return {
      map: {
        zoom: 6,
        center: [38.8568, -115.7080],
        options: {
          preferCanvas: true
        }
      },
      url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      activeNestId: null,
      coordinates: '0, 0',
      showInputLocation: false,
      slider: {
        visible: false
      },
      layers: {
        visible: false
      },
      geolocation: null,
      nestGeoJson: null
    }
  },

  computed: {
    activeNest () {
      return this.nestGeoJson?.features.find(nest => nest.properties.id === this.activeNestId)
    },

    inputLocation () {
      const coords = (coords) => {
        const xy = coords.split(', ')
        return {
          lng: parseFloat(xy[0]) || 0,
          lat: parseFloat(xy[1]) || 0
        }
      }

      return this.coordinates
        ? coords(this.coordinates)
        : null
    },

    options () {
      return {
        onEachFeature: this.onEachFeature(),
        pointToLayer: this.pointToLayer()
      }
    }
  },

  methods: {
    toggleLayers () {
      this.layers.visible = !this.layers.visible
    },

    setLayerUrl (url) {
      this.url = url
    },

    zoomToLocation ({ type, term }) {
      if (type === 'id') {
        // TODO: what happens if nest id doesn't exist? Would be nice to flash a message
        const nest = this.nestGeoJson.features.find(feature => {
          return feature.properties.id === term
        })

        const coordinates = nest.geometry.coordinates
        this.$refs.map.mapObject.flyTo([coordinates[1], coordinates[0]], 10)
      } else {
        this.coordinates = term
        this.addLocationMarker()
      }
    },

    toggleNav () {
      this.$emit('nav:toggle')
    },

    toggleSlider () {
      this.slider.visible = !this.slider.visible
    },

    addLocationMarker () {
      this.showInputLocation = false
      this.showInputLocation = true

      this.$refs.map.mapObject.flyTo(this.inputLocation, 10)
    },

    addMarkerAtCenter () {
      const center = this.$refs.map.mapObject.getCenter()
      const zoom = this.$refs.map.mapObject.getZoom()
      this.coordinates = `${center.lng.toFixed(4)}, ${center.lat.toFixed(4)}`

      this.$nextTick(() => {
        this.showInputLocation = true

        if (zoom < 10) {
          this.$refs.map.mapObject.zoomIn(3)
        }
      })
    },

    onEachFeature () {
      return (feature, layer) => {
        layer.on({
          click: () => {
            this.slider.visible = true
            this.activeNestId = feature.properties.id
          }
        })
      }
    },

    pointToLayer () {
      return (geoJsonPoint, latlng) => {
        return L.circleMarker(latlng, {
          radius: 6,
          color: 'white',
          weight: 1,
          fillColor: '#589fd6',
          fillOpacity: 0.9
        })
      }
    },

    async locateMe () {
      const position = await geolocate()
      this.geolocation = position
      this.$refs.map.mapObject.flyTo({
        lat: position.lat,
        lng: position.lng
      }, 10)
    }
  },

  async created () {
    this.locateMe()

    // fetch nest geobuf, convert to geojson
    const buffer = await api.getNestsGeobuf()
    this.nestGeoJson = toGeojson(buffer)
  }
}
</script>
