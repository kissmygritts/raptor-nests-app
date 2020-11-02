<template>
  <div class="container mx-auto mt-8 text-gray-700">
    <div class="mx-32">
      <h1 class="text-3xl mb-4">Nest View</h1>

      <p class="leading-loose"><strong class="mr-1">Nest ID:</strong> {{ nest.id }}</p>
      <p class="leading-loose"><strong class="mr-1">Location:</strong> {{ nest.location }}</p>
      <p class="leading-loose"><strong class="mr-1">Habitat Category:</strong> {{ nest.habitat_category }}</p>
      <p class="leading-loose"><strong class="mr-1">Habitat Description:</strong> {{ nest.habitat_description }}</p>
      <p class="leading-loose"><strong class="mr-1">Nest Substrate:</strong> {{ nest.nest_substrate }}</p>
      <p class="leading-loose"><strong class="mr-1">Nest Type:</strong> {{ nest.nest_type }}</p>
      <p class="leading-loose"><strong class="mr-1">Probable Origin:</strong>{{ nest.probable_origin }}</p>
      <p class="leading-loose"><strong class="mr-1">Nest Comments:</strong>{{ nest.nest_comments }}</p>
    </div>

    <!-- see nest observations -->
    <div class="mx-32 mt-16 mb-4">
      <h2 class="text-2xl">Nest Observations</h2>
      <p>
        Each time a nest is visited an observation is logged. All the observations
        for this nest are included in the table below.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NestsShow',

  data () {
    return {
      nest: ''
    }
  },

  async mounted () {
    const response = await fetch(`http://localhost:3000/nests/${this.$route.params.id}`)
    const nest = await response.json()
    this.nest = nest
  }
}
</script>

<style>

</style>
