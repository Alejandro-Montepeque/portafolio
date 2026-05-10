import { z, type ZodError } from 'zod'

export type ContactErrorMessages = {
  nameRequired: string
  nameMin: string
  nameMax: string
  emailRequired: string
  emailInvalid: string
  emailMax: string
  messageRequired: string
  messageMin: string
  messageMax: string
}

export function buildContactSchema(errorMessages: ContactErrorMessages) {
  return z.object({
    name: z
      .string({ required_error: errorMessages.nameRequired })
      .trim()
      .min(2, errorMessages.nameMin)
      .max(80, errorMessages.nameMax),

    email: z
      .string({ required_error: errorMessages.emailRequired })
      .trim()
      .min(1, errorMessages.emailRequired)
      .email(errorMessages.emailInvalid)
      .max(120, errorMessages.emailMax),

    message: z
      .string({ required_error: errorMessages.messageRequired })
      .trim()
      .min(10, errorMessages.messageMin)
      .max(2000, errorMessages.messageMax),
  })
}

export function formatZodErrors(zodError: ZodError): Record<string, string> {
  const errors: Record<string, string> = {}
  for (const issue of zodError.issues) {
    const field = issue.path[0]
    if (typeof field === 'string' && !errors[field]) {
      errors[field] = issue.message
    }
  }
  return errors
}
