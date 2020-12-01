<template>
  <div class="mt-4">
    <label :for="labelFor" class="block font-medium text-gray-700">
      {{ label }}
    </label>
    <p v-if="helptext" class="text-sm text-gray-600">
      {{ helptext }}
    </p>
    <select
      class="mt-2 block w-full py-2 px-3 border border-gray-300 bg-white rounded shadow-sm focus:outline-none focus:ring-oxford-lightest focus:border-oxford-lightest sm:text-sm"
      :value="value"
      @change="updateValue"
      v-bind="$attrs"
      v-model="selected"
    >
      <option value=""></option>
      <option
        v-for="(option, key) in options"
        :key="key"
        :selected="option === selected"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'BaseSelect',
  props: {
    value: {
      type: [String, Number, Object]
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
      default: () => ['options']
    }
  },
  data () {
    return {
      // bind value, and v-model to selected and this works
      // see: /Users/mitchellgritts/Documents/sandbox/web/vue/multiselect
      selected: this.value ? this.value[this.$attrs.name] : ''
    }
  },
  computed: {
    labelFor () {
      return this.$attrs.id
    }
  },
  methods: {
    updateValue (event) {
      // value is passed as an object from the parent, destructured
      // with the next value added to the object
      const payload = {
        ...this.value
      }
      payload[this.$attrs.name] = event.target.value
      this.$emit('input', payload)
    }
  }
}
</script>
