
export interface CarouselProps {
  data: (string | File)[] | null
  editBtnVisible: boolean
  setChangedArrDocument?: (item: string | File) => void
}
