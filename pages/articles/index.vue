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

const {
  data: articles,
  pending,
  error,
} = await useAsyncData<Article[] | null>(
  'articles',
  async () => {
    await articlesStore.fetchArticles()
    return articlesStore.articles
  },
  { getCachedData: () => articlesStore.articles },
)

const { currentPage, pagesCount } = usePagination()

watch(
  articles,
  (articlesVal) => {
    pagesCount.value = Math.ceil((articlesVal?.length || 0) / ITEMS_PER_PAGE)
  },
  { immediate: true },
)

const paginatedArticles = computed<Article[] | null>(() => {
  if (!articles.value) return null
  const startIndex = (currentPage.value - 1) * ITEMS_PER_PAGE
  return articles.value.slice(startIndex, startIndex + ITEMS_PER_PAGE)
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
          <ArticleCard :article="article" />
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
