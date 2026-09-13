import { useId } from "react"
import { tv } from "tailwind-variants"

const checkbox = tv({
  slots: {
    root: 'flex items-center gap-3',
    input: 'peer sr-only',
    box: [
      'w-5 h-5 m-0 appearance-none rounded-sm border-2 border-blue-700 text-white transition-colors cursor-pointer',
      'peer-checked:bg-blue-700 peer-checked:[&>svg]:opacity-100',
      'peer-checked:outline-2 peer-checked:outline-offset-2', 'peer-checked:outline-purple',
      'peer-disabled:opacity-50 peer-disabled:cursor-not-allowed'
    ],
    icon: 'w-4 h-4 text-yellow opacity-0 transition-opacity',
    label:'text-sm text-blue-700 cursor-pointer tracking-wide',
  },
})

type CheckboxProps = Omit<React.ComponentProps<'input'>, 'type'> & {
  label: string
}

export function Checkbox({ label, className, id, ...props }: CheckboxProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const styles = checkbox()

  return (
    <div className={styles.root({ class: className })}>
      <input
        id={inputId}
        type="checkbox"
        className={styles.input()}
        {...props}
      />

      <label htmlFor={inputId} className={styles.box()}>
        <CheckIcon className={styles.icon()} />
      </label>

      {label && (
        <label htmlFor={inputId} className={styles.label()}>
          {label}
        </label>
      )}
    </div>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3.5 8.5L6.5 11.5L12.5 5.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}