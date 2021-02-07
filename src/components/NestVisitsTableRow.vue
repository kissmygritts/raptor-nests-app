<template>
  <tr>
    <td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
      {{ nestVisit.visit_date }}
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
      {{ nestVisit.species }}
    </td>
    <td class="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-600">
      {{ nestVisit.observers }}
    </td>
    <td class="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {{ nestVisit.occupied }}
    </td>
    <td class="px-6 py-4 w-10 whitespace-nowrap text-right text-sm font-medium">
      <div class="w-6 h-6 text-gray-600 cursor-pointer" @click="toggleRowDetails()">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
        </svg>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'NestVisitsTableRow',

  props: {
    nestVisit: {
      type: Object,
      required: true
    }
  },

  methods: {
    toggleRowDetails () {
      this.$emit('click:toggle-details', { id: this.nestVisit.id })
    }
  }
}
</script>
