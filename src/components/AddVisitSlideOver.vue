<template>
  <div class="fixed inset-0 overflow-hidden" style="z-index: 5000">
    <div class="absolute inset-0 overflow-hidden">

      <section
        class="absolute inset-y-0 right-0 max-w-full flex"
        aria-labelledby="slide-over-heading"
      >
        <div class="w-screen max-w-2xl">
          <div
            class="h-full flex flex-col bg-gray-100 shadow-xl overflow-y-scroll"
          >
            <div class="flex-1">

              <!-- Header -->
              <div class="px-4 py-6 bg-oxford-lighter sm:px-6">
                <div class="flex items-start justify-between space-x-3">
                  <div class="space-y-1">
                    <h2
                      id="slide-over-heading"
                      class="text-2xl font-medium text-gray-200"
                    >
                      Add a Visit to Nest: <span class="font-mono">{{ nestId }}</span>
                    </h2>
                    <p class="font-light text-gray-400">
                      Complete the form below to add a new visit to this nest.
                    </p>
                  </div>
                  <div class="h-7 flex items-center">
                    <button
                      class="bg-oxford-lighter rounded-md text-gray-200 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-oxford-lightest"
                      @click.prevent="emitToggle()"
                    >
                      <span class="sr-only">Close panel</span>
                      <!-- Heroicon name: x -->
                      <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <!-- form errors -->
              <error-text-container v-if="formErrors" class="my-4 mx-4">
                Please correct the errors on the form and resubmit.
              </error-text-container>

              <!-- form content container -->
              <div class="space-y-6 sm:space-y-0 sm:divide-y sm:divide-gray-200">
                <div class="bg-white rounded shadow-sm m-4 p-4">
                  <tw-checkbox
                    label="New Nest Location?"
                    name="update-nest-location"
                    helptext="Does this nest visit have new coordinates for the nest?"
                    :options="['yes']"
                    v-model="updateNestLocation"
                  />

                  <!-- nest location form -->
                  <location-details
                    v-if="hasNewLocation"
                    ref="locationDetails"
                    class="mt-6"
                    :current-location="hasNewLocation"
                    @input:location-details="updateLocation"
                  />
                </div>

                <div class="bg-white rounded shadow-sm m-4 p-4">
                  <nest-visit-form
                    ref="nestVisit"
                    @input:nest-visit="updateNestVisit"
                  />
                </div>
              </div>
            </div>

            <!-- Form submit error messages, response 400 or 500 -->
            <error-text-container v-if="submit.error" class="m-4">
              {{ submit.message }}
            </error-text-container>

            <!-- Action buttons -->
            <div
              class="flex-shrink-0 px-4 py-5 sm:px-6"
            >
              <div class="space-x-3 flex justify-end">
                <button
                  type="submit"
                  class="text-white bg-olive border-0 py-2 px-6 focus:outline-none focus:ring-olive hover:bg-olive-darker rounded text-lg"
                  @click.prevent="submitVisit()"
                >
                  Add Nest Visit
                </button>
              </div>
            </div>

            <pre v-if="isDev">{{ requestBody }}</pre>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import NestVisitForm from '@/components/forms/NestVisitForm.vue'
import LocationDetails from '@/components/forms/LocationDetails.vue'
import ErrorTextContainer from '@/components/notifications/ErrorTextContainer.vue'
import generateId from '@/services/IdService.js'
import { submitNestVisit } from '@/services/axios.js'
import { token, user } from '@/store/auth.js'

export default {
  name: 'SlideOver',

  components: {
    NestVisitForm,
    LocationDetails,
    ErrorTextContainer
  },

  props: {
    visible: {
      type: Boolean,
      default: true,
      required: true
    },
    nestId: {
      type: String,
      required: true
    },
    locationId: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      nestVisit: null,
      updateNestLocation: [],
      nestLocation: null,
      formErrors: false,
      errorMessage: null,
      ids: {
        new_visit_id: undefined,
        new_location_id: undefined
      },
      submit: {
        status: '',
        message: '',
        error: false
      }
    }
  },

  computed: {
    ...token,
    ...user,

    isFormValid () {
      return !this.$refs.nestVisit.$v.$invalid
    },

    isDev () {
      return process.env.NODE_ENV === 'development'
    },

    hasNewLocation () {
      return this.updateNestLocation.includes('yes')
    },

    requestBody () {
      const data = {
        visit: {
          id: this.ids.new_visit_id,
          nest_id: this.nestId,
          location_id: this.locationId,
          ...this.nestVisit,
          created_by: this.currentUser.sub
        }
      }

      if (this.hasNewLocation) {
        data.visit.location_id = this.ids.new_location_id
        data.location = {
          id: this.ids.new_location_id,
          nest_id: this.nestId,
          ...this.nestLocation,
          created_by: this.currentUser.sub
        }
      }

      return data
    }
  },

  methods: {
    emitToggle () {
      this.$emit('slider:toggle')
    },

    updateNestVisit (nestVisit) {
      this.nestVisit = nestVisit
    },

    updateLocation (nestLocation) {
      this.nestLocation = nestLocation
    },

    async submitVisit () {
      this.submit.status = 'PENDING'
      this.$refs.nestVisit.$v.$touch()

      if (!this.isFormValid) {
        this.formErrors = true
        document.getElementById('slide-over-heading').scrollIntoView({ behavior: 'smooth' })
        return new Error('The form is invalid')
      }

      try {
        const response = await submitNestVisit(this.requestBody, this.token)

        this.$emit('submit-visit', this.requestBody)
        this.emitToggle()

        return response
      } catch (e) {
        this.submit.status = 'ERROR'
        this.submit.message = 'The server threw an error. Please check the error logs and submit them to Mitchell Gritts.'
        this.submit.error = true

        console.error(e.response.data.message, { ...e.response })
      }

      // if (this.isFormValid) {
      //   const response = await api.submitNestVisit(this.requestBody)

      //   if (response.statusCode >= 400) {
      //     this.errorMessage = 'There was a problem submitting your form, Please try again.'
      //   } else {
      //     this.emitToggle()
      //     this.$emit('submit-visit', response.data)
      //   }
      // } else {
      //   this.formErrors = true
      //   document.getElementById('slide-over-heading').scrollIntoView({ behavior: 'smooth' })
      // }
    }
  },

  async created () {
    this.ids.new_visit_id = await generateId(16)
    this.ids.new_location_id = await generateId(16)
  }
}
</script>

<style>
</style>
