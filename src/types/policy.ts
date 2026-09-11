export type PolicyStatus = 'active' | 'inactive'

export interface Policy {
  policyDescription: string
  policyNumber: string
  policyStartDate: string
  policyStatus: PolicyStatus
  productName: string
  yearlyPrice: number
}