<template>
  <div class="min-h-screen w-full bg-gray-100 overflow-y-auto">
    <page-header title="View Nest By Id" />

    <!-- main page content section -->
    <main v-if="!hasNest" class="flex justify-center items-center w-full h-full">
      <div>
        LOADING
      </div>
    </main>
    <main v-else class="py-10">

      <!-- add visit slide over -->
      <div>
        <transition
          enter-active-class="transition-opacity ease-linear duration-300"
          enter-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition-opacity ease-linear duration-300"
          leave-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            v-if="slider.visible"
            class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            style="z-index: 5000;"
            aria-hidden="true"
          />
        </transition>

        <transition
          enter-active-class="transform transition ease-in-out duration-500 md:duration-700"
          enter-class="translate-x-full"
          enter-to-class="translate-x-0"
          leave-active-class="transform transition ease-in-out duration-500 md:duration-700"
          leave-class="translate-x-0"
          leave-to-class="translate-x-full"
        >
          <add-visit-slide-over
            v-if="slider.visible"
            :visible="slider.visible"
            :nest-id="nestId"
            :location-id="locationId"
            @slider:toggle="toggleSlider"
            @submit-visit="pushVisit"
          />
        </transition>
      </div>

      <!-- page title area -->
      <div class="max-w-3xl lg:max-w-7xl px-4 sm:px-6 mx-auto rounded">
        <nest-page-title-card
          :nest-id="nest.id"
          :total-visits="totalVisits"
          :location="lastLocation"
          :last-visit-date="lastVisitDate"
          :nest-type="nest.nest_type"
          @click:add-visit="toggleSlider()"
          @click:edit-nest="toggleEditNestVisible()"
        />
      </div>

      <!-- content sections - grid container -->
      <div class="mt-6 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">

        <!-- edit nest details -->
        <div
          v-if="editNest.visible"
          class="lg:col-start-1 lg:col-span-3 bg-white rounded shadow"
        >
          <nest-details-edit
            :nest-edit-details="nestEditDetails"
            @submit:nest-edit="pushNestEdits"
          />
        </div>

        <!-- left grid container -->
        <div class="space-y-6 lg:col-start-1 lg:col-span-2">

          <!-- nest map -->
          <section aria-labelledby="applicant-information-title">
            <div class="h-96 bg-white shadow sm:rounded">
              <l-map
                ref="map"
                class="w-full shadow-sm rounded"
                :zoom="map.zoom"
                :center="map.center"
                @ready="setMapBounds()"
              >
                <l-tile-layer :url="map.url" />
                <l-control-scale position="bottomleft" />
                <l-geo-json ref="geojson" :geojson="locationsGeoJson" :options="options" />
              </l-map>
            </div>
          </section>

          <!-- nearby nests-->
          <section aria-labelledby="notes-title">
            <div class="bg-white shadow sm:rounded sm:overflow-hidden">
              <div class="divide-y divide-gray-200">
                <div class="px-4 py-4 sm:px-6">
                  <h2 id="notes-title" class="text-lg font-medium text-gray-900">Nearby Nests</h2>
                </div>
                <nearby-nests-list class="mb-1" :nearby-nests="nest.nearby_nests" />
              </div>
            </div>
          </section>
        </div>

        <!-- right grid container -->
        <section aria-labelledby="nest-details-title" class="lg:col-start-3 lg:col-span-1">
          <div class="bg-white px-4 py-5 shadow sm:rounded sm:px-4">
            <h2 id="nest-details-title" class="text-lg font-medium text-gray-900">Nest Details</h2>

            <!-- Nest Detials -->
            <div class="mt-2 flow-root">
              <detail-list :detail-list="nestDetails" />
            </div>

          </div>
        </section>

        <!-- nest visits table -->
        <section aria-labelledby="nest-visits-title" class="lg:col-start-1 lg:col-span-3">
          <div class="bg-white shadow sm:rounded sm:overflow">
            <div class="divide-y divide-gray-200">
              <div class="px-4 py-4 sm:px-6">
                <h2 id="nest-visits-title" class="text-lg font-medium text-gray-900">Nest Visits</h2>
              </div>
              <nest-visits-table :nest-visits="nest.nest_visits" />
            </div>
          </div>
        </section>

      </div>
    </main>
  </div>
