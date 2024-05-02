import './styles.scss'
import { useRef, RefObject } from 'react'
import { Btn } from '../Btn'
import { SIZE_ICON_MD } from '../../helpers'
import { CarouselProps } from '../../types/interfaces/CarouselProps'
import { ArrowLeftIcon } from '../../assets/icons/ArrowLeftIcon'
import { ArrowRightIcon } from '../../assets/icons/ArrowRightIcon'
import { CloseIcon } from '../../assets/icons/CloseIcon'

export function Carousel({ data, editBtnVisible, setChangedArrDocument }: CarouselProps): JSX.Element {
  const carouselListElement: RefObject<HTMLDivElement> = useRef(null)
  const itemElement: RefObject<HTMLDivElement> = useRef(null)

  function handleClickBtnLeft() {
    if (carouselListElement.current && itemElement.current) {
      const itemWidth = itemElement.current.offsetWidth + 16
      const scrollAmount = itemWidth
      carouselListElement.current.scrollLeft -= scrollAmount
    }
  }

  function handleClickBtnRight() {
    if (carouselListElement.current && itemElement.current) {
      const itemWidth = itemElement.current.offsetWidth + 16
      const scrollAmount = itemWidth
      carouselListElement.current.scrollLeft += scrollAmount
    }
  }

  return <div className="carousel">
    <span className="carousel-toggle carousel-toggle__left">
      <Btn
        type="button"
        className="btn_transparent_shadow_enabled btn_transparent_shadow_color_white"
        onClick={handleClickBtnLeft}
      >
        <ArrowLeftIcon width={SIZE_ICON_MD} height={SIZE_ICON_MD} />
      </Btn>
    </span>
    <span className="carousel-toggle carousel-toggle__right">
      <Btn
        type="button"
        className="btn_transparent_shadow_enabled btn_transparent_shadow_color_white"
        onClick={handleClickBtnRight}
      >
        <ArrowRightIcon width={SIZE_ICON_MD} height={SIZE_ICON_MD} />
      </Btn>
    </span>
    <div className="carousel__list" ref={carouselListElement}>
      {data
        ? data.map((item, index) => {
          if (typeof item === 'string') {
            return (
              <div className="carousel__item" key={index} ref={itemElement}>
                {editBtnVisible
                  ? (<span className="carousel__btn-edit">
                    <Btn
                      type="button"
                      className="btn_transparent_shadow_enabled btn_transparent_shadow_color_white"
                      onClick={setChangedArrDocument
                        ? () => setChangedArrDocument(item)
                        : undefined}
                    >
                      <CloseIcon width="16" height="16" />
                    </Btn>
                  </span>)
                  : (null)}
                <img
                  src={`http://localhost:3000/${item}`}
                  alt="post-img"
                  className="carousel__image"
                />
              </div>
            )
          } else if (item instanceof File) {
            const itemBlobUrl = URL.createObjectURL(item)
            return (
              <div className="carousel__item" key={index} ref={itemElement}>
                {editBtnVisible
                  ? (<span className="carousel__btn-edit">
                    <Btn
                      type="button"
                      className="btn_transparent_shadow_enabled btn_transparent_shadow_color_white"
                      onClick={setChangedArrDocument
                        ? () => setChangedArrDocument(item)
                        : undefined}
                    >
                      <CloseIcon width="16" height="16" />
                    </Btn>
                  </span>)
                  : (null)}
                <img
                  src={itemBlobUrl}
                  alt="post-img"
                  className="carousel__image"
                />
              </div>
            )
          }
        })
        : null}
    </div>
  </div>
}
