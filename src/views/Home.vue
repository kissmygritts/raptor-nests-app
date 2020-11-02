<template>
  <div class="bg-blue-100 container mx-auto">
    <!-- map -->
    <l-map
      style="height: 400px; width: 100%"
      :zoom="zoom"
      :center="center"
    >
      <l-tile-layer :url="url" />
      <l-geo-json
        :geojson="nestGeoJson"
      />
    </l-map>

    <!-- list of nests -->
    <div class="mx-32">
      <h1 class="text-3xl mt-8">All Nests</h1>
      <ul>
        <li
          v-for="nest in nests"
          :key="nest.id"
        >
          <router-link :to="{ name: 'nests-show', params: { id: nest.id} }">
            Nest: {{ nest.id }}
          </router-link>
        </li>
      </ul>
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
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    }
  },

  computed: {
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
    }
  },

  async created () {
    const response = await fetch('http://localhost:3000/nests')
    const nests = await response.json()

    this.nests = nests
  }
}
</script>
