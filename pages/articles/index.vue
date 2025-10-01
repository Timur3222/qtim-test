<script setup lang="ts">
import { useArticlesStore } from '~/store/articles'
import type { Article } from '~/types/article'

useSeoMeta({
  title: 'Articles',
  ogTitle: 'Articles',
  description: 'Articles description',
  ogDescription: 'Articles description',
})

const articlesStore = useArticlesStore()
const ITEMS_PER_PAGE = 10

const { pending, error } = await useAsyncData('articles', async () => {
  if (articlesStore.articles?.length) {
    return articlesStore.articles
  }
  await articlesStore.fetchArticles()
  return articlesStore.articles
})

const { currentPage, pagesCount } = usePagination()

watchEffect(() => {
  pagesCount.value = Math.ceil(
    (articlesStore.articles?.length || 0) / ITEMS_PER_PAGE,
  )
})

const paginatedArticles = computed<Article[] | null>(() => {
  if (!articlesStore.articles) return null

  const startIndex = (currentPage.value - 1) * ITEMS_PER_PAGE
  return articlesStore.articles.slice(startIndex, startIndex + ITEMS_PER_PAGE)
})
</script>

<template>
  <div>
    <h1 class="mb-10">Articles</h1>

    <div v-if="pending" class="articles-grid">
      <ArticleSkeleton v-for="n in ITEMS_PER_PAGE" :key="n" />
    </div>

    <div v-else-if="error" class="text-xl text-red-500">
      Error: {{ error.message }}
    </div>

    <template v-else>
      <div class="articles-grid mb-[60px]">
        <div v-for="article in paginatedArticles" :key="article.id">
          <AppArticle :article="article" />
        </div>
      </div>

      <MyPagination
        v-if="pagesCount"
        :pages-count="pagesCount"
        :current-page="currentPage"
        @update-page="currentPage = $event"
      />
    </template>
  </div>
</template>

<style scoped>
.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 32px;
}
</style>
