import type { Filters, Page, Policy, PolicyStatus } from "../types/policy"

export const STATUS_OPTIONS = [
  { value: 'active', label: 'Aktiva försäkringar' },
  { value: 'inactive', label: 'Avslutade försäkringar' },
] as const satisfies readonly { value: PolicyStatus; label: string }[]

export const EMPTY_FILTERS: Filters = { productNames: [], statuses: [] }

export function filterPolicies(policies: Policy[], filters: Filters): Policy[] {
  return policies.filter(
    (policy) =>
      (filters.productNames.length === 0 ||
        filters.productNames.includes(policy.productName)) &&
      (filters.statuses.length === 0 || filters.statuses.includes(policy.policyStatus))
  )
}

export function getProductNames(policies: Policy[]): string[] {
  return [...new Set(policies.map((p) => p.productName))]
}

export function hasActiveFilters(filters: Filters): boolean {
  return filters.productNames.length > 0 || filters.statuses.length > 0
}