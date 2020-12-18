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
                      Nest ID: <span class="font-mono">{{ nest.id }}</span>
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
                  <pre><code>{{ nest }}</code></pre>
                  <!-- /End replace -->
                </div>
              </div>
              <div class="flex-shrink-0 px-4 py-4 flex justify-end">
                <button type="button" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-not-allowed">
                  View Nest
                </button>
                <button type="button" class="ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-olive hover:bg-olive-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-not-allowed">
                  Add Visit To Nest
                </button>
              </div>
            </div>
          </div>
        </section>
      </transition>
</template>

<script>
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
  methods: {
    emitToggle () {
      this.$emit('slider:toggle')
    }
  }
}
</script>

<style>

</style>
