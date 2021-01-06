<template>
  <div class="fixed inset-0 overflow-hidden" style="z-index: 5000">
    <div class="absolute inset-0 overflow-hidden">

      <section
        class="absolute inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16"
        aria-labelledby="slide-over-heading"
      >
        <div class="w-screen max-w-2xl">
          <form
            class="h-full flex flex-col bg-gray-100 shadow-xl overflow-y-scroll"
          >
            <div class="flex-1">

              <!-- Header -->
              <div class="px-4 py-6 bg-oxford-lighter sm:px-6">
                <div class="flex items-start justify-between space-x-3">
                  <div class="space-y-1">
                    <h2
                      id="slide-over-heading"
                      class="text-lg font-medium text-gray-200"
                    >
                      Add a Visit to Nest: <span class="font-mono">{{ nestId }}</span>
                    </h2>
                    <p class="text-sm text-gray-400">
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

              <!-- Divider container -->
              <div class="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-gray-200">
                <div class="bg-white rounded shadow-sm m-4 p-4">
                  <nest-visit-form
                    ref="nestVisit"
                    @input:nest-visit="updateNestVisit"
                  />
                </div>
              </div>
            </div>

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
          </form>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import NestVisitForm from '@/components/forms/NestVisitForm.vue'
import generateId from '@/services/IdService.js'
import api from '@/services/api.js'

export default {
  name: 'SlideOver',

  components: {
    NestVisitForm
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
      visit_id: undefined
    }
  },

  computed: {
    isFormValid () {
      return !this.$refs.nestVisit.$v.$invalid
    },

    visitInput () {
      return {
        id: this.visit_id,
        nest_id: this.nestId,
        location_id: this.locationId,
        ...this.nestVisit
      }
    }
  },

  methods: {
    emitToggle () {
      this.$emit('slider:toggle')
    },

    updateNestVisit (nestVisit) {
      this.nestVisit = nestVisit
    },

    async submitVisit () {
      this.$refs.nestVisit.$v.$touch()

      if (this.isFormValid) {
        const response = await api.submitNestVisit(this.visitInput)
        this.emitToggle()

        // emit data
        console.log({ response })
        this.$emit('submit-visit', response.data)
      }
    }
  },

  async created () {
    this.visit_id = await generateId(16)
  }
}
</script>

<style>
</style>
