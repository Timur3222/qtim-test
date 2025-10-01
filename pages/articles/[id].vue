<script setup lang="ts">
import { useArticlesStore } from '~/store/articles'
import type { Article } from '~/types/article'

const route = useRoute()
const articleId = route.params.id as string

const articlesStore = useArticlesStore()

function getArticleById(): Article | null {
  const article = articlesStore.detailedArticles.find(
    (article) => article.id === articleId,
  )
  return article || null
}

const {
  data: article,
  pending,
  error,
} = useAsyncData<Article | null>(
  `article-${articleId}`,
  async () => {
    await articlesStore.fetchArticle(articleId)
    return getArticleById()
  },
  {
    getCachedData: () => getArticleById(),
  },
)

watchEffect(() => {
  if (article.value) {
    useSeoMeta({
      title: article.value.title,
      ogTitle: article.value.title,
      description: article.value.preview,
      ogDescription: article.value.preview,
      ogImage: article.value.image,
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
