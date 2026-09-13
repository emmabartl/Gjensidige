import { useState } from "react"
import { Button } from "../../components/Button"
import { Checkbox } from "../../components/Checkbox"
import type { Filters, PolicyStatus } from "../../types/policy"
import { tv } from "tailwind-variants"

const filterPanel = tv({
  slots: {
    root: 'flex flex-col pl-6 py-2 pr-2 border rounded-xs border-blue-200 bg-blue-100',
    header: 'flex justify-between',
    close: 'text-xl cursor-pointer',
    group: 'flex flex-col gap-2.5 pr-12 mb-5',
    legend:'my-2 text-base font-semibold text-blue-700 tracking-wide',
  },
})

interface FilterPanelProps {
  productNames: string[]
  filters: Filters
  onApplyFilters: (filters: Filters) => void
}

const STATUS_OPTIONS = [
  { value: 'active', label: 'Aktiva försäkringar' },
  { value: 'inactive', label: 'Avslutade försäkringar' },
] as const satisfies readonly { value: PolicyStatus; label: string }[]

export function FilterPanel({ productNames, filters, onApplyFilters }: FilterPanelProps) {
  const [draft, setDraft] = useState<Filters>(filters)
  const styles = filterPanel()

  function toggleProduct (name: string) {
    setDraft((prev) => ({
      ...prev,
      productNames: prev.productNames.includes(name)
        ? prev.productNames.filter((n) => n !== name)
        : [...prev.productNames, name],
    }))
  }

  function toggleStatus(status: PolicyStatus) {
    setDraft((prev) => ({
      ...prev,
      statuses: prev.statuses.includes(status)
        ? prev.statuses.filter((s) => s !== status)
        : [...prev.statuses, status],
    }))
  }

  console.log('draft:', draft)

  return (
    <aside className={styles.root()}>
      <div className={styles.header()}>
        <h2 className={styles.legend()}>Typ av försäkring</h2>
        <Button variant="ghost" className={styles.close()}>&times;</Button>
      </div>
      <fieldset className={styles.group()}>
        <legend className="hidden">Typ av försäkring</legend>
        {productNames.map((name => (
          <Checkbox 
            key={name} 
            label={name} 
            value={name} 
            checked={draft.productNames.includes(name)}
            onChange={() => toggleProduct(name)}
          />
        )))}
      </fieldset>
      <fieldset className={styles.group()}>
        <legend className={styles.legend()}>Status</legend>
        {STATUS_OPTIONS.map(({ value, label }) => (
          <Checkbox 
            key={value} 
            label={label} 
            value={value} 
            checked={draft.statuses.includes(value)}
            onChange={() => toggleStatus(value)}
          />
        ))}
      </fieldset>
      <Button variant="primary" onClick={() => onApplyFilters(draft)}>
        Visa försäkringar
      </Button>
    </aside>
  )
}

