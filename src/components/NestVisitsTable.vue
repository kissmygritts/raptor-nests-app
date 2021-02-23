<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div class="flex flex-col w-full">
    <div class="-my-2 overflow-x-auto">
      <div class="py-2 align-middle inline-block w-full">
        <div class="sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Visit Date
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Species
                </th>
                <th scope="col" class="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Observers
                </th>
                <th scope="col" class="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Occupied
                </th>
                <th scope="col" class="relative px-6 py-3 w-10">
                  <span class="sr-only">More</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <template v-for="(visit, i) in visits">
                <nest-visits-table-row
                  :key="i"
                  :nest-visit="visit"
                  @click:toggle-details="showDetails"
                />
                <nest-visits-table-row-details
                  :key="visit.id"
                  :nest-visit="visit"
                  :visible="isVisible(visit.id)"
                />
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NestVisitsTableRow from '@/components/NestVisitsTableRow.vue'
import NestVisitsTableRowDetails from '@/components/NestVisitsTableRowDetails.vue'

export default {
  name: 'NestVisitsTable',

  components: {
    NestVisitsTableRow,
    NestVisitsTableRowDetails
  },

  props: {
    nestVisits: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      visibleId: null
    }
  },

  computed: {
    visits () {
      const compare = (a, b) => Date(b.visit_date) - Date(a.visit_date)

      return this.nestVisits.slice().sort(compare)
    }
  },

  methods: {
    showDetails ({ id }) {
      if (this.isVisible(id)) {
        this.visibleId = null
      } else {
        this.visibleId = id
      }
    },

    isVisible (id) {
      return this.visibleId === id
    }
  }
}
</script>