</template>

<script>
/* eslint-disable */
import L from 'leaflet'
import { LMap, LTileLayer, LGeoJson, LControlScale } from 'vue2-leaflet'
import PageHeader from '@/components/PageHeader.vue'
import DetailList from '@/components/DetailList.vue'
import NearbyNestsList from '@/components/NearbyNestsList.vue'
import NestPageTitleCard from '@/components/NestPageTitleCard.vue'
import AddVisitSlideOver from '@/components/AddVisitSlideOver.vue'
import NestDetailsEdit from '@/components/forms/NestDetailsEdit.vue'
import NestVisitsTable from '@/components/NestVisitsTable.vue'
import { getNestById } from '@/services/axios.js'
import { token } from '@/store/auth.js'

export default {
  name: 'NestsShow',

  components: {
    LMap,
    LTileLayer,
    LGeoJson,
    LControlScale,
    PageHeader,
    DetailList,
    NearbyNestsList,
    NestPageTitleCard,
    AddVisitSlideOver,
    NestDetailsEdit,
    NestVisitsTable
  },

  data () {
    return {
      loading: false,
      httpStatus: null,
      nest: undefined,
      map: {
        zoom: 6,
        center: [38.8568, -115.7080],
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
      },
      slider: {
        visible: false
      },
      editNest: {
        visible: false
      }
    }
  },

  computed: {
    ...token,

    nestDetails () {
      const {
        locations,
        nest_visits,
        nearby_nests,
        id,
        ...nestDetails } = this.nest

      const details = Object.keys(nestDetails).map((key) => {
        return {
          title: key.replace('_', ' '),
          content: nestDetails[key] || 'undefined'
        }
      })

      return details.sort((a, b) => {
        a = a.title.toUpperCase()
        b = b.title.toUpperCase()

        if (a < b) return -1
        if (a > b) return 1
        return 0
      })
    },

    nestEditDetails () {
      const {
        locations,
        nest_visits,
        nearby_nests,
        ...nestDetails } = this.nest

      return nestDetails
    },

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

    // slide over props
    nestId () {
      return this.nest?.id || ''
    },

    locationId () {
      return this.nest?.locations
        ?.filter(location => location.current_location)[0]?.id
    },

    // geojson feature props
    locationsGeoJson () {
      if (this.hasNest) {
        const nestFeatures = this.nest.locations.map(feature => {
          const currentLocation = feature.current_location ? 'current': 'historic'

          return {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [feature.lng, feature.lat]
            },
            properties: {
              nest_id: feature.nest_id,
              loc_type: currentLocation
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
              loc_type: 'nearby'
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
          // case 'nearby': return { fillColor: '#6b7280' }
          case 'historic': return { fillColor: '#0EA5E9' }
          case 'current': return { fillColor: '#F59E0B'}
          default: return { fillColor: '#64748B' }
        }
      }
    },

    toggleEditNestVisible () {
      this.editNest.visible = !this.editNest.visible
    },

    pushNestEdits (nest) {
      this.nest = Object.assign({}, this.nest, nest)
      this.toggleEditNestVisible()
    },

    toggleSlider () {
      this.slider.visible = !this.slider.visible
    },

    pushVisit (visit) {
      this.nest.nest_visits.push(visit)
    },

    setMapBounds () {
      this.$refs.map.setBounds(this.$refs.geojson.getBounds(), {
        padding: [1000, 1000]
      })
    }
  },

  async created () {
    this.loading = true
    const response = await getNestById(this.$route.params.id, this.token)
    this.nest = response.data
    this.httpStatus = response.statusCode
    this.loading = false
  }
}
</script>

<style>

</style>
