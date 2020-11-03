<template>
  <div class="flex flex-col">
    <span><strong>Nest ID:</strong> {{ nest.nest_id }}</span>
    <span><strong>Habitat Category:</strong> {{ nest.habitat_category }}</span>
    <span><strong>Probable Origin:</strong> {{ nest.probable_origin }}</span>
    <div class="mt-3">
      <button
        class="bg-blue-500 text-white border-0 py-1 px-4 focus:outline-none hover:bg-blue-600 rounded-sm text-base"
        @click="click()"
      >
        View Nest
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NestPopupConent',
  props: {
    nest: {
      type: Object,
      required: true
    }
  },
  methods: {
    click () {
      this.$emit('marker-click', this.nest.nest_id)
    }
  }
}
</script>

<style>

</style>
