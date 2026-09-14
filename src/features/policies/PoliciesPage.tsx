import { useState } from "react"
import { Button } from "../../components/Button"
import { usePolicies } from "../../hooks/usePolicies"
import { FilterPanel } from "./FilterPanel"
import { PolicyCard } from "./PolicyCard"
import { type Filters, type Policy } from "../../types/policy"
import { Pagination } from "../../components/Pagination"
import { EMPTY_FILTERS, filterPolicies, getProductNames, hasActiveFilters } from "../../utils/filtering"
import { paginate, rangeLabel } from "../../utils/paginating"

export function PoliciesPage() {
  const { policies, isLoading, error, retry } = usePolicies()

  const [page, setPage] = useState(1)
  const [appliedFilters, setAppliedFilters] = useState<Filters>(EMPTY_FILTERS)
  const [isPanelOpen, setIsPanelOpen] = useState(false)

  function closePanel() {
    setIsPanelOpen(false)
  }

  function handleApplyFilters(filters: Filters) {
    setAppliedFilters(filters)
    setPage(1) // reset so the user doesn't land on a non-existent page after filtering
    if (window.matchMedia('(max-width: 767px)').matches) {
      closePanel()
    }
  }

  return (
    <main className="max-w-300 mx-auto px-4 py-5">
      <h1 className="mb-6">Mina försäkringar</h1>

      {isLoading && (
        <p role="status">Hämtar dina försäkringar</p>
      )}

      {error && (
        <div className="flex flex-col items-center gap-4" role="alert">
          <p>{error}</p>
          <Button loading={isLoading} onClick={retry} loadingText="Försöker igen">
            Försök igen
          </Button>
        </div>
      )}

      {!isLoading && !error && policies.length === 0 && (
        <>
          <p>Du har inga försäkringar hos oss just nu</p>
          <a href="https://www.gjensidige.se/privat/vara-forsakringar" target="_blank" rel="noreferrer">
            <Button variant="action">Se våra produkter</Button>
          </a>
        </>
      )}

      {!isLoading && policies.length > 0 && (
        <Content
          policies={policies}
          appliedFilters={appliedFilters}
          page={page}
          isPanelOpen={isPanelOpen}
          onPageChange={setPage}
          onTogglePanel={() => setIsPanelOpen(true)}
          onApply={handleApplyFilters}
          onClose={closePanel} 
        />
      )}
    </main>
  )
}

type ContentProps = {
  policies: Policy[]
  appliedFilters: Filters
  page: number
  isPanelOpen: boolean
  onPageChange: (page: number) => void
  onTogglePanel: () => void
  onApply: (filters: Filters) => void
  onClose: () => void
}

function Content({
  policies,
  appliedFilters,
  page,
  isPanelOpen,
  onPageChange,
  onTogglePanel,
  onApply,
  onClose,
}: ContentProps) {
  const filtered = filterPolicies(policies, appliedFilters)
  const productNames = getProductNames(policies)
  const currentPage = paginate(filtered, page)

  return (
    <div className="flex flex-col gap-4 md:pl-[15%]">
      <Pagination page={currentPage.page} totalPages={currentPage.totalPages} onPageChange={onPageChange} />

      <div className="flex flex-col gap-8 md:flex-row">
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center justify-between flex-wrap">
            <p className="m-0 text-sm text-blue-600 tracking-wider">{rangeLabel(currentPage)}</p>
            {hasActiveFilters(appliedFilters) ? (
              <Button variant="ghost" onClick={() => onApply(EMPTY_FILTERS)}>Rensa filter</Button>
            ) : (
              <Button variant="secondary" onClick={onTogglePanel} disabled={isPanelOpen}>Filtrera</Button>
            )}
          </div>

          {currentPage.total === 0 ? (
            <p className="text-base">Inga försäkringar matchar dina filter.</p>
          ) : (
            <ul className="flex flex-col gap-4">
              {currentPage.items.map(policy => (
                <li key={policy.policyNumber}>
                  <PolicyCard policy={policy} />
                </li>
              ))}
            </ul>
          )}
        </div>

        {isPanelOpen && (
          <>
            <div className="fixed inset-0 bg-black/30 z-40 md:hidden" onClick={onClose} />
            <div className="fixed inset-x-0 bottom-0 z-50 rounded-t-lg overflow-hidden md:contents">
              <FilterPanel
                productNames={productNames}
                filters={appliedFilters}
                onApplyFilters={onApply}
                onClose={onClose}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}