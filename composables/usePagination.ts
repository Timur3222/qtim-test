export default function usePagination() {
  const currentPage = ref<number>(1)
  const pagesCount = ref<number | null>(null)

  const router = useRouter()
  const route = useRoute()

  watch(currentPage, (value) => {
    router.push({
      query: {
        ...route.query,
        page: value.toString(),
      },
    })
  })

  onMounted(() => {
    const queryPage = route.query.page
    if (queryPage) {
      currentPage.value = +queryPage
    }
  })

  return {
    currentPage,
    pagesCount,
  }
}
