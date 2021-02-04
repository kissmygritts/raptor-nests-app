<template>
  <ul class="divide-y divide-gray-200 text-gray-700">
    <detail-list-item v-for="item in detailList" :key="item.title">
      <template v-slot:title>{{ item.title }}</template>
      <template v-slot:content>{{ item.content }}</template>
    </detail-list-item>
  </ul>
</template>

<script>
import DetailListItem from '@/components/DetailListItem.vue'

export default {
  name: 'DetailList',
  components: { DetailListItem },
  props: {
    detailList: {
      type: Array,
      required: true
    }
  }
}
</script>
