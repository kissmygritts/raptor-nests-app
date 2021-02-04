<template>
  <div class="rounded-lg bg-white overflow-hidden shadow">
    <h2 class="sr-only" id="profile-overview-title">Profile Overview</h2>
    <div class="bg-white p-6">
      <div class="sm:flex sm:items-center sm:justify-between">
        <div class="sm:flex sm:space-x-5">
          <div class="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
            <p class="text-sm font-medium text-gray-600">Raptor Nest ID:</p>
            <p class="text-xl font-bold text-olive-darkest sm:text-2xl font-mono">{{ nestId }}</p>
          </div>
        </div>
        <div class="mt-5 flex justify-center sm:mt-0">
          <button
            class="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            @click.prevent="emitEditNest()"
          >
            Edit Nest
          </button>
          <button
            class="flex justify-center items-center ml-2 px-4 py-2 rounded-md text-sm font-medium text-white bg-olive hover:bg-olive-darkest focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-olive"
            @click.prevent="emitAddVisit()"
          >
            Add Visit
          </button>
        </div>
      </div>
    </div>
    <div class="border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-4 sm:divide-y-0 sm:divide-x">
      <div class="px-6 py-4 text-sm font-medium text-center">
        <span class="text-gray-600">Nest Type: {{ nestType }}</span>
      </div>

      <div class="px-6 py-4 text-sm font-medium text-center">
        <span class="text-gray-600">Total Visits: {{ totalVisits }}</span>
      </div>

      <div class="px-6 py-4 text-sm font-medium text-center">
        <span class="text-gray-600">{{ location }}</span>
      </div>

      <div class="px-6 py-4 text-sm font-medium text-center">
        <span class="text-gray-600">Last Visit: {{ lastVisitDate }}</span>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'NestPageTitleCard',
  props: {
    nestId: {
      type: String,
      require: true
    },
    totalVisits: {
      type: Number,
      required: false,
      default: 1
    },
    lastVisitDate: {
      type: String,
      required: false,
      default: '--'
    },
    location: {
      type: String,
      required: false,
      default: '--'
    },
    nestType: {
      type: String,
      required: false,
      default: '--'
    }
  },
  methods: {
    emitAddVisit () {
      this.$emit('click:add-visit')
    },
    emitEditNest () {
      this.$emit('click:edit-nest')
    }
  }
}
</script>
