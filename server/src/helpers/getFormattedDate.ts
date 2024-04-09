
export function getFormattedDate() {
  const currentDate = new Date()
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(currentDate)
  return formattedDate
}
