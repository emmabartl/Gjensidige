import type { ComponentPropsWithoutRef } from "react"
import { tv, type VariantProps } from "tailwind-variants"

const button = tv({
  slots: {
    base: 'h-9 px-3 py-2.5 relative inline-flex items-center justify-center rounded-sm text-md font-medium tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50',
    label: 'inline-flex items-center gap-2',
    spinner: 'size-4 absolute animate-spin',
  },
  variants: {
    variant: {
      primary: { base: 'bg-blue-700 text-white hover:bg-blue-600' },
      secondary: { base: 'bg-white text-blue-700 border-2' }, // TODO: add hover state
      ghost: { base: 'bg-transparent text-slate-900 hover:bg-slate-100' },
    },
    loading: {
      true: { base: 'cursor-wait', label: 'invisible' },
    },
  },
  defaultVariants: { variant: 'primary' },
})

type ButtonProps = React.ComponentProps<'button'> & 
VariantProps<typeof button> & {
  loadingText?: string
}

/* type Variant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: Variant
  loading?: boolean
} */

export function Button({ 
  variant, /* = 'primary', */ 
  loading = false, 
  loadingText = 'Loading',
  type = 'button',
  className,
  children,
  disabled, 
  ...props 
}: ButtonProps) {
  const styles = button({ variant, loading })

  return (
    <button
      className={styles.base({ class: className })} 
      type={type}
      disabled={disabled || loading}
      {...props}
    >
      <span className={styles.label()}>{children}</span>
      {loading && (
        <>
          <Spinner className={styles.spinner()} />
          <span>{loadingText}</span>
        </>
      )}
    </button>
  )
} 

function Spinner({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  )
}