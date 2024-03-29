import uncode from 'unidecode'

export function formDefaultUserTag(firstName: string, lastName: string) {
  return `@${uncode(firstName.toLowerCase())}${uncode(lastName.toLowerCase())}`
}
