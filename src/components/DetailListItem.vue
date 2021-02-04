<template>
  <li class="py-4">
    <div class="flex space-x-3">
      <div class="flex-1 space-y-1">
        <div class="flex items-center justify-between">
          <h3 class="font-medium capitalize">
            <slot name="title">Title</slot>
          </h3>
        </div>
        <p class="text-gray-500 font-light">
          <slot name="content">Content</slot>
        </p>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: 'DetailListItem'
}
</script>
