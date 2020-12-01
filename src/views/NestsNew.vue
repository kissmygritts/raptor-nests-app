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
      <collapsible-section
        class="bg-white rounded shadow p-2 mt-2"
        title="Habitat & Location Details"
      >
        <div class="pb-5">
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
      </collapsible-section>
    </collapsible-section>

    <!-- visit section -->
    <collapsible-section
      class="mt-6 p-2"
      title="Visit Details"
    >
      <p class="mt-2 text-sm text-gray-700">
        Information to be recoded for each nest visit.
      </p>

      <collapsible-section
        class="bg-white rounded shadow p-2 mt-2"
        title="Visit Details"
      >

        <div class="pb-5">
          <form action="#" @submit.prevent>
            <base-input
              id="visit_date"
              :label="visit.visit_date.label"
              :type="visit.visit_date.type"
              v-model="visit.visit_date.value"
            />

            <base-input
              id="observers"
              :label="visit.observers.label"
              :helptext="visit.observers.helptext"
              :type="visit.observers.type"
              :placeholder="visit.observers.placeholder"
              v-model="visit.observers.value"
            />

            <base-input
              id="agency"
              :label="visit.agency.label"
              :type="visit.agency.type"
              v-model="visit.agency.value"
            />

            <base-select
              id="survey_type"
              :label="visit.survey_type.label"
              :helptext="visit.survey_type.helptext"
              :options="visit.survey_type.options"
              v-model="visit.survey_type.value"
            />

            <base-input
              id="source"
              :label="visit.source.label"
              :helptext="visit.source.helptext"
              :type="visit.source.type"
              v-model="visit.source.value"
            />
          </form>
        </div>
      </collapsible-section>

      <!-- Nest details -->
      <collapsible-section
        class="bg-white rounded shadow p-2 mt-4"
        title="Nest Details"
      >
        <div class="pb-5">
          <form action="#" @submit.prevent>
            <base-select
              :id="visit.nest_condition.name"
              :name="visit.nest_condition.name"
              :label="visit.nest_condition.label"
              :helptext="visit.nest_condition.helptext"
              :options="visit.nest_condition.options"
              v-model="req"
            />

            <base-select
              :id="visit.nest_size.name"
              :name="visit.nest_size.name"
              :label="visit.nest_size.label"
              :helptext="visit.nest_size.helptext"
              :options="visit.nest_size.options"
              v-model="req"
            />

            <base-radio
              :name="visit.decorations.name"
              :label="visit.decorations.label"
              :options="visit.decorations.options"
              v-model="req"
            />
          </form>
        </div>
      </collapsible-section>
    </collapsible-section>
  </div>
</template>

<script>
import BaseInput from '@/components/form-elements/BaseInput.vue'
import BaseRadio from '@/components/form-elements/BaseRadio.vue'
import BaseSelect from '@/components/form-elements/BaseSelect.vue'
import CollapsibleSection from '@/components/form-elements/CollapsibleSection.vue'
import visitFormConfig from '@/services/formNestVisits.js'

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
  }
}

export default {
  name: 'NestsNew',
  components: {
    BaseInput,
    BaseRadio,
    BaseSelect,
    CollapsibleSection
  },
  data () {
    return {
      ...formConfig,
      visit: visitFormConfig,
      req: {
        nest_size: 'Medium'
      }
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
