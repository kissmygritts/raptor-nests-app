<template>
  <div class="container mx-auto px-4 text-gray-900 overflow-y-auto">
    <nest-details
      class="my-8"
      @input="updateNestDetails"
    />

    <!-- submit buttons -->
    <div class="my-8 w-full flex justify-end">
      <button
        type="submit"
        class="text-white bg-olive border-0 py-2 px-6 focus:outline-none focus:ring-olive hover:bg-olive-darker rounded text-lg"
        @click.prevent="submitNest"
      >
        Submit Nest
      </button>
    </div>
  </div>
</template>

<script>
import NestDetails from '@/components/forms/NestDetails.vue'

export default {
  name: 'NestsNew',
  components: {
    NestDetails
  },

  data () {
    return {
      nestDetails: null
    }
  },

  methods: {
    async submitNest () {
      await fetch('http://localhost:3000/nests', {
        method: 'POST',
        body: JSON.stringify(this.nestDetails),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
    },

    updateNestDetails (nestDetails) {
      this.nestDetails = nestDetails
    }
  }
}
</script>

<style>

</style>
