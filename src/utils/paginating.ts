import type { Page } from "../types/policy"

export const PAGE_SIZE = 5

export function paginate<T>(items: T[], page: number, pageSize = PAGE_SIZE): Page<T> {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))
  const safePage = Math.min(Math.max(1, page), totalPages)
  const start = (safePage - 1) * pageSize

  return {
    items: items.slice(start, start + pageSize),
    page: safePage,
    totalPages,
    from: items.length === 0 ? 0 : start + 1,
    to: Math.min(start + pageSize, items.length),
    total: items.length,
  }
}

export function rangeLabel(page: Page<unknown>): string {
  if (page.total === 0) return `Visar ${page.from} av ${page.total} försäkringar`
  return `Visar ${page.from}-${page.to} av ${page.total} försäkringar`
}