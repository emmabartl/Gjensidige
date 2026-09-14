import { tv } from "tailwind-variants"

const pageButton = tv({
  slots: {
    base: [
      'inline-flex items-center justify-center min-w-8 h-8 rounded-sm bg-transparent',
      'text-sm font-light cursor-pointer',
      'hover:bg-blue-100',
      'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent'
    ],
    nav: 'flex items-center gap-2',
  },
  variants: {
    active: {
      true: 'bg-blue-700 text-white hover:bg-blue-600',
    },
  },
})

type PaginationProps = {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  const styles = pageButton()

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav className={styles.nav()} aria-label="Sidnavigering">
      <button
        className={styles.base()}
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        aria-label="Föregående sida"
      >
        <ChevronLeft />
      </button>

      {pages.map((p) => (
        <button
          key={p}
          className={styles.base({ active: p === page })}
          onClick={() => onPageChange(p)}
          aria-label={`Sida ${p}`}
          aria-current={p === page ? 'page' : undefined}
        >
          {p}
        </button>
      ))}

      <button
        className={styles.base()}
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Nästa sida"
      >
        <ChevronRight />
      </button>
    </nav>
  )
}

function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}