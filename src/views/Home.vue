<template>
  <div id="map-container">
    <!-- map -->
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
      <l-circle-marker
        :visible="showInputLocation"
        color="white"
        :weight="1"
        fill-color="#f29647"
        :fill-opacity="1"
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
      </l-circle-marker>

      <!-- coordinates input -->
      <div
        style="z-index: 500;"
        class="absolute top-0 right-0 w-1/4 p-2 rounded border-gray-400"
      >
        <div class="relative w-full rounded shadow-xl">
          <input
            type="text"
            class="text-sm relative w-full border rounded placeholder-gray-400 focus:border-olive focus:outline-none py-2 px-2"
            placeholder="Enter coordinates: x, y"
            v-model="coordinates"
          >

          <button
            class="absolute top-0 right-0 bg-olive text-sm px-4 h-full text-white rounded-r hover:bg-olive-darker"
            @click="addLocationMarker"
          >
            Zoom
          </button>

        </div>
      </div>

      <!-- + button -->
      <div
        style="z-index: 1001;"
        class="absolute bottom-0 right-0 p-6 border-gray-400"
      >
        <button
          class="bg-olive text-white w-12 h-12 rounded-full shadow-xl hover:bg-olive-darker"
          @click="addMarkerAtCenter()"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>
    </l-map>

    <!-- marker popup -->
    <div
      id="map-popup"
      style="z-index: 999;"
      class="absolute bottom-0 my-4 ml-4 p-6 bg-white rounded shadow-xl border border-gray-400 text-gray-700"
      v-if="popupVisible"
    >
      <!-- close button -->
      <button
        class="absolute top-0 right-0 h-6 w-6 bg-white text-olive hover:bg-olive hover:text-white rounded-tr"
        @click="hidePopup()"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
      <h1><strong>NestID:</strong> {{ activeNest.id }}</h1>
      <p><strong>Last Visited:</strong> Nov, 1st 2020</p>
      <p><strong>Probable Origin:</strong> {{ activeNest.probable_origin }}</p>
      <p><strong>Nest Type:</strong> {{ activeNest.nest_type }}</p>

      <div class="mt-2 flex">
        <button
          class="mt-2 mr-2 text-olive border-0 py-1 px-4 hover:text-olive-darker text-base cursor-not-allowed"
        >
          Add Observation
        </button>
        <router-link
              :to="{name: 'nests-show', params: {id: activeNestId }}"
              class="mt-2 bg-olive text-white border-0 py-1 px-4 focus:outline-none hover:bg-olive-darker rounded-sm text-base"
            >
              View Nest
            </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {
  LCircleMarker,
  LGeoJson,
  LMap,
  LPopup,
  LTileLayer
} from 'vue2-leaflet'

export default {
  name: 'Home',

  components: {
    LCircleMarker,
    LGeoJson,
    LMap,
    LPopup,
    LTileLayer
  },

  data () {
    return {
      nests: [],
      zoom: 6,
      center: [38.8568, -115.7080],
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      popupVisible: false,
      activeNestId: null,
      coordinates: null,
      showInputLocation: false
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
        onEachFeature: this.onEachFeature()
      }
    }
  },

  methods: {
    addLocationMarker () {
      this.showInputLocation = false
      this.showInputLocation = true

      this.$refs.map.mapObject.flyTo(this.inputLocation, 10)
    },

    addMarkerAtCenter () {
      const center = this.$refs.map.mapObject.getCenter()
      console.log(`${center.lng}, ${center.lat}`)

      this.coordinates = `${center.lng.toFixed(4)}, ${center.lat.toFixed(4)}`

      this.$nextTick(() => {
        this.showInputLocation = true
        this.$refs.map.mapObject.zoomIn(3)
      })
    },

    hidePopup () {
      this.popupVisible = false
    },

    onEachFeature () {
      return (feature, layer) => {
        layer.on({
          click: () => {
            this.popupVisible = true
            this.activeNestId = feature.properties.nest_id
          }
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
