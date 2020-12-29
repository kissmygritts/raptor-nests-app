<template>
  <div>
    <form @submit.prevent class="space-y-4" novalidate>
      <tw-select
        :name="schema.habitat_category.name"
        :label="schema.habitat_category.label"
        :helptext="schema.habitat_category.helptext"
        :options="schema.habitat_category.options"
        v-model="model.habitat_category"
      />

      <tw-input
        :name="schema.habitat_description.name"
        :label="schema.habitat_description.label"
        :helptext="schema.habitat_description.helptext"
        :type="schema.habitat_description.type"
        v-model="model.habitat_description"
      />

      <tw-input
        :name="schema.location_description.name"
        :label="schema.location_description.label"
        :helptext="schema.location_description.helptext"
        :type="schema.location_description.type"
        v-model="model.location_description"
      />

      <tw-select
        :name="schema.nest_type.name"
        :label="schema.nest_type.label"
        :helptext="schema.nest_type.helptext"
        :options="schema.nest_type.options"
        :required="true"
        :has-error="$v.model.nest_type.$error"
        :is-invalid="$v.model.nest_type.$invalid"
        v-model="model.nest_type"
        @blur="$v.model.nest_type.$touch()"
      >
        <p v-if="!$v.model.nest_type.required">Nest Type is a required field.</p>
      </tw-select>

      <tw-select
        :name="schema.nest_substrate.name"
        :label="schema.nest_substrate.label"
        :helptext="schema.nest_substrate.helptext"
        :options="schema.nest_substrate.options"
        :required="true"
        :has-error="$v.model.nest_substrate.$error"
        :is-invalid="$v.model.nest_substrate.$invalid"
        v-model="model.nest_substrate"
        @blur="$v.model.nest_substrate.$touch()"
      >
        <p v-if="!$v.model.nest_substrate.required">Nest Substrate is a required field.</p>
      </tw-select>

      <tw-select
        :name="schema.probable_origin.name"
        :label="schema.probable_origin.label"
        :helptext="schema.probable_origin.helptext"
        :options="schema.probable_origin.options"
        v-model="model.probable_origin"
      />

      <base-textarea
        rows="3"
        :name="schema.nest_comments.name"
        :label="schema.nest_comments.label"
        :helptext="schema.nest_comments.helptext"
        v-model="model.nest_comments"
      />
    </form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import BaseTextarea from '@/components/form-elements/BaseTextarea.vue'

const nestDetailsConfig = {
  habitat_category: {
    name: 'habitat_category',
    label: 'Habitat Category',
    type: 'select',
    helptext: 'Select a description of the habitat surrounding the nest. Leave blank if not listed.',
    options: [
      '',
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
      '',
      'Artificial',
      'Cliff',
      'Ground - surface',
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
      '',
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
      '',
      'Accipter',
      'Accipter/Buteo',
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
  name: 'NestDetialsForm',

  components: {
    BaseTextarea
  },

  data () {
    return {
      schema: nestDetailsConfig,
      model: {
        habitat_category: null,
        habitat_description: null,
        location_description: null,
        nest_substrate: null,
        nest_type: null,
        probable_origin: null,
        nest_comments: null
      }
    }
  },

  validations: {
    model: {
      nest_substrate: { required },
      nest_type: { required }
    }
  },

  computed: {
    output () {
      return {
        ...this.model
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
