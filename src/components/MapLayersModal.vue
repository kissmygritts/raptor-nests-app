<template>
  <transition
    enter-active-class="ease-out duration-300"
    enter-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="ease-in duration-200"
    leave-class="opacity-100"
    leave-to-class="opacity-0"
  >
  <div
    v-if="visible"
    style="z-index: 5000;"
    class="fixed inset-0 overflow-y-auto"
  >
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <!--
        Modal panel, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          To: "opacity-100 translate-y-0 sm:scale-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100 translate-y-0 sm:scale-100"
          To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      -->
      <!-- <transition
        enter-active-class="ease-out duration-1000"
        enter-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enter-to-class="opacity-100 translate-y-0 sm:scale-100"
        leave-active-class="ease-in duration-1000"
        leave-class="opacity-100 translate-y-0 sm:scale-100"
        leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      > -->
        <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
          <div class="block absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              @click="emitToggle()"
            >
              <span class="sr-only">Close</span>
              <!-- Heroicon name: x -->
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="sm:flex sm:items-start">
            <div class="mt-3 sm:mt-0 sm:ml-4">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                Map Layers
              </h3>
              <div class="grid gap-4 grid-cols-2 sm:grid-cols-3 mt-8">
                <span
                  style="background: url(https://ndow-cdn.s3-us-west-2.amazonaws.com/maptile-previews/road.jpg)"
                  class="inline-block h-32 w-32 rounded bg-gray-200 hover:shadow-xl cursor-pointer"
                  @click="emitStyle('road')"
                >
                  <p class="py-1 px-2 bg-olive-darker text-white rounded-t">Road</p>
                </span>
                <span
                  style="background: url(https://ndow-cdn.s3-us-west-2.amazonaws.com/maptile-previews/topo.jpg)"
                  class="inline-block h-32 w-32 rounded bg-gray-200 hover:shadow-xl cursor-pointer"
                  @click="emitStyle('topo')"
                >
                  <p class="py-1 px-2 bg-olive-darker text-white rounded-t">Topo</p>
                </span>
                <span
                  style="background: url(https://ndow-cdn.s3-us-west-2.amazonaws.com/maptile-previews/satellite.jpg)"
                  class="inline-block h-32 w-32 rounded bg-gray-200 hover:shadow-xl cursor-pointer"
                  @click="emitStyle('satellite')"
                >
                  <p class="py-1 px-2 bg-olive-darker text-white rounded-t">Satellite</p>
                </span>
                <span
                  style="background: url(https://ndow-cdn.s3-us-west-2.amazonaws.com/maptile-previews/dark.jpg)"
                  class="inline-block h-32 w-32 rounded bg-gray-200 hover:shadow-xl cursor-pointer"
                  @click="emitStyle('dark')"
                >
                  <p class="py-1 px-2 bg-olive-darker text-white rounded-t">Dark</p>
                </span>
              </div>
            </div>
          </div>
          <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-olive text-base font-medium text-white hover:bg-olive-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
              Apply
            </button>
          </div>
        </div>
      <!-- </transition> -->
    </div>
  </div>
  </transition>
</template>

<script>
export default {
  name: 'MapLayersModal',
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data () {
    return {
      layerUrls: {
        road: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        topo: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
        satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      }
    }
  },
  methods: {
    emitStyle (style) {
      this.$emit('layers:change', this.layerUrls[style])
      this.emitToggle()
    },

    emitToggle () {
      this.$emit('layers:toggle')
    }
  }
}
</script>

<style>

</style>
