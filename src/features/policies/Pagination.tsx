import { tv } from "tailwind-variants"

const pageButton = tv({
  slots: {
    base: [
      'inline-flex items-center justify-center min-w-8 h-8 rounded-sm bg-transparent',
      'text-sm font-light text-blue-700 cursor-pointer',
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
    <nav className={styles.nav()}>
      <button
        className={styles.base()}
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        <span className="text-4xl">&lsaquo;</span>
      </button>

      {pages.map((p) => (
        <button
          key={p}
          className={styles.base({ active: p === page })}
          onClick={() => onPageChange(p)}
        >
          {p}
        </button>
      ))}

      <button
        className={styles.base()}
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        <span className="text-4xl">&rsaquo;</span>
      </button>
    </nav>
  )
}