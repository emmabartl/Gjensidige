import z from "zod"

export type PolicyStatus = 'active' | 'inactive'

export interface Policy {
  policyDescription: string
  policyNumber: number
  policyStartDate: string
  policyStatus: PolicyStatus
  productName: string
  yearlyPrice: number
}

export const policyStatusSchema = z
.string()
.transform((s) => s.toLowerCase())
.pipe(z.enum(['active', 'inactive']))

export const policySchema = z.object({
  policyDescription: z.string(),
  policyNumber: z.number(),
  policyStartDate: z.string(),
  policyStatus: policyStatusSchema,
  productName: z.string(),
  yearlyPrice: z.number(),
}) satisfies z.ZodType<Policy>