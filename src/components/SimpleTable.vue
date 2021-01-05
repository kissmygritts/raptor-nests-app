<template>
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow-sm overflow-hidden border-b border-gray-200 sm:rounded">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  v-for="field in tableColumns"
                  :key="field"
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {{ field }}
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="row in tableRows" :key="row.id">
                <td v-for="field in tableColumns" :key="field" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ row[field] }}
                </td>
              </tr>
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
    tableColumns: {
      type: Array,
      require: true
    },
    tableRows: {
      type: Array,
      required: true
    }
  }

}
</script>
