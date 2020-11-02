<template>
  <div class="bg-blue-100 container mx-auto">
    <!-- list of nests -->
    <div class="mx-32">
      <h1 class="text-3xl mt-8">All Nests</h1>
      <ul>
        <li
          v-for="nest in nests"
          :key="nest.id"
        >
          Nest: {{ nest.id }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',

  data () {
    return {
      nests: ''
    }
  },

  async mounted () {
    const response = await fetch('http://localhost:3000/nests')
    const nests = await response.json()

    this.nests = nests
  }
}
</script>
