<script setup lang="ts">
import type { Article } from '~/types/article'

const route = useRoute()
const articleId = route.params.id as string

const {
  data: article,
  pending,
  error,
} = useAsyncData<Article>(`article-${articleId}`, () => {
  const { $api } = useNuxtApp()
  return $api(`/posts/${articleId}`)
})

watch(article, (a) => {
  if (a) {
    useSeoMeta({
      title: a.title,
      ogTitle: a.title,
      description: a.preview,
      ogDescription: a.preview,
    })
  }
})

const { imageLoaded, imageLoadError, onImageLoad, onImageError } =
  useImageLoad()
</script>

<template>
  <div class="pb-20">
    <div v-if="pending" class="text-xl">Loading...</div>

    <div v-else-if="error" class="text-xl text-red-500">
      Error: {{ error.message }}
    </div>

    <div v-else-if="article">
      <h1 class="mb-20 text-[84px]">{{ article.title }}</h1>

      <div
        v-show="!imageLoaded"
        class="mb-20 h-[700px] w-full max-w-[1216px] animate-pulse bg-gray-200"
      ></div>

      <NuxtImg
        v-show="imageLoaded && !imageLoadError"
        :src="article.image"
        alt="article image"
        fit="cover"
        class="mb-20 h-auto w-full max-w-[1216px]"
        @load="onImageLoad"
        @error="onImageError"
      />

      <div class="mb-8">About</div>

      <p class="max-w-[695px] text-[36px]">{{ article.description }}</p>
    </div>
  </div>
</template>
