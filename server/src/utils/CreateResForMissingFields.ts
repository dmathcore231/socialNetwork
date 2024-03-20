import { Fields } from "../types/Fields"

export function CreateResForMissingFields(fields: Fields[]) {
  const fieldsMissing = fields
    .filter(item => !item.field)
    .map(item => item.label)

  if (fieldsMissing.length > 0) {
    throw new Error(`Missing fields: ${fieldsMissing.join(', ')}`)
  }
}
