import { ref } from 'vue'

export function useFetch() {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const fetchData = async (config) => {
    loading.value = true
    try {
      const response = await fetch(config.url, {
        method: config.method || 'GET',
        headers: config.headers || {},
        body: config.body ? JSON.stringify(config.body) : null,
      })
      if (!response.ok) {
        throw new Error(response.statusText || 'Something went wrong')
      }

      data.value = await response.json()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return {
    data,
    loading,
    error,
    fetchData,
  }
}
