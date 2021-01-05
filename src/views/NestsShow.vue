<template>
  <div class="flex flex-col w-0 flex-1 overflow-hidden">
    <page-header title="View Nest By Id" @nav:toggle="toggleNav()" />

    <!-- page container -->
    <div v-if="!hasNest">
      LOADING
    </div>
    <div v-else class="overflow-y-auto px-8 pt-12">
      <page-meta-title
        :nestId="nest.id"
        :totalVisits="totalVisits"
        :lastVisitDate="lastVisitDate"
        :location="lastLocation"
        :probableOrigin="nest.probable_origin"
      />

      <div class="container mx-auto mt-12">
        <!-- map -->
        <l-map
          ref="map"
          class="w-full shadow-sm"
          style="height: 375px;"
          :zoom="map.zoom"
          :center="map.center"
        >
          <l-tile-layer :url="map.url" />
          <l-geo-json :geojson="locationsGeoJson" :options="options" />
        </l-map>

        <!-- Nest visits section -->
        <div class="w-full mt-10">
          <!-- preamble -->
          <div>
            <h2 class="text-2xl">Nest Visits</h2>
            <p class="text-gray-700 font-light">
              The table below shows every visit to this nest. ...
            </p>
          </div>

          <!-- table -->
          <simple-table
            class="mt-6"
            :table-rows="nest.nest_visits"
            :table-columns="['visit_date', 'observers', 'species', 'nest_condition', 'occupied']"
          />
        </div>

        <!-- Nearby nests -->
        <div class="w-full mt-10">
          <!-- preamble -->
          <div>
            <h2 class="text-2xl">Nearby Nests</h2>
            <p class="text-gray-700 font-light">
              The table below shows every visit to this nest. ...
            </p>
          </div>

          <!-- table -->
          <nearby-nests-table
            class="mt-6"
            :nearby-nests="nest.nearby_nests"
          />
        </div>

        <h2 class="text-2xl mt-12">All Data</h2>
        <pre>{{ nest }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import L from 'leaflet'
import {
  LMap,
  LTileLayer,
  LGeoJson
} from 'vue2-leaflet'
import PageHeader from '@/components/PageHeader'
import PageMetaTitle from '@/components/PageMetaTitle'
import SimpleTable from '@/components/SimpleTable'
import NearbyNestsTable from '@/components/NearbyNestsTable.vue'
import api from '@/services/api'

export default {
  name: 'NestsShow',

  components: {
    LMap,
    LTileLayer,
    LGeoJson,
    PageHeader,
    PageMetaTitle,
    SimpleTable,
    NearbyNestsTable
  },

  data () {
    return {
      loading: false,
      httpStatus: null,
      nest: undefined,
      map: {
        zoom: 6,
        center: [38.8568, -115.7080],
        url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
      }
    }
  },

  computed: {
    totalVisits () {
      return this.nest?.nest_visits.length
    },

    lastVisitDate () {
      return this.nest?.nest_visits[0]?.visit_date
    },

    hasNest () { return !!this.nest },

    lastLocation () {
      const { lat, lng } = this.nest?.locations[0]
      return `${lng.toFixed(4)}, ${lat.toFixed(4)}`
    },

    // geojson feature props
    locationsGeoJson () {
      if (this.hasNest) {
        const nestFeatures = this.nest.locations.map(feature => {
          return {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [feature.lng, feature.lat]
            },
            properties: {
              nest_id: feature.nest_id,
              loc_type: 'nest location'
            }
          }
        })

        const nearbyFeatures = this.nest.nearby_nests.map(feature => {
          return {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [feature.lng, feature.lat]
            },
            properties: {
              nest_id: feature.nest_id,
              loc_type: 'nearby nest'
            }
          }
        })

        return {
          type: 'FeatureCollection',
          features: [...nearbyFeatures, ...nestFeatures]
        }
      } else {
        return undefined
      }
    },

    options () {
      return {
        pointToLayer: this.pointToLayer(),
        style: this.geoJsonStyle()
      }
    }
  },

  methods: {
    pointToLayer () {
      return (geoJsonPoint, latlng) => {
        return L.circleMarker(latlng, {
          radius: 6,
          color: 'white',
          weight: 1,
          fillOpacity: 0.9
        })
      }
    },

    geoJsonStyle () {
      return (feature) => {
        switch (feature.properties.loc_type) {
          case 'nearby nest': return { fillColor: '#6b7280' }
          case 'nest location': return { fillColor: '#589fd6' }
        }
      }
    }
  },

  async mounted () {
    this.loading = true
    const response = await api.getNestById({ id: this.$route.params.id })
    this.nest = response.data
    this.httpStatus = response.statusCode
    this.loading = false
  }
}
</script>

<style>

</style>
