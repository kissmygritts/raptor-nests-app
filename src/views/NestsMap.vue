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
        <l-control-scale
          position="bottomleft"
          :maxWidth="250"
        />

        <l-geo-json
          :v-if="nestGeojson"
          :geojson="nestGeojson"
          :options="options"
        />

        <l-marker
          :visible="showInputLocation"
          :lat-lng.sync="coordinates"
          :draggable="true"
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
import { mapState, mapGetters } from 'vuex'
import L from 'leaflet'
import {
  LControlScale,
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
import geolocate from '@/services/geolocate.js'

export default {
  name: 'Home',

  components: {
    LControlScale,
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
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
      activeNestId: null,
      coordinates: {
        lat: 38.8568,
        lng: -115.7080
      },
      showInputLocation: false,
      slider: {
        visible: false
      },
      layers: {
        visible: false
      },
      geolocation: null
    }
  },

  computed: {
    ...mapGetters('nests', ['findNest']),

    activeNest () {
      return this.activeNestId ? this.findNest(this.activeNestId) : null
    },

    inputLocation () {
      return this.coordinates
    },

    options () {
      return {
        onEachFeature: this.onEachFeature(),
        pointToLayer: this.pointToLayer(),
        style: this.geoJsonStyle()
      }
    },

    ...mapState('nests', ['nestGeojson'])
  },

  methods: {
    toggleLayers () {
      this.layers.visible = !this.layers.visible
    },

    toggleNav () {
      this.$emit('nav:toggle')
    },

    toggleSlider () {
      this.slider.visible = !this.slider.visible
    },

    setLayerUrl (url) {
      this.url = url
    },

    zoomToLocation ({ type, value }) {
      if (type === 'id') {
        // TODO: what happens if nest id doesn't exist? Would be nice to flash a message
        const nest = this.nestGeojson.features.find(feature => {
          return feature.properties.id === value
        })

        const coordinates = nest.geometry.coordinates
        this.$refs.map.mapObject.flyTo([coordinates[1], coordinates[0]], 16)
      } else {
        this.coordinates = value
        this.addLocationMarker()
      }
    },

    addLocationMarker () {
      this.showInputLocation = false
      this.showInputLocation = true

      this.$refs.map.mapObject.flyTo(this.inputLocation, 13)
    },

    addMarkerAtCenter () {
      const center = this.$refs.map.mapObject.getCenter()
      const zoom = this.$refs.map.mapObject.getZoom()
      this.coordinates = center

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

    geoJsonStyle () {
      return (feature) => {
        switch (feature.properties.nest_type) {
          case 'burrow': return { fillColor: '#F59E0B' } // tw: light-amber-500
          case 'cavity': return { fillColor: '#A855F7' } // tw: purple-500
          case 'scrape': return { fillColor: '#10B981' } // tw: emerald-500
          case 'stick nest': return { fillColor: '#0EA5E9' } // tw: light-blue-500
          default: return { fillColor: '#64748B' } // tw: blue-gray-500
        }
      }
    },

    async locateMe () {
      const position = await geolocate()
      this.geolocation = position
      this.$refs.map.mapObject.flyTo({
        lat: position.lat,
        lng: position.lng
      }, 13)
    }
  },

  async created () {
    this.locateMe()
    this.$store.dispatch('nests/getNestsGeometry')
  }
}
</script>
