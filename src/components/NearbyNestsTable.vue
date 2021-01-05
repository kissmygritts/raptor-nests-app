<template>
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow-sm overflow-hidden border-b border-gray-200 sm:rounded">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nest ID
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Coordinates
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Distance
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span class="sr-only">Link</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="nest in nests" :key="nest.nest_id">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ nest.nest_id }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ nest.coordinates }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ nest.distance }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <router-link
                    class="text-olive"
                    :to="{ name: 'nests-show', params: { id: nest.nest_id } }"
                  >
                    Go To Nest
                  </router-link>
                </td>
              </tr>

              <!-- More rows... -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SimpleTable',

  props: {
    nearbyNests: {
      type: Array,
      required: true
    }
  },

  computed: {
    nests () {
      return this.nearbyNests.map(nest => {
        const { lat, lng, distance } = nest
        return {
          nest_id: nest.nest_id,
          coordinates: `${lng.toFixed(4)}, ${lat.toFixed(4)}`,
          distance: `${distance.toFixed(2)} m`
        }
      })
    }
  }

}
</script>
