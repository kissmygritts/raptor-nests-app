<template>
  <div style="z-index: 4000;">

    <div class="md:hidden">
      <transition
        enter-active-class="transition-opacity ease-linear duration-300"
        enter-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity ease-linear duration-300"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          class="fixed inset-0 flex z-40"
          v-show="visible"
        >
          <div class="fixed inset-0">
            <div class="absolute inset-0 bg-gray-600 opacity-75"></div>
          </div>

          <transition
            enter-active-class="transition ease-in-out duration-300 transform"
            enter-class="-translate-x-full"
            enter-to-class="translate-x-0"
            leave-active-class="transition ease-in-out duration-300 transform"
            leave-class="translate-x-0"
            leave-to-class="-translate-x-full"
          >
            <div v-if="visible" class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-oxford">
              <div class="absolute top-0 right-0 -mr-14 p-1">
                <button
                  class="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600"
                  aria-label="Close sidebar"
                  @click="closeNav()"
                >
                  <svg class="h-6 w-6 text-white" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div class="flex-shrink-0 flex items-center px-4">
                <h1 class="text-gray-200 text-xl">
                  Raptor Nests
                </h1>
              </div>
              <div class="mt-5 flex-1 h-0 overflow-y-auto">
                <nav class="px-2 space-y-1">
                  <router-link
                    to="/"
                    class="group flex items-center px-2 py-2 text-sm leading-5 font-medium text-white rounded-md focus:outline-none hover:bg-oxford-lighter transition ease-in-out duration-150"
                  >
                    <!-- Heroicon name: globe -->
                    <svg class="mr-3 h-6 w-6 text-gray-300 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Map
                  </router-link>

                  <router-link
                    to="/table"
                    class="group flex items-center px-2 py-2 text-sm leading-5 font-medium text-white rounded-md focus:outline-none hover:bg-oxford-lighter transition ease-in-out duration-150"
                  >
                    <!-- Heroicon name: table -->
                    <svg class="mr-3 h-6 w-6 text-gray-300 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Table
                  </router-link>

                  <a href="#" class="group flex items-center px-2 py-2 text-sm leading-5 font-medium text-white rounded-md focus:outline-none hover:bg-oxford-lighter transition ease-in-out duration-150">
                    <!-- Heroicon name: document-text -->
                    <svg class="mr-3 h-6 w-6 text-gray-300 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Documentation
                  </a>
                </nav>
              </div>
            </div>
          </transition>
          <div class="flex-shrink-0 w-14">
            <!-- Dummy element to force sidebar to shrink to fit close icon -->
          </div>
        </div>
      </transition>
    </div>

    <!-- Static sidebar for desktop -->
    <div class="h-screen hidden md:flex md:flex-shrink-0">
      <div class="flex flex-col w-56">
        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <div class="flex flex-col h-0 flex-1">
          <div class="flex items-center h-16 flex-shrink-0 px-4 bg-oxford-darkest">
            <h1 class="text-gray-200 text-xl">
              Raptor Nests
            </h1>
          </div>
          <div class="flex-1 flex flex-col overflow-y-auto">
            <nav class="flex-1 px-2 py-4 bg-oxford space-y-1">
              <router-link
                to="/"
                class="group flex items-center px-2 py-2 text-sm leading-5 font-medium text-white rounded-md focus:outline-none hover:bg-oxford-lighter transition ease-in-out duration-150"
              >
                <!-- Heroicon name: globe -->
                <svg class="mr-3 h-6 w-6 text-gray-300 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Map
              </router-link>

              <router-link
                to="/table"
                class="group flex items-center px-2 py-2 text-sm leading-5 font-medium text-white rounded-md focus:outline-none hover:bg-oxford-lighter transition ease-in-out duration-150"
              >
                <!-- Heroicon name: table -->
                <svg class="mr-3 h-6 w-6 text-gray-300 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Table
              </router-link>

              <a href="#" class="group flex items-center px-2 py-2 text-sm leading-5 font-medium text-white rounded-md focus:outline-none hover:bg-oxford-lighter transition ease-in-out duration-150">
                <!-- Heroicon name: document-text -->
                <svg class="mr-3 h-6 w-6 text-gray-300 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Documentation
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SidebarNav',

  props: {
    visible: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    closeNav () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.router-link-exact-active,
.router-link-exact-active:hover {
  @apply bg-oxford-darkest text-gray-100
}
</style>
