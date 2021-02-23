<template>
  <div class="flex flex-col w-0 flex-1 overflow-hidden">
    <page-header @nav:toggle="toggleNav()" />
    <div class="overflow-y-auto">
      <div class="container pt-12 mx-auto px-2 md:px-24 text-gray-900">
        <div id="FormTitleContainer" class="px-4">
          <h1 class="text-3xl">New Raptor Nest Data Entry</h1>

          <div class="space-y-2 mt-2 text-gray-700 font-light">
            <p>
              Use this form to enter new nests and nest visits to the Raptor Nest database.
              Required fields are marked, all other fields are optional. Please read the help
              text below each field name.
            </p>

            <p>
              If data is not noted, or not observed during data collection please leave the corresponding field blank.
            </p>

            <p>
              If you select "other" in any of the dropdown data fields please describe the meaning of other in the comments.
            </p>
          </div>

          <p v-show="formErrors" id="FormErrors" class="mt-4 -mx-2 p-2 font-light bg-red-100 text-red-700 rounded">
            Please correct the errors on the form and resubmit.
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
            ref="nestDetails"
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
            ref="locationDetails"
            class="my-4 md:my-8 md:mx-4"
            :current-location="true"
            @input:location-details="updateLocationDetails"
          />
        </collapsible-section>

        <!-- nest visit form -->
        <collapsible-section class="bg-white mt-4 p-2 md:p-4 rounded">
          <template v-slot:header>
            <h2 class="text-2xl">Nest Visit</h2>
          </template>

          <nest-visit-form
            ref="nestVisit"
            class="my-4 md:my-8 md:mx-4"
            @input:nest-visit="updateNestVisit"
          />
        </collapsible-section>

        <!-- data -->
        <pre v-if="isDev" class="text-left p-4">{{ nestInput }}</pre>

        <!-- Form submit error messages, response 400 or 500 -->
        <p v-show="errors.errorMessage" id="submission-errors" class="my-4 mx-4 p-2 font-light bg-red-100 text-red-700 rounded">
          There is a problem with the server. Please try again later.
        </p>

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
  </div>
</template>

<script>
/* eslint-disable */
import PageHeader from '@/components/PageHeader.vue'
import CollapsibleSection from '@/components/CollapsibleSection.vue'
import NestDetails from '@/components/forms/NestDetails.vue'
import LocationDetails from '@/components/forms/LocationDetails.vue'
import NestVisitForm from '@/components/forms/NestVisitForm.vue'
import generateId from '@/services/IdService.js'
// import api from '@/services/api.js'
import { submitNest } from '@/services/axios.js'
import { token } from '@/store/auth.js'

export default {
  name: 'NestsNew',
  components: {
    CollapsibleSection,
    LocationDetails,
    NestDetails,
    NestVisitForm,
    PageHeader
  },

  data () {
    return {
      ids: {
        nest_id: null,
        location_id: null,
        visit_id: null
      },
      nestDetails: null,
      locationDetails: null,
      nestVisit: null,
      formErrors: false,
      errors: {
        errorMessage: false
      }
    }
  },

  computed: {
    ...token,

    nestInput () {
      return {
        id: this.ids.nest_id,
        ...this.nestDetails,
        location: this.locationInput,
        visit: this.visitInput
      }
    },

    locationInput () {
      return {
        id: this.ids.location_id,
        nest_id: this.ids.nest_id,
        ...this.locationDetails
      }
    },

    visitInput () {
      return {
        id: this.ids.visit_id,
        nest_id: this.ids.nest_id,
        location_id: this.ids.location_id,
        ...this.nestVisit
      }
    },

    isFormValid() {
      return !this.$refs.nestDetails.$v.$invalid
        && !this.$refs.locationDetails.$v.$invalid
        && !this.$refs.nestVisit.$v.$invalid
    },

    isDev () {
      return process.env.NODE_ENV === 'development'
    },
  },

  methods: {
    async submit () {
      // check for validations: $v.$touch on children
      this.$refs.nestDetails.$v.$touch()
      this.$refs.locationDetails.$v.$touch()
      this.$refs.nestVisit.$v.$touch()
      
      if (this.isFormValid) { // if no errors attempt to submit form
        let response
        try {
          response = await submitNest(this.nestInput, this.token)
          this.$router.push({ name: 'nests-show', params: { id: this.ids.nest_id }})
        } catch (e) {
          this.errors.errorMessage = true
          console.log(e)
        }
      } else { // form is invalid
        this.formErrors = true
        document.getElementById('FormTitleContainer').scrollIntoView({ behavior: 'smooth' })
      }
    },

    toggleNav () {
      this.$emit('nav:toggle')
    },

    updateLocationDetails (locationDetails) {
      this.locationDetails = locationDetails
    },

    updateNestDetails (nestDetails) {
      this.nestDetails = nestDetails
    },

    updateNestVisit (nestVisit) {
      this.nestVisit = nestVisit
    }
  },

  async mounted () {
    this.ids.nest_id = await generateId(6)
    this.ids.location_id = await generateId(16)
    this.ids.visit_id = await generateId(16)
  }
}
</script>
