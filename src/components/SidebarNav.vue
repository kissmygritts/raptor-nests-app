<template>
  <div style="z-index: 4000;">
    <!-- mobile menu -->
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
                    exact
                  >
                    <!-- Heroicon name: globe -->
                    <svg class="mr-3 h-6 w-6 text-gray-300 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Map
                  </router-link>

                  <router-link
                    to="/nests/new"
                    class="group flex items-center px-2 py-2 text-sm leading-5 font-medium text-white rounded-md focus:outline-none hover:bg-oxford-lighter transition ease-in-out duration-150 cursor-not-allowed"
                  >
                    <!-- Heroicon name: document-text -->
                    <svg class="mr-3 h-6 w-6 text-gray-300 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Data Entry
                  </router-link>

                  <button
                    type="button"
                    class="group flex items-center px-2 py-2 text-sm leading-5 font-medium text-white rounded-md focus:outline-none hover:bg-oxford-lighter transition ease-in-out duration-150"
                    @click="logout()"
                  >
                    <svg class="mr-3 h-6 w-6 text-gray-300 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
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
      <div class="flex flex-col w-20">
        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <div class="flex flex-col h-0 flex-1">
          <div class="flex items-center h-16 flex-shrink-0 px-4 bg-oxford-darkest">
            <h1 class="text-gray-200 text-2xl w-full text-center">
              RN
            </h1>
          </div>
          <div class="flex-1 flex flex-col overflow-y-auto bg-oxford">
            <nav class="flex-1 py-4 bg-oxford space-y-1">

              <nav-item-link to="/" link-text="Maps">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </nav-item-link>

              <nav-item-link to="/nests/new" link-text="Data Entry">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </nav-item-link>

            </nav>

            <div class="py-4">
              <button
                type="button"
                class="w-full group flex flex-col items-center px-1 py-2 text-xs font-light text-gray-300 focus:outline-none hover:bg-oxford-lighter transition ease-in-out duration-150"
                @click="logout()"
              >
                <svg class="block h-8 w-8 text-gray-300 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <p class="block mt-1">
                  Logout
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavItemLink from '@/components/navigation/NavItemLink.vue'

export default {
  name: 'SidebarNav',

  props: {
    visible: {
      type: Boolean,
      default: true
    }
  },

  components: {
    NavItemLink
  },

  methods: {
    closeNav () {
      this.$emit('close')
    },

    logout () {
      this.$store.commit('user/CLEAR_USER_DATA')
    }
  }
}
</script>

<style scoped>
.router-link-active,
.router-link-active:hover,
.router-link-exact-active,
.router-link-exact-active:hover {
  @apply bg-oxford-darkest text-gray-100
}
</style>
