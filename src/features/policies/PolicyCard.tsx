import { tv } from "tailwind-variants"
import type { Policy } from "../../types/policy"
import { formatMonthlyPrice } from "../../utils/format"

const card = tv({
  slots: {
    root: 'overflow-hidden rounded-lg border border-line border-blue-200 shadow-sm text-blue-700 tracking-wide',
    header: 'flex flex-col items-start px-6 py-5 gap-1 bg-blue-100 border-b border-blue-200',
    badge: 'mb-2 px-3 py-1 text-xs font-semibold rounded-full bg-error-100 border border-error-300 text-error-300',
    title: 'text-lg font-bold',
    subtitle: 'text-base text-blue-600',
    body: 'px-6 divide-y divide-line divide-blue-100',
    row: 'grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] justify-items-start gap-4 py-4',
    label: 'text-sm font-semibold',
    value: 'text-sm text-blue-600 tracking-wider',
  },
})

type CardSlots = ReturnType<typeof card>

type PolicyCardProps = React.ComponentProps<'div'> & {
  policy: Policy
}

export function PolicyCard({ policy, className, ...props }: PolicyCardProps) {
  const styles = card()

  return (
    <div className={styles.root({ class: className })} {...props}>
      <div className={styles.header()}>
        {policy.policyStatus === 'inactive' && (
          <span className={styles.badge()}>Din försäkring har avslutats</span>
        )}
        <h2 className={styles.title()}>{policy.productName}</h2>
        {policy.policyDescription && (
          <p className={styles.subtitle()}>{policy.policyDescription}</p>
        )}
      </div>
      <div className={styles.body()}>
        <PolicyRow styles={styles} label="Startdatum" value={policy.policyStartDate} />
        <PolicyRow styles={styles} label="Försäkringsnummer" value={policy.policyNumber} />
        <PolicyRow styles={styles} label="Pris per månad" value={formatMonthlyPrice(policy.yearlyPrice)} />
      </div>
    </div>
  )
}

function PolicyRow({ styles, label, value }: { styles: CardSlots, label: string, value: React.ReactNode }) {
  return (
    <div className={styles.row()}>
      <div className={styles.label()}>{label}</div>
      <div className={styles.value()}>{value}</div>
    </div>
  )
}

/* value={formatMonthlyPrice(policy.yearlyPrice)}  */