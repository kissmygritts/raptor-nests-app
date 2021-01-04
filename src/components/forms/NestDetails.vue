<template>
  <div>
    <form @submit.prevent>
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
  </div>
</template>

<script>
import BaseInput from '@/components/form-elements/BaseInput.vue'
import BaseSelect from '@/components/form-elements/BaseSelect.vue'
import BaseTextarea from '@/components/form-elements/BaseTextarea.vue'

const nestDetailsConfig = {
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
  name: 'NestDetails',

  components: {
    BaseSelect,
    BaseInput,
    BaseTextarea
  },

  data () {
    return {
      nestDetails: {
        ...nestDetailsConfig,
        model: {}
      }
    }
  },

  computed: {
    output () {
      return {
        ...this.nestDetails.model
      }
    }
  },

  watch: {
    output (newOutput, oldOutput) {
      this.$emit('input:nest-details', this.output)
    }
  }
}
</script>
