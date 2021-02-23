<template>
  <div class="border border-saffron-darker rounded">
    <div id="edit-nest-container" class="bg-saffron-darker p-4">
      <h2 class="text-xl text-white">Edit Nest Details</h2>
      <p class="text-white text-sm mt-2">
        Warning, you are editing the nest details.
      </p>
    </div>

    <!-- form errors -->
    <p v-show="formErrors" id="FormErrors" class="my-4 mx-4 p-2 font-light bg-red-100 text-red-700 rounded">
      Please correct the errors on the form and resubmit.
    </p>

    <form @submit.prevent class="space-y-4 p-6" novalidate>
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

      <tw-textarea
        rows="3"
        :name="schema.nest_comments.name"
        :label="schema.nest_comments.label"
        :helptext="schema.nest_comments.helptext"
        v-model="model.nest_comments"
      />

      <error-text-container v-if="hasError">
        {{ submit.message }}
      </error-text-container>

      <div class="space-x-3 flex justify-end">
        <button
          type="submit"
          class="text-white bg-olive border-0 py-2 px-6 focus:outline-none focus:ring-olive hover:bg-olive-darker rounded text-lg"
          @click.prevent="saveEdits()"
        >
          Save Nest Edits
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import TwTextarea from '@/components/form-elements/TwTextarea.vue'
import nestDetailsConfig from '@/data/NestDetailsForm.json'
import ErrorTextContainer from '@/components/notifications/ErrorTextContainer.vue'
import { updateNestDetails } from '@/services/axios.js'
import { token } from '@/store/auth.js'

export default {
  name: 'NestDetailsEdit',

  components: {
    TwTextarea,
    ErrorTextContainer
  },

  props: {
    nestEditDetails: {
      type: Object,
      required: true
    }
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
      },
      formErrors: false,
      submit: {
        status: '',
        message: '',
        error: false
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
    ...token,

    output () {
      return {
        ...this.model
      }
    },

    hasError () {
      return this.submit.error
    },

    isFormValid () {
      return !this.$v.$invalid
    }
  },

  methods: {
    async saveEdits () {
      this.submit.status = 'PENDING'
      this.$v.$touch()

      if (this.isFormValid) {
        let response

        try {
          response = await updateNestDetails(this.model, this.token)
          this.submit.status = 'SUCCESS'
          this.$emit('submit:nest-edit', response.data)
          // this.$router.go()
        } catch (e) {
          this.submit.status = 'ERROR'
          this.submit.message = 'The server threw an error. Please check the error logs and submit them to Mitchell Gritts.'
          this.submit.error = true

          console.error(e.response.data.message, { ...e.response })
        }
      } else {
        this.formErrors = true
        document.getElementById('edit-nest-container').scrollIntoView({ behavior: 'smooth' })
      }
    }
  },

  mounted () {
    this.model = Object.assign({}, this.model, this.nestEditDetails)
  }
}
</script>
