<script setup lang="ts">
defineProps<{ isActive: boolean }>()
</script>

<template>
  <button
    type="button"
    class="centered aspect-square h-11 cursor-pointer rounded-xl"
    :class="[
      isActive
        ? 'bg-ui-black hover:bg-ui-gray-400 text-white'
        : 'bg-ui-gray-100 hover:bg-ui-gray-200',
    ]"
  >
    <slot />
  </button>
</template>
