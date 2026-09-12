import { useEffect, useState } from "react"
import { policySchema, type Policy } from "../types/policy"
import z from "zod"

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export function usePolicies() {
  const [policies, setPolicies] = useState<Policy[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`${BASE_URL}/policies/List`)
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
        setError(err instanceof Error ? err.message : "Something went wrong")
      })
      .finally(() => setIsLoading(false))
  }, [])

  return { policies, isLoading, error }
}