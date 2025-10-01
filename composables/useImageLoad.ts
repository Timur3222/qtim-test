export default function useImageLoad() {
  const imageLoaded = ref<boolean>(false)
  const imageLoadError = ref<boolean>(false)

  function onImageLoad() {
    imageLoaded.value = true
    imageLoadError.value = false
  }

  function onImageError() {
    imageLoadError.value = true
    imageLoaded.value = true
  }

  return {
    imageLoaded,
    imageLoadError,
    onImageLoad,
    onImageError,
  }
}
