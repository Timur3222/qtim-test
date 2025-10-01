<template>
  <div class="flex h-[378px] flex-col items-center gap-6">
    <div class="h-[280px] w-full animate-pulse bg-gray-200"></div>
    <div class="flex w-full grow flex-col gap-2">
      <div
        v-for="j in 3"
        :key="j"
        class="w-full grow animate-pulse rounded-sm bg-gray-200"
      ></div>
    </div>
  </div>
</template>
