<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
      <transition
        enter-active-class="transform transition ease-in-out duration-500 md:duration-700"
        enter-class="translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transform transition ease-in-out duration-500 md:duration-700"
        leave-class="translate-x-0"
        leave-to-class="translate-x-full"
      >
        <section
          v-if="visible"
          style="z-index: 2000;"
          class="absolute inset-y-0 right-0 max-w-full flex"
          aria-labelledby="slide-over-heading"
        >
          <div class="w-screen max-w-full md:max-w-md">
            <div class="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl">
              <div class="min-h-0 flex-1 flex flex-col py-6 overflow-y-scroll">
                <div class="px-4 sm:px-6">
                  <div class="flex items-start justify-between">
                    <h2 id="slide-over-heading" class="text-lg font-medium text-gray-900">
                      Nest ID: <span class="font-mono">{{ nest.properties.id }}</span>
                    </h2>
                    <div class="ml-3 h-7 flex items-center">
                      <button
                        class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        @click="emitToggle()"
                      >
                        <span class="sr-only">Close panel</span>
                        <!-- Heroicon name: x -->
                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="mt-6 relative flex-1 px-4 sm:px-6">
                  <!-- Replace with your content -->
                  <div>
                    <ul class="divide-y divide-gray-200">

                      <li class="py-4">
                        <div class="flex space-x-3">
                          <div class="flex-1 space-y-1">
                            <div class="flex items-center justify-between">
                              <h3 class="font-medium">Nest Type</h3>
                            </div>
                            <p class="text-gray-500 capitalize">{{ nest.properties.nest_type }}</p>
                          </div>
                        </div>
                      </li>

                      <li class="py-4">
                        <div class="flex space-x-3">
                          <div class="flex-1 space-y-1">
                            <div class="flex items-center justify-between">
                              <h3 class="font-medium">Last Checked</h3>
                            </div>
                            <p class="text-gray-500 capitalize">{{ nest.properties.last_checked }}</p>
                          </div>
                        </div>
                      </li>

                      <li class="py-4">
                        <div class="flex space-x-3">
                          <div class="flex-1 space-y-1">
                            <div class="flex items-center justify-between">
                              <h3 class="font-medium">Last Species</h3>
                            </div>
                            <p class="text-gray-500 capitalize">{{ nest.properties.last_species }}</p>
                          </div>
                        </div>
                      </li>

                      <li class="py-4">
                        <div class="flex space-x-3">
                          <div class="flex-1 space-y-1">
                            <div class="flex items-center justify-between">
                              <h3 class="font-medium">Habitat Category</h3>
                            </div>
                            <p class="text-gray-500 capitalize">{{ nest.properties.habitat_category }}</p>
                          </div>
                        </div>
                      </li>

                      <li class="py-4">
                        <div class="flex space-x-3">
                          <div class="flex-1 space-y-1">
                            <div class="flex items-center justify-between">
                              <h3 class="font-medium">Probable Origin</h3>
                            </div>
                            <p class="text-gray-500 capitalize">{{ nest.properties.probable_origin }}</p>
                          </div>
                        </div>
                      </li>

                      <li class="py-4">
                        <div class="flex space-x-3">
                          <div class="flex-1 space-y-1">
                            <div class="flex items-center justify-between">
                              <h3 class="font-medium">Total Visits</h3>
                            </div>
                            <p class="text-gray-500 capitalize">{{ nest.properties.n_visits }}</p>
                          </div>
                        </div>
                      </li>

                      <li class="py-4">
                        <div class="flex space-x-3">
                          <div class="flex-1 space-y-1">
                            <div class="flex items-center justify-between">
                              <h3 class="font-medium">Coordinates</h3>
                            </div>
                            <p class="text-gray-500">LatLng: {{ geoCoords }}</p>
                            <p class="text-gray-500">UTM: {{ utmCoords }}</p>
                          </div>
                        </div>
                      </li>

                      <!-- More items... -->
                    </ul>
                  </div>
                  <!-- /End content -->
                </div>
              </div>
              <div class="flex-shrink-0 px-4 py-4 flex justify-end">
                <router-link
                  :to="{ name: 'nests-show', params: { id: nest.properties.id } }"
                  class="ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm font-medium rounded text-white bg-olive hover:bg-olive-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  View Nest
                </router-link>
                <!-- <button type="button" class="ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded text-white bg-olive hover:bg-olive-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-not-allowed">
                  Add Visit To Nest
                </button> -->
              </div>
            </div>
          </div>
        </section>
      </transition>
</template>

<script>
import { coordConverter } from '@/services/utm.js'

export default {
  name: 'SlideOver',
  props: {
    visible: {
      type: Boolean,
      default: true,
      required: true
    },
    nest: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  computed: {
    coordinates () {
      return this.nest.geometry.coordinates
    },
    geoCoords () {
      const [lng, lat] = this.coordinates
      return `${lng.toFixed(4)}, ${lat.toFixed(4)}`
    },
    utmCoords () {
      const [lng, lat] = this.coordinates
      const { utms } = coordConverter({
        x: lng,
        y: lat,
        proj: 'latlng'
      })
      return `${utms.x.toFixed(2)}, ${utms.y.toFixed(2)}`
    }
  },
  methods: {
    emitToggle () {
      this.$emit('slider:toggle')
    }
  }
}
</script>
