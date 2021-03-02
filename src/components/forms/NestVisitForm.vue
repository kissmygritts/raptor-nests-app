<template>
  <div>
    <form @submit.prevent class="space-y-4" novalidate autocomplete="off">
      <tw-input
        :name="schema.visit_date.name"
        :label="schema.visit_date.label"
        :type="schema.visit_date.type"
        :required="schema.visit_date.required"
        :has-error="$v.model.visit_date.$error"
        :is-invalid="$v.model.visit_date.$invalid"
        v-model="model.visit_date"
        @blur="$v.model.visit_date.$touch()"
      >
        <p v-if="!$v.model.visit_date.required">Visit Date is a required field.</p>
      </tw-input>

      <tw-input
        :name="schema.observers.name"
        :label="schema.observers.label"
        :type="schema.observers.type"
        :required="schema.observers.required"
        :helptext="schema.observers.helptext"
        :has-error="$v.model.observers.$error"
        :is-invalid="$v.model.observers.$invalid"
        v-model="model.observers"
        @blur="$v.model.observers.$touch()"
      >
        <p v-if="!$v.model.observers.required">Observers is a required field.</p>
      </tw-input>

      <tw-select
        :name="schema.agency.name"
        :label="schema.agency.label"
        :type="schema.agency.type"
        :helptext="schema.agency.helptext"
        :options="schema.agency.options"
        v-model="model.agency"
      />

      <tw-select
        :name="schema.survey_type.name"
        :label="schema.survey_type.label"
        :helptext="schema.survey_type.helptext"
        :options="schema.survey_type.options"
        :required="schema.survey_type.required"
        :has-error="$v.model.survey_type.$error"
        :is-invalid="$v.model.survey_type.$invalid"
        v-model="model.survey_type"
        @blur="$v.model.survey_type.$touch()"
      >
        <p v-if="!$v.model.survey_type.required">Survey Type is a required field.</p>
      </tw-select>

      <tw-input
        :name="schema.source.name"
        :label="schema.source.label"
        :type="schema.source.type"
        :helptext="schema.source.helptext"
        v-model="model.source"
      />

      <tw-select
        :name="schema.nest_condition.name"
        :label="schema.nest_condition.label"
        :helptext="schema.nest_condition.helptext"
        :options="schema.nest_condition.options"
        v-model="model.nest_condition"
      />

      <tw-select
        :name="schema.nest_size.name"
        :label="schema.nest_size.label"
        :helptext="schema.nest_size.helptext"
        :options="schema.nest_size.options"
        v-model="model.nest_size"
      />

      <tw-radio
        :name="schema.occupied.name"
        :label="schema.occupied.label"
        :helptext="schema.occupied.helptext"
        :options="schema.occupied.options"
        :required="schema.occupied.required"
        v-model="model.occupied"
        :has-error="$v.model.occupied.$error"
        :is-invalid="$v.model.occupied.$invalid"
        @blur="$v.model.occupied.$touch()"
      >
        <p v-if="!$v.model.occupied.required">Is the Nest Occupied is a required field.</p>
      </tw-radio>

      <!-- if nest is occupied -->
      <div v-if="isNestOccupied" class="space-y-4">
        <tw-select
          :name="schema.species.name"
          :label="schema.species.label"
          :helptext="schema.species.helptext"
          :options="schema.species.options"
          v-model="model.species"
        />

        <tw-select
          :name="schema.breeding_stage.name"
          :label="schema.breeding_stage.label"
          :options="schema.breeding_stage.options"
          v-model="model.breeding_stage"
        />

        <tw-input
          :name="schema.adult_count.name"
          :label="schema.adult_count.label"
          :type="schema.adult_count.type"
          :helptext="schema.adult_count.helptext"
          :has-error="$v.model.adult_count.$error"
          :is-invalid="$v.model.adult_count.$invalid"
          min="-1"
          v-model="model.adult_count"
          @blur="$v.model.adult_count.$touch()"
        >
          <p v-if="!$v.model.adult_count.minValue">Adult Count must be >= 0</p>
        </tw-input>

        <tw-radio
          v-if="hasAdultCount"
          :name="schema.adult_count_clarify.name"
          :label="schema.adult_count_clarify.label"
          :helptext="schema.adult_count_clarify.label"
          :options="schema.adult_count_clarify.options"
          v-model="model.adult_count_clarify"
        />

        <tw-input
          v-if="hasAdultCount"
          :name="schema.adult_behavior.name"
          :label="schema.adult_behavior.label"
          :type="schema.adult_behavior.type"
          :helptext="schema.adult_behavior.helptext"
          v-model="model.adult_behavior"
        />

        <tw-input
          :name="schema.production_count.name"
          :label="schema.production_count.label"
          :type="schema.production_count.type"
          :helptext="schema.production_count.helptext"
          :has-error="$v.model.production_count.$error"
          :is-invalid="$v.model.production_count.$invalid"
          min="-1"
          v-model="model.production_count"
          @blur="$v.model.production_count.$touch()"
        >
          <p v-if="!$v.model.production_count.minValue">Production Count must be >= 0</p>
        </tw-input>

        <tw-radio
          v-if="hasProductionCount"
          :name="schema.production_count_clarify.name"
          :label="schema.production_count_clarify.label"
          :helptext="schema.production_count_clarify.label"
          :options="schema.production_count_clarify.options"
          v-model="model.production_count_clarify"
        />

        <tw-select
          v-if="hasProductionCount"
          :name="schema.young_stage.name"
          :label="schema.young_stage.label"
          :helptext="schema.young_stage.helptext"
          :options="schema.young_stage.options"
          v-model="model.young_stage"
        />

        <tw-input
          v-if="hasProductionCount"
          :name="schema.production_notes.name"
          :label="schema.production_notes.label"
          :type="schema.production_notes.type"
          :helptext="schema.production_notes.helptext"
          v-model="model.production_notes"
        />

      </div>

      <tw-textarea
        rows="5"
        :name="schema.comments.name"
        :label="schema.comments.label"
        :helptext="schema.comments.helptext"
        v-model="model.comments"
      />
    </form>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'
import TwTextarea from '@/components/form-elements/TwTextarea.vue'
import nestVisitConfig from '@/data/NestVisitForm.json'

export default {
  name: 'NestVisitForm',

  components: { TwTextarea },

  data () {
    return {
      schema: nestVisitConfig,
      model: {
        visit_date: null,
        observers: null,
        agency: null,
        survey_type: null,
        source: null,
        nest_condition: null,
        nest_size: null,
        occupied: null,
        species: null,
        breeding_stage: null,
        adult_count_clarify: null,
        adult_count: null,
        adult_behavior: null,
        production_count_clarify: null,
        production_count: null,
        young_stage: null,
        production_notes: null,
        comments: null
      }
    }
  },

  validations: {
    model: {
      visit_date: { required },
      observers: { required },
      survey_type: { required },
      occupied: { required },
      adult_count: {
        minValue: minValue(-1)
      },
      production_count: {
        minValue: minValue(-1)
      }
    }
  },

  computed: {
    output () {
      return {
        ...this.model
      }
    },

    isNestOccupied () {
      return this.model.occupied === 'true'
    },

    hasAdultCount () {
      return this.model.adult_count > 0 || this.model.adult_count < 0
    },

    hasProductionCount () {
      return this.model.production_count > 0 || this.model.production_count < 0
    }
  },

  watch: {
    output (newOutput, oldOutput) {
      this.$emit('input:nest-visit', this.output)
    }
  }

}
</script>

<style>

</style>
