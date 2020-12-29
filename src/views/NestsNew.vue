<template>
  <div class="flex flex-col w-0 flex-1 overflow-hidden">
    <page-header @nav:toggle="toggleNav()" />

    <div class="container pt-12 mx-auto px-2 md:px-24 text-gray-900 overflow-y-auto">
      <div class="px-4">
        <h1 class="text-3xl">New Raptor Nest Data Entry</h1>
        <p class="mt-2 text-gray-700 font-light">
          Use this form to enter new nests and nest visits to the Raptor Nest database.
          Required fields are marked, all other fields are optional.
          For more information about how to properly fill out this form please review the documentation (here, link).
        </p>
      </div>

      <!-- nest details form -->
      <collapsible-section class="bg-white mt-12 p-2 md:p-4 rounded">
        <template v-slot:header>
          <h2 class="text-2xl">Nest Details</h2>
        </template>
        <p class="text-gray-700 font-light">
          Relatively unchanging information about a nest. This data should only be
          entered once for each nest. Then updated only when needed.
        </p>
        <p class="mt-1 text-gray-700 font-light">
          Auto-generated Nest ID: <span class="font-mono tracking-wide">{{ ids.nest_id }}</span>
        </p>

        <nest-details
          class="my-4 md:my-8 md:mx-4"
          @input:nest-details="updateNestDetails"
        />
      </collapsible-section>

      <!-- location details form -->
      <collapsible-section class="bg-white mt-4 p-2 md:p-4 rounded">
        <template v-slot:header>
          <h2 class="text-2xl">Location Details</h2>
        </template>

        <location-details
          class="my-4 md:my-8 md:mx-4"
          @input:location-details="updateLocationDetails"
        />
      </collapsible-section>

      <!-- data -->
      <pre class="text-left p-4">{{ $data }}</pre>

      <!-- submit buttons -->
      <div class="my-8 w-full flex justify-end">
        <button
          type="submit"
          class="text-white bg-olive border-0 py-2 px-6 focus:outline-none focus:ring-olive hover:bg-olive-darker rounded text-lg"
          @click.prevent="submit()"
        >
          Submit Nest
        </button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import PageHeader from '@/components/PageHeader.vue'
import CollapsibleSection from '@/components/CollapsibleSection.vue'
import NestDetails from '@/components/forms/NestDetails.vue'
import LocationDetails from '@/components/forms/LocationDetails.vue'
import generateId from '@/services/IdService.js'
import api from '@/services/api.js'

export default {
  name: 'NestsNew',
  components: {
    CollapsibleSection,
    LocationDetails,
    NestDetails,
    PageHeader
  },

  data () {
    return {
      ids: {
        nest_id: null,
        location_id: null
      },
      nestDetails: null,
      locationDetails: null,
    }
  },

  computed: {
    nestInput () {
      return {
        id: this.ids.nest_id,
        ...this.nestDetails
      }
    },

    locationInput () {
      return {
        id: this.ids.location_id,
        nestId: this.ids.nest_id,
        ...this.locationDetails
      }
    }
  },

  methods: {
    async submit () {
      await api.submitNest(this.nestInput)
      await api.submitNestLocation(this.locationInput)

      this.$router.push('/')
    },

    toggleNav () {
      this.$emit('nav:toggle')
    },

    updateLocationDetails (locationDetails) {
      this.locationDetails = locationDetails
    },

    updateNestDetails (nestDetails) {
      this.nestDetails = nestDetails
    }
  },

  async mounted () {
    this.ids.nest_id = await generateId(6)
    this.ids.location_id = await generateId(16)
  }
}
</script>
