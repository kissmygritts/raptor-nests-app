<template>
  <div class="mt-4 block">
    <span class="font-medium text-gray-700">{{ label }}</span>
    <div class="mt-2">
      <div v-for="(option, key) in options" :key="key">
        <label :for="option" class="inline-flex items-center px-2 py-1 w-full">
          <input
            class="text-oxford-lightest border-gray-300 h-5 w-5 text-lg"
            type="radio"
            :name="option"
            :id="option"
            :value="option"
            :checked="option === checked"
            v-model="checked"
            @change="updateValue"
          />
          <span class="ml-2">{{ option }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseRadio',
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number, Object]
    },
    label: {
      type: String,
      required: true,
      default: 'Radio Label'
    },
    name: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true,
      default: () => ['yes', 'no']
    }
  },
  data () {
    return {
      checked: this.value ? this.value[this.name] : ''
    }
  },
  methods: {
    updateValue (event) {
      const payload = {
        ...this.value
      }
      payload[this.name] = event.target.value
      this.$emit('input', payload)
    }
  }
}
</script>
