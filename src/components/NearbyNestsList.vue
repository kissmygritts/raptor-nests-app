<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div class="bg-white overflow-hidden">
    <ul class="divide-y divide-gray-200">

      <nearby-nest-list-item v-for="nest in nearbyNests" :key="nest.nest_id" :nest="nest" />

    </ul>
  </div>
</template>

<script>
import NearbyNestListItem from '@/components/NearbyNestListItem.vue'
export default {
  name: 'NearbyNestsList',
  components: { NearbyNestListItem },
  props: {
    nearbyNests: {
      type: Array,
      required: true
    }
  }
}
</script>
