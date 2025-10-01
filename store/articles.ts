import type { Article } from '~/types/article'

export const useArticlesStore = defineStore('articles', {
  state: () => ({
    articles: null as Article[] | null,
    detailedArticles: [] as Article[],
  }),

  actions: {
    async fetchArticles() {
      const { $api } = useNuxtApp()
      const articlesRes = await $api<Article<string>[]>('/posts')
      this.articles = articlesRes.map((article) => {
        return { ...article, createdAt: new Date(article.createdAt) }
      })
    },

    async fetchArticle(id: string) {
      const { $api } = useNuxtApp()
      const articleRes = await $api<Article<string>>(`/posts/${id}`)
      this.detailedArticles.push({
        ...articleRes,
        createdAt: new Date(articleRes.createdAt),
      })
    },
  },
})
