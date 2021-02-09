<template>
  <div class="block">
    <div class="flex items-center space-x-2">
      <label v-if="label" class="block text-lg font-medium tracking-wide text-gray-700">
        {{ label }}
      </label>
      <span v-if="required" class="block text-saffron-darker">
        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </span>
    </div>

    <!-- radio options -->
    <div class="w-full">
      <p  v-if="helptext" class="text-sm text-gray-700 font-light">
        {{ helptext }}
      </p>
      <div class="mt-2 space-y-2">

        <!-- option -->
        <div v-for="option in options" :key="option" class="flex items-center">
          <input
            :id="option"
            :name="checkboxName"
            class="rounded focus:ring-oxford-lightest h-5 w-5 text-oxford border-gray-300"
            type="checkbox"
            :value="option"
            v-model="checked"
            v-bind="$attrs"
            v-on="listeners"
          >
          <label
            :for="option"
            class="ml-3 block text-gray-700"
          >
            {{ option }}
          </label>
        </div>

      </div>

      <!-- error messages -->
      <!-- <div v-if="hasError" class="mt-2 py-1 px-2 text-sm font-light bg-red-50 text-red-700 rounded">
        <slot>errors go here</slot>
      </div> -->
    </div>

  </div>
</template>

<script>
export default {
  name: 'TwCheckbox',

  props: {
    value: {
      required: true
    },
    label: {
      type: String,
      required: true,
      default: 'Label'
    },
    helptext: {
      type: String,
      required: false
    },
    options: {
      type: Array,
      required: true,
      default: () => ['yes', 'no']
    },
    required: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data () {
    return {
      checked: []
    }
  },

  computed: {
    isChecked () {
      return this.checked.includes(this.value)
    },

    checkboxName () {
      return this.$attrs.name || `tw_checkbox_${this.label}`
    },

    listeners () {
      return {
        change: this.updateValue
      }
    }
  },

  methods: {
    updateValue (event) {
      this.$emit('input', this.checked)
    }
  }

}
</script>
