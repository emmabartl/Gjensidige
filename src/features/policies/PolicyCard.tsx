import { tv, type VariantProps } from "tailwind-variants"
import type { Policy, PolicyStatus } from "../../types/policy"

const card = tv({
  slots: {
    root: 'overflow-hidden rounded-lg border border-line border-blue-200 shadow-sm text-blue-700 tracking-wide',
    header: 'flex flex-col items-start px-6 py-5 gap-1 bg-blue-100 border-b border-blue-200',
    badge: 'mb-2 px-3 py-1 text-xs font-semibold rounded-full',
    title: 'text-lg font-bold',
    subtitle: 'text-md text-blue-600',
    body: 'px-6 divide-y divide-line divide-blue-100',
    row: 'grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] justify-items-start gap-4 py-4',
    label: 'text-sm font-semibold',
    value: 'text-sm text-blue-600 tracking-wider',
  },
  variants: {
    status: {
      active: {},
      inactive: { badge: 'bg-error-100 border border-error-300 text-error-300' },
    }
  }
})

/* type PolicyCardProps = React.ComponentProps<'div'> & 
  VariantProps<typeof card> & {
  status: PolicyStatus
  title: string
  subtitle?: string
} */

type PolicyCardProps = React.ComponentProps<'div'> & 
  VariantProps<typeof card> & {
  policy: Policy
}

export function PolicyCard({ policy, className, ...props }: PolicyCardProps) {
  const styles = card({ status: policy.policyStatus })

  return (
    <div className={styles.root({ class: className })} {...props}>
      <div className={styles.header()}>
        {policy.policyStatus === 'inactive' && <span className={styles.badge()}>Din försäkring har avslutats</span>}
        <h2 className={styles.title()}>{policy.productName}</h2>
        {policy.policyDescription && <p className={styles.subtitle()}>{policy.policyDescription}</p>}
      </div>
      <div className={styles.body()}>
        <PolicyRow label="Startdatum" value={policy.policyStartDate} />
        <PolicyRow label="Försäkringsnummer" value={policy.policyNumber} />
        <PolicyRow label="Pris per månad" value={policy.yearlyPrice} />
      </div>
    </div>
  )
}

export function PolicyRow({ label, value }: { label: string, value: React.ReactNode }) {
  const styles = card()
  return (
    <div className={styles.row()}>
      <div className={styles.label()}>{label}</div>
      <div className={styles.value()}>{value}</div>
    </div>
  )
}

/* export function PolicyCard({ policy, className, children, ...props }: PolicyCardProps) {
  const styles = card()

  return (
    <div className={styles.root({ class: className })} {...props}>
      <div className={styles.header()}>
        {status !== 'active' && <span className={styles.badge()}>Din försäkring har avslutats</span>}
        <h2 className={styles.title()}>{title}</h2>
        {subtitle && <p className={styles.subtitle()}>{subtitle}</p>}
      </div>
      <div className={styles.body()}>{children}</div>
    </div>
  )
} */

/* export function PolicyRow({ label, value }: { label: string, value: React.ReactNode }) {
  const styles = card()
  return (
    <div className={styles.row()}>
      <div className={styles.label()}>{label}</div>
      <div className={styles.value()}>{value}</div>
    </div>
  )
} */