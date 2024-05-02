
export interface InputFileProps {
  getDataDocument: (document: File[] | null) => void
  dataDocument: (string | File)[] | null
  maxFiles: number
  disabled?: boolean
}
