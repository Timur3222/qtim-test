<script setup lang="ts">
defineProps<{ pagesCount: number; currentPage: number }>()

const emit = defineEmits<{
  (e: 'updatePage', event: number): void
}>()
</script>

<template>
  <div class="flex gap-2">
    <PaginationButton
      v-for="n in pagesCount"
      :key="n"
      :is-active="currentPage === n"
      @click="emit('updatePage', n)"
    >
      {{ n }}
    </PaginationButton>

    <NextButton
      v-if="currentPage < pagesCount"
      @click="emit('updatePage', currentPage + 1)"
    />
  </div>
</template>
