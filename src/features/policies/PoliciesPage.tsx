import { useState } from "react"
import { Button } from "../../components/Button"
import { usePolicies } from "../../hooks/usePolicies"
import { FilterPanel } from "./FilterPanel"
import { PolicyCard } from "./PolicyCard"
import { EMPTY_FILTERS, type Filters } from "../../types/policy"

export function PoliciesPage() {
  const { policies, isLoading, error } = usePolicies()

  const [appliedFilters, setAppliedFilters] = useState<Filters>(EMPTY_FILTERS)
  const [isPanelOpen, setIsPanelOpen] = useState(false)

  const productNames = [...new Set(policies.map(p => p.productName))]

  function closePanel() {
    setIsPanelOpen(false)
  }

  function handleApplyFilters(filters: Filters) {
    setAppliedFilters(filters)
    closePanel()
  }

  console.log('appliedFilters:', appliedFilters)

  return (
    <main className="max-w-300 mx-auto px-4 py-5">
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
      <div className="flex gap-8">
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center justify-between flex-wrap">
            <Button variant="secondary" onClick={() => (isPanelOpen ? closePanel() : setIsPanelOpen(true))}>Filtrera</Button>
          </div>
          {policies.length > 0 && (
            <ul className="flex flex-col gap-4">
              {policies.map(policy => (
                <li key={policy.policyNumber}>
                  <PolicyCard policy={policy} />
                </li>
              ))}
            </ul>  
          )}
        </div>
        {isPanelOpen && (
          <FilterPanel 
            productNames={productNames} 
            filters={appliedFilters} 
            onApplyFilters={handleApplyFilters}
            onClose={closePanel} 
          />
        )}  
      </div>
    </main>
  )
}