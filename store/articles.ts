import type { Article } from '~/types/article'

export const useArticlesStore = defineStore('articles', {
  state: () => ({
    articles: null as Article[] | null,
  }),

  actions: {
    async fetchArticles() {
      const { $api } = useNuxtApp()
      const articlesRes = await $api<Article<string>[]>('/posts')
      this.articles = articlesRes.map((article) => {
        return { ...article, createdAt: new Date(article.createdAt) }
      })
    },
  },
})
