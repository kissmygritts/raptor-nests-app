<template>
  <div
    class="relative flex-shrink-0 flex h-16 bg-white shadow"
    style="z-index: 3000;"
  >
    <!-- Menu open button, mobile only -->
    <button
      class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:bg-gray-100 focus:text-gray-600 md:hidden"
      aria-label="Open sidebar"
      @click="toggleNav()"
    >
      <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
      </svg>
    </button>

    <!-- Page header -->
    <div class="flex-1 px-4 flex justify-between">

      <!-- Form container, left side -->
      <div class="flex-1 flex items-center">
        <h1 class="text-xl tracking-wide text-gray-800">{{ title }}</h1>
      </div>

      <!-- Right side of page header -->
      <div class="ml-4 flex items-center md:ml-6">
        <!-- home button -->
        <router-link
          to="/"
          class="p-2 text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:shadow-outline focus:text-gray-500"
          aria-label="Add Nest"
        >
          <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </router-link>

        <router-link
          v-if="$route.name !== 'nests-new'"
          to="/nests/new"
          class="p-2 text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:shadow-outline focus:text-gray-500"
          aria-label="Add Nest"
        >
          <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
          </svg>
        </router-link>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'PageHeader',

  props: {
    title: {
      type: String,
      required: false,
      default: 'Data Entry'
    }
  },

  methods: {
    toggleNav () {
      this.$emit('nav:toggle')
    }
  }
}
</script>
