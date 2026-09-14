import { tv, type VariantProps } from "tailwind-variants"

const button = tv({
  slots: {
    base: [
      'group relative inline-flex items-center justify-between w-fit shrink-0 h-9 px-3.5 gap-6',
      'rounded-sm text-sm font-medium tracking-wider',
      'transition duration-200 ease-out active:scale-[0.98] active:duration-75',
      'focus-visible:outline-2 focus-visible:outline-offset-2',
      'cursor-pointer disabled:pointer-events-none disabled:opacity-50',
    ],
    label: 'inline-flex items-center gap-2',
    spinner: 'size-4 absolute animate-spin',
    arrow: 'transition-transform duration-200 ease-out group:hover:translate-x-1',
  },
  variants: {
    variant: {
      primary: { base: 'bg-blue-700 text-white hover:bg-blue-600' },
      secondary: { base: 'bg-white text-blue-700 border-2 hover:opacity-75' },
      ghost: { base: 'bg-transparent text-slate-900 hover:bg-slate-100' },
      action: { 
        base: 'bg-transparent text-blue-700 px-0 gap-2 hover:bg-transparent',
        label: 'underline underline-offset-2',
      },
    },
    loading: {
      true: { base: 'cursor-wait' },
    },
  },
  defaultVariants: { variant: 'primary' },
})

type ButtonProps = React.ComponentProps<'button'> & 
VariantProps<typeof button> & {
  loadingText?: string
}

export function Button({ 
  variant,
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
      aria-busy={loading || undefined}
      {...props}
    >
      <span className={styles.label()}>{children}</span>
        {variant === 'action' && (
          <span className={styles.arrow()} aria-hidden="true">→</span>
        )}
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