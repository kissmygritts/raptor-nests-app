<template>
  <li>
    <a href="#" class="block hover:bg-gray-50">
      <div class="flex items-center px-4 py-2 sm:px-6">
        <div class="min-w-0 flex-1 flex items-center">

          <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-3 md:gap-4">
            <div>
              <p class="text-sm font-medium text-olive-darker truncate">NestID: {{ nest.nest_id }}</p>
            </div>
            <div class="hidden md:block">
              <div>
                <p class="text-sm text-gray-700">
                  {{ latLng }}
                </p>
              </div>
            </div>
            <div class="hidden md:block">
              <p class="text-sm text-gray-700">{{ distance }} meters</p>
            </div>
          </div>
        </div>
        <div>
          <!-- Heroicon name: solid/chevron-right -->
          <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
    </a>
  </li>
</template>

<script>
export default {
  name: 'NearbyNestListItem',
  props: {
    nest: {
      type: Object
    }
  },
  computed: {
    latLng () {
      return `${this.nest.lng.toFixed(4)}, ${this.nest.lat.toFixed(4)}`
    },
    distance () {
      return this.nest.distance.toFixed(2)
    }
  }
}
</script>
