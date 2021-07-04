import {useState, useCallback} from 'react'


const useHttp = () => {

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const request = useCallback(async (url, method="GET", body=null, headers={}) => {

    setLoading(true)

    try {
      // Если тело не пустое и не является экземпляром FormData
      if (!(body instanceof FormData) && body) {
        body = JSON.stringify(body)
        headers['Content-Type'] = 'application/json'
      }


      const response = await fetch(url, {method, body, headers})

      const contentType = response.headers.get('Content-Type')

      let data
      if (contentType === 'image/png') {
        data = await response.blob()
      }
      if (contentType === 'application/json; charset=utf-8') {
        data = await response.json()
      }

      if (!response.ok) {
        throw new Error(data.message || "Что-то пошло не так!")
      }

      setLoading(false)

      return data

    } catch (e) {
      setLoading(false)
      setError(e.message)
      throw e
    }

  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {request, error, clearError, loading}
}

export default useHttp
