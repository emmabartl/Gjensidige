import { useState } from "react"
import { Button } from "../../components/Button"
import { Checkbox } from "../../components/Checkbox"
import type { PolicyStatus } from "../../types/policy"
import { tv } from "tailwind-variants"

const filterPanel = tv({
  slots: {
    root: 'px-8 border rounded-xs border-blue-200 bg-blue-100',
    header: 'flex items-center justify-between',
    close: 'text-2xl cursor-pointer',
    group: 'flex flex-col gap-2.5',
    legend:'text-base font-semibold text-blue-700 tracking-wide',
  },
})

interface FilterPanelProps {
  productNames: string[]
}

const STATUS_OPTIONS = [
  { value: 'active', label: 'Aktiva försäkringar' },
  { value: 'inactive', label: 'Avslutade försäkringar' },
] as const satisfies readonly { value: PolicyStatus; label: string }[]

export function FilterPanel({ productNames }: FilterPanelProps) {
  const [selected, setSelected] = useState<string[]>([])
  const styles = filterPanel()

  const toggle = (value: string) =>
    setSelected((prev) =>
    prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
  )
  return (
    <aside className={styles.root()}>
      <div className={styles.header()}>
        <h2 className={styles.legend()}>Typ av försäkring</h2>
        <Button variant="ghost" className={styles.close()}>&times;</Button>
      </div>
      <fieldset className={styles.group()}>
        <legend className="hidden">Typ av försäkring</legend>
        {productNames.map((type => (
          <Checkbox 
            key={type} 
            label={type} 
            value={type} 
            checked={selected.includes(type)}
            onChange={() => toggle(type)}
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
            checked={selected.includes(value)}
            onChange={() => toggle(value)}
          />
        ))}
      </fieldset>
    </aside>
  )
}

