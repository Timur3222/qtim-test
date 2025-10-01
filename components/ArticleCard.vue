<script setup lang="ts">
import type { Article } from '~/types/article'

defineProps<{ article: Article }>()

const { imageLoaded, imageLoadError, onImageLoad, onImageError } =
  useImageLoad()
</script>

<template>
  <NuxtLink
    :to="`/articles/${article.id}`"
    class="group relative block transition-transform hover:-translate-y-5"
  >
    <div class="mb-6 flex cursor-pointer flex-col items-center">
      <div
        v-show="!imageLoaded"
        class="h-[280px] w-full animate-pulse bg-gray-200"
      ></div>

      <NuxtImg
        v-show="imageLoaded && !imageLoadError"
        :src="article.image"
        alt="article image"
        fit="cover"
        class="aspect-square w-full object-cover"
        @load="onImageLoad"
        @error="onImageError"
      />

      <NuxtImg
        v-show="imageLoadError"
        src="/images/image_fallback.jpg"
        alt="no image"
        height="280px"
        width="100%"
      />
    </div>

    <p class="line-clamp-3 overflow-hidden text-xl overflow-ellipsis">
      {{ article.preview }}
    </p>

    <span
      class="text-primary absolute -bottom-8 left-0 z-10 hidden text-xl group-hover:inline"
    >
      Read more
    </span>
  </NuxtLink>
</template>

<style scoped></style>
