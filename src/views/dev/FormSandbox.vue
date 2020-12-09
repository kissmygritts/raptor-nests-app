<template>
  <div class="w-full p-4 text-gray-700 overflow-y-auto">
    <h1 class="h-16 text-2xl text-gray-800">Forms</h1>

    <!-- forms go in here, separate by category/chunk/etc -->
    <!-- Nest Details -->
    <div>
      <h2 class="text-2xl text-gray-800">Nest Details Form</h2>
      <p class="pt-1">
        All the necessary form elements and functions for the nest details form portion.
      </p>

      <div class="bg-white rounded p-4 mt-4">
        <form @submit.prevent>
          <h2 class="text-2xl">Nest Details</h2>
          <p class="mt-2 text-sm">
            Relatively unchanging information about a nest. This data should only be
            entered once for each nest. Then updated only when needed.
          </p>
          <p class="mt-2 text-sm">
            Auto-generated Nest ID: <span class="font-mono">{{ nest_id }}</span>
          </p>

          <base-select
            :name="nestDetails.habitat_category.name"
            :label="nestDetails.habitat_category.label"
            :helptext="nestDetails.habitat_category.helptext"
            :options="nestDetails.habitat_category.options"
            v-model="nestDetails.model"
          />

          <base-input
            :name="nestDetails.habitat_description.name"
            :label="nestDetails.habitat_description.label"
            :helptext="nestDetails.habitat_description.helptext"
            :type="nestDetails.habitat_description.type"
            v-model="nestDetails.model"
          />

          <base-input
            :name="nestDetails.location_description.name"
            :label="nestDetails.location_description.label"
            :helptext="nestDetails.location_description.helptext"
            :type="nestDetails.location_description.type"
            v-model="nestDetails.model"
          />

          <base-select
            :name="nestDetails.nest_type.name"
            :label="nestDetails.nest_type.label"
            :helptext="nestDetails.nest_type.helptext"
            :options="nestDetails.nest_type.options"
            v-model="nestDetails.model"
          />

          <base-select
            :name="nestDetails.nest_substrate.name"
            :label="nestDetails.nest_substrate.label"
            :helptext="nestDetails.nest_substrate.helptext"
            :options="nestDetails.nest_substrate.options"
            v-model="nestDetails.model"
          />

          <base-select
            :name="nestDetails.probable_origin.name"
            :label="nestDetails.probable_origin.label"
            :helptext="nestDetails.probable_origin.helptext"
            :options="nestDetails.probable_origin.options"
            v-model="nestDetails.model"
          />

          <base-textarea
            rows="3"
            :name="nestDetails.nest_comments.name"
            :label="nestDetails.nest_comments.label"
            :helptext="nestDetails.nest_comments.helptext"
            v-model="nestDetails.model"
          />
        </form>

        <pre class="bg-gray-100 text-left my-4 p-4">{{ nestDetails.model }}</pre>
      </div>

    </div>

    <!-- Location Details -->
    <div class="mt-8">
      <h2 class="text-2xl text-gray-800">Location Details Form</h2>
      <p class="pt-1">
        Location input and details for the form.
      </p>

      <div class="bg-white rounded py-4 mt-4">
        <!-- location map -->
        <location-details />
      </div>
    </div>
  </div>
</template>

<script>
import generateId from '@/services/IdService.js'
import BaseInput from '@/components/form-elements/BaseInput.vue'
// import BaseRadio from '@/components/form-elements/BaseRadio.vue'
import BaseSelect from '@/components/form-elements/BaseSelect.vue'
import BaseTextarea from '../../components/form-elements/BaseTextarea.vue'
import LocationDetails from '@/components/forms/LocationDetails.vue'

const nestDetailsConfig = {
  nest_id: {
    name: 'nest_id',
    label: 'Nest ID',
    type: 'text',
    helptext: 'Autogenerated Nest ID. Cannot change this, shown for your information.'
  },
  habitat_category: {
    name: 'habitat_category',
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
    ]
  },
  habitat_description: {
    name: 'habitat_description',
    label: 'Habitat Description',
    type: 'text',
    helptext: 'General description of the habitat characteristics of the nest site location.',
    options: null
  },
  location_description: {
    name: 'location_description',
    label: 'Location Description',
    type: 'text',
    helptext: 'General description of the survey area location and relevant landmarks (e.g. mountain range, reivers, landscape features).',
    options: null
  },
  nest_substrate: {
    name: 'nest_substrate',
    label: 'Nest Substrate',
    type: 'select',
    helptext: 'The substrate upon which the nest is located. More specific details should be provided in the nest comments field.',
    options: [
      'Artificial',
      'Cliff',
      'Ground - surfact',
      'Ground - subterranean',
      'Outcrop',
      'Shrub',
      'Tree'
    ]
  },
  nest_type: {
    name: 'nest_type',
    label: 'Nest Type',
    type: 'select',
    helptext: null,
    options: [
      'Burrow',
      'Cavity',
      'Scrape',
      'Stick nest'
    ]
  },
  probable_origin: {
    name: 'probable_origin',
    label: 'Probable Origin',
    type: 'select',
    helptext: 'Select the species you believe initially constructed the nest. Probable origin is based on which species the observer believed to have initially constructed the nest. Variables such as size, material, and placement are considered when assessing probable origin',
    options: [
      'Accipter',
      'Accipter/Buteo',
      'Burrowing Owl',
      'Burrowing Owl',
      'Buteo',
      'Buteo/Corvid',
      'Corvid',
      'Eagle',
      'Eagle/Buteo',
      'Falcon',
      'Ferruginous Hawk',
      'Northern Goshawk',
      'Osprey',
      'Other'
    ]
  },
  nest_comments: {
    name: 'nest_comments',
    label: 'Nest Comments',
    type: 'textarea',
    helptext: 'Description of the unchanging characteristics of the nest itself. Including, but not limited to: tree or shrub species, height above grounde, etc.'
  }
}

export default {
  name: 'FormSandbox',

  components: {
    BaseSelect,
    BaseInput,
    BaseTextarea,
    LocationDetails
  },

  data () {
    return {
      nest_id: null,
      nestDetails: {
        ...nestDetailsConfig,
        model: {}
      }
    }
  },

  methods: {
    async generateId () {
      const id = await generateId()
      this.nest_id = id
    }
  },

  mounted () {
    this.generateId()
  }
}
</script>