export default defineNuxtPlugin(() => {
  const api = $fetch.create({
    onRequest({ options }) {
      options.baseURL =
        'https://6082e3545dbd2c001757abf5.mockapi.io/qtim-test-work'
    },
  })

  return {
    provide: {
      api,
    },
  }
})
