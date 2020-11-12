<template>
  <div class="mt-12 px-12 text-gray-700">
    <h1 class="text-3xl">Raptor Nest Table</h1>
    <p>
      A table of all the raptor nest observations. Click view nests button to go to the nest page.
    </p>

    <!-- download buttons -->
    <div class="my-4">
      <button
        class="bg-olive text-white border-0 py-1 px-4 focus:outline-none hover:bg-olive-darker rounded-sm text-base cursor-not-allowed"
      >
        Download CSV
      </button>
      <button
        class="bg-olive text-white border-0 ml-2 py-1 px-4 focus:outline-none hover:bg-olive-darker rounded-sm text-base cursor-not-allowed"
      >
        Download Shapefile
      </button>
    </div>

    <!-- table -->
    <table class="min-w-full mt-4 mb-12">
      <thead>
        <tr>
          <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-800">
            ID
          </th>
          <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-800">
            Nest Category
          </th>
          <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-800">
            Nest Type
          </th>
          <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-800">
            Probable Origin
          </th>
          <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-800">
            Last Used
          </th>
          <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-800">
            Last Species
          </th>
          <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-800">
            Total Visits
          </th>
          <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-800">
            Actions
          </th>
        </tr>
      </thead>
      <tbody class="bg-white font-ligh">
        <tr v-for="nest in tableDisplay" :key="nest.id">
          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
            {{ nest.id }}
          </td>
          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
            {{ nest.habitat_category }}
          </td>
          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
            {{ nest.nest_type }}
          </td>
          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
            {{ nest.probable_origin }}
          </td>
          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
            {{ nest.last_use_date }}
          </td>
          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
            {{ nest.last_species }}
          </td>
          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
            {{ nest.total_visits }}
          </td>
          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
            <router-link
              :to="{name: 'nests-show', params: {id: nest.id}}"
              class="px-5 py-2 border-olive border text-olive rounded transition duration-300 hover:bg-olive hover:text-white focus:outline-none"
            >
              View Nest
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'NestsTable',

  data () {
    return {
      nests: []
    }
  },

  computed: {
    tableDisplay () {
      return this.nests.map(nest => {
        const lastUseDate = !nest.observations[0] ? '' : nest.observations[0].date
        const lastSpecies = !nest.observations[0] ? '' : nest.observations[0].species

        console.log(lastUseDate)

        return {
          id: nest.id,
          habitat_category: nest.habitat_category,
          nest_type: nest.nest_type,
          probable_origin: nest.probable_origin,
          last_use_date: lastUseDate,
          last_species: lastSpecies,
          total_visits: nest.observations.length
        }
      })
    }
  },

  async created () {
    const response = await fetch('http://localhost:3000/nests?_embed=observations')
    const nests = await response.json()
    this.nests = nests
  }
}
</script>

<style>

</style>
