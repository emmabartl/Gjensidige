import { useEffect, useState } from "react"
import { policySchema, type Policy } from "../types/policy"
import z from "zod"

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export function usePolicies() {
  const [policies, setPolicies] = useState<Policy[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  function retry() {
    setError(null)
    setIsLoading(true)
    setRetryCount((c) => c + 1)
  }

  useEffect(() => {
    const controller = new AbortController()

    fetch(`${BASE_URL}/policies/List`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed with ${res.status}`)
        return res.json()
      })
      .then((data: unknown) => {
        const result = z.array(policySchema).safeParse(data)
        if (!result.success) {
          console.error(z.prettifyError(result.error))
          throw new Error("Unexpected response from the server")
        }
        setPolicies(result.data)
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name === 'AbortError') return
        setError(err instanceof Error ? err.message : "Something went wrong")
      })
      .finally(() => { if (!controller.signal.aborted) setIsLoading(false) })

    return () => controller.abort()
  }, [retryCount])

  return { policies, isLoading, error, retry }
}