<template>
  <div class="container mx-auto px-4 text-gray-900 overflow-y-auto">
    <!-- Form header -->
    <div class="my-4">
      <h1 class="text-3xl">
        Create a New Nest
      </h1>
      <p class="mt-2">
        Complete the form below to enter a new nest and nest visits.
      </p>
    </div>

    <!-- nest section -->
    <collapsible-section class="p-2" title="Nest Details">
      <p class="mt-2 text-sm text-gray-700">
        Relatively changing information about a nest
      </p>

      <!-- nest details section -->
      <collapsible-section class="p-2 mt-2" title="Habitat & Location">
        <div
          class="mt-2 md:grid md:grid-cols-3 md:gap-4"
        >
          <!-- section description -->
          <div class="md:col-span-1">
            <div class="px-4 sm:px-0">
              <p class="text-sm text-gray-600">
                Habitat and location characteristics for this nest.
              </p>
            </div>
          </div>

          <!-- form -->
          <div class="md:col-span-2 bg-white rounded shadow-lg px-4 pb-5">
            <form action="#" @submit.prevent>
              <base-select
                id="habitat_category"
                :label="habitat_category.label"
                :helptext="habitat_category.helptext"
                :options="habitat_category.options"
                v-model="habitat_category.value"
              />

              <base-input
                id="habitat_description"
                :label="habitat_description.label"
                :helptext="habitat_description.helptext"
                :type="habitat_description.type"
                :placeholder="habitat_description.placeholder"
                v-model="habitat_description.value"
              />

              <base-input
                id="location_description"
                :label="location_description.label"
                :helptext="location_description.helptext"
                :type="location_description.type"
                v-model="location_description.value"
              />
            </form>
          </div>
        </div>
      </collapsible-section>
    </collapsible-section>

    <!-- visit section -->
    <collapsible-section class="mt-6 p-2" title="Visit Details">
      <p class="mt-2 text-sm text-gray-700">
        Information to be recoded for each nest visit.
      </p>

      <!-- Visit details section -->
      <collapsible-section class="p-2 mt-2" title="Visit Details">
        <div class="mt-2 md:grid md:grid-cols-3 md:gap-4">
          <!-- section description -->
          <div class="md:col-span-1 px-4 sm:px-0">
            <p class="text-sm text-gray-600">
              Details about a particular visit to the nest.
            </p>
          </div>

          <!-- form -->
          <div class="md:col-span-2 bg-white rounded shadow-lg px-4 pb-5">
            <form action="#" @submit.prevent>
              <base-input
                id="visit_date"
                :label="visit_date.label"
                :type="visit_date.type"
                v-model="visit_date.value"
              />

              <base-input
                id="observers"
                :label="observers.label"
                :helptext="observers.helptext"
                :type="observers.type"
                :placeholder="observers.placeholder"
                v-model="observers.value"
              />

              <base-input
                id="agency"
                :label="agency.label"
                :type="agency.type"
                v-model="agency.value"
              />

              <base-select
                id="survey_type"
                :label="survey_type.label"
                :helptext="survey_type.helptext"
                :options="survey_type.options"
                v-model="survey_type.value"
              />

              <base-input
                id="source"
                :label="source.label"
                :helptext="source.helptext"
                :type="source.type"
                v-model="source.value"
              />
            </form>
          </div>
        </div>
      </collapsible-section>
    </collapsible-section>
  </div>
</template>

<script>
import BaseInput from '@/components/form-elements/BaseInput.vue'
import BaseSelect from '@/components/form-elements/BaseSelect.vue'
import CollapsibleSection from '@/components/form-elements/CollapsibleSection.vue'

const formConfig = {
  habitat_category: {
    label: 'Habitat Category',
    type: 'select',
    helptext: 'Select a description of the habitat surrounding the nest. Leave blank if not listed.',
    options: [
      'Agriculture',
      'Canyon',
      'Creosote scrub',
      'Desert wash',
      'Developed - other',
      'Grassland',
      'Joshua tree',
      'Mixed conifer',
      'Pinyon and/or Juniper',
      'Riparian - aspen',
      'Riparian - other',
      'Salt desert scrub',
      'Shoreline',
      'Sagebrush',
      'Other'
    ],
    value: 'Canyon'
  },
  habitat_description: {
    label: 'Habitat Description',
    type: 'text',
    placeholder: null,
    helptext: 'General description of the habitat characteristics of the nest site location.',
    value: null
  },
  location_description: {
    label: 'Location',
    type: 'text',
    helptext: 'General description of the survey area location and relevant landmarks (e.g. mountain range, reivers, landscape features).',
    value: null
  },
  visit_date: {
    label: 'Visit Date',
    type: 'date',
    value: null
  },
  observers: {
    label: 'Observers',
    type: 'text',
    placeholder: 'Mackenzie Jeffress; Kristy Klinger',
    helptext: 'Name of observer(s). If there are multiple observers separate by a semi-colon (;).',
    value: null
  },
  agency: {
    label: 'Agency',
    type: 'text',
    value: null
  },
  survey_type: {
    label: 'Survey Type',
    type: 'select',
    helptext: 'Select the best option for the type of survey this is.',
    options: ['Aerial', 'Boat', 'Ground - incidental', 'Ground - passive', 'Ground - broadcast', 'Not noted'],
    value: null
  },
  source: {
    label: 'Source',
    type: 'text',
    helptext: 'Description of the data source, project, and/or references. For example "2019 NDOW goshawk broadcast survey data form". Leave blank if not noted.',
    value: null
  }
}

export default {
  name: 'NestsNew',
  components: {
    BaseInput,
    BaseSelect,
    CollapsibleSection
  },
  data () {
    return {
      ...formConfig
    }
  },
  methods: {
    toggleSection () {
      this.sectionVisible = !this.sectionVisible
    }
  }
}
</script>

<style>

</style>
