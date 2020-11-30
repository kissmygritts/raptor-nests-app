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
      <div class="flex-1 flex">
        <form
          class="w-full flex md:ml-0"
          autocomplete="off"
          @submit.prevent="emitSearch()"
        >
          <label for="search_field" class="sr-only">Search</label>
          <div class="relative w-full text-gray-400 focus-within:text-gray-600">
            <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none">
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
              </svg>
            </div>
            <input
              type="search"
              id="search_field"
              class="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
              placeholder="Search for nest or zoom to coordinates"
              autocomplete="off"
              v-model="searchTerm"
            >
          </div>
        </form>
      </div>

      <!-- Right side of page header -->
      <div class="ml-4 flex items-center md:ml-6">
        <!-- zoom to location / search button -->
        <button
          class="p-2 text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:shadow-outline focus:text-gray-500"
          aria-label="Zoom To Location"
          @click="emitSearch()"
        >
          <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>

        <!-- add a new nest button -->
        <router-link
          to="/nests/create"
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
  data () {
    return {
      searchTerm: null
    }
  },

  computed: {
    search () {
      const search = this.searchTerm.split(':')

      return {
        type: search[0].trim(),
        term: search[1].trim()
      }
    }
  },

  methods: {
    emitSearch () {
      // TODO: convert utm to geo coords
      this.$emit('search', this.search)
      this.searchTerm = null
    },

    toggleNav () {
      this.$emit('nav:toggle')
    }
  }
}
</script>
