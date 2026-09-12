import { useEffect, useState } from 'react'
import './App.css'
import type { Policy } from './types/policy'
import { Button } from './components/Button'

function App() {
  const [policies, setPolicies] = useState<Policy[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const BASE_URL = import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    fetch(`${BASE_URL}/policies/List`)
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed with ${res.status}`)
        return res.json()
      })
      .then((data: Policy[]) => setPolicies(data))
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Something went wrong")
      })
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <>
      <h1>Mina försäkringar</h1>

      {isLoading && (
        <p>Hämtar dina försäkringar</p>
      )}

      {error && (
        <p role="alert">{error}</p>
      )}

      {policies.length === 0 && (
        <>
          <p>Du har inga försäkringar hos oss just nu</p>
          <button>Se våra produkter</button>
        </>
      )}

      {policies.length > 0 && (
        <ul>
          {policies.map((policy) => (
            <li key={policy.policyNumber}>{policy.productName}</li>
          ))}
        </ul> 
      )}

      <Button>knapp</Button>
      <Button variant='secondary'>knapp 2 </Button>
      <Button variant="ghost" loading loadingText='Hämtar'>loading</Button>
    </>
  )
}

export default App
