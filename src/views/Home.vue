<template>
  <div id="map-container">
    <!-- map -->
    <l-map
      class="w-full"
      :zoom="zoom"
      :center="center"
    >
      <l-tile-layer :url="url" />
      <l-geo-json
        :geojson="nestGeoJson"
        :options="options"
      />
    </l-map>

    <div
      id="map-popup"
      style="z-index: 999;"
      class="absolute bottom-0 my-4 ml-4 p-6 bg-white rounded shadow-xl border border-gray-400 text-gray-700"
      v-if="popupVisible"
    >
      <!-- close button -->
      <!-- <div class="absolute top-0 right-0">
        x
      </div> -->
      <h1><strong>NestID:</strong> {{ activeNest.id }}</h1>
      <p><strong>Last Visited:</strong> Nov, 1st 2020</p>
      <p><strong>Probable Origin:</strong> {{ activeNest.probable_origin }}</p>
      <p><strong>Nest Type:</strong> {{ activeNest.nest_type }}</p>

      <div class="mt-2 flex">
        <button
          class="mt-2 mr-2 text-olive border-0 py-1 px-4 hover:text-olive-darker rounded-sm text-base"
          @click="hidePopup()"
        >
          Close
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
import { LMap, LTileLayer, LGeoJson } from 'vue2-leaflet'

export default {
  name: 'Home',

  components: {
    LMap,
    LTileLayer,
    LGeoJson
  },

  data () {
    return {
      nests: [],
      zoom: 5,
      center: [38.8568, -115.7080],
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      popupVisible: false,
      activeNestId: null
    }
  },

  computed: {
    activeNest () {
      const nest = this.nests.filter(nest => nest.id === this.activeNestId)
      return {
        ...nest[0]
      }
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
