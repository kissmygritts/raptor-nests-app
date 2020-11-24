<template>
  <div class="flex flex-col w-0 flex-1 overflow-hidden">
    <!-- TODO: rename this component to map header -->
    <page-header
      @nav:toggle="toggleNav()"
      @search="zoomToLocation"
    />

    <!-- map -->
    <main class="flex-1 relative">
      <l-map
        ref="map"
        class="w-full"
        :zoom="zoom"
        :center="center"
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
              to="/nests/create"
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
      />

      <!-- slide over -->
      <slide-over
        :nest="activeNest"
        :visible="slider.visible"
        @slider:toggle="toggleSlider"
      />
    </main>

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
import MapMenuButton from '@/components/MapMenuButton.vue'
import PageHeader from '@/components/PageHeader.vue'
import SlideOver from '@/components/SlideOver.vue'

export default {
  name: 'Home',

  components: {
    LMarker,
    LGeoJson,
    LMap,
    LPopup,
    LTileLayer,
    MapMenuButton,
    PageHeader,
    SlideOver
  },

  data () {
    return {
      nests: [],
      zoom: 6,
      center: [38.8568, -115.7080],
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      activeNestId: null,
      coordinates: '0, 0',
      showInputLocation: false,
      slider: {
        visible: false
      }
    }
  },

  computed: {
    activeNest () {
      const nest = this.nests.filter(nest => nest.id === this.activeNestId)
      return {
        ...nest[0]
      }
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

    nestGeoJson () {
      const features = this.nests.map(nest => {
        return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [
              nest.long, nest.lat
            ]
          },
          properties: {
            nest_id: nest.id,
            habitat_category: nest.habitat_category,
            probable_origin: nest.probable_origin
          }
        }
      })

      const geojson = {
        type: 'FeatureCollection',
        features: features
      }

      return geojson
    },

    options () {
      return {
        onEachFeature: this.onEachFeature(),
        pointToLayer: this.pointToLayer()
      }
    }
  },

  methods: {
    zoomToLocation ({ type, term }) {
      if (type === 'id') {
        // TODO: what happens if nest id doesn't exist?
        const nest = this.nestGeoJson.features.filter(feature => {
          return feature.properties.nest_id === term
        })

        const coordinates = nest[0].geometry.coordinates
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
            this.activeNestId = feature.properties.nest_id
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
    }
  },

  async created () {
    const response = await fetch('http://localhost:3000/nests')
    const nests = await response.json()

    this.nests = nests
  }
}
</script>
