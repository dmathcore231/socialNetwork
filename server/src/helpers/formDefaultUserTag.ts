import uncode from 'unidecode'

export function formDefaultUserTag(firstName: string, lastName: string): string {
  return `@${uncode(firstName.toLowerCase())}${uncode(lastName.toLowerCase())}`
}
