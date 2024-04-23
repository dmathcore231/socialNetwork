import './styles.scss'
import { useRef, RefObject } from 'react'
import { Btn } from '../Btn'
import { SIZE_ICON_MD } from '../../helpers'
import { CarouselProps } from '../../types/interfaces/CarouselProps'
import { ArrowLeftIcon } from '../../assets/icons/ArrowLeftIcon'
import { ArrowRightIcon } from '../../assets/icons/ArrowRightIcon'

export function Carousel({ data }: CarouselProps): JSX.Element {
  const carouselListElement: RefObject<HTMLDivElement> = useRef(null)
  const itemElement: RefObject<HTMLDivElement> = useRef(null)

  function handleClickBtnLeft() {
    if (carouselListElement.current && itemElement.current) {
      const itemWidth = itemElement.current.offsetWidth
        + parseFloat(getComputedStyle(itemElement.current).marginRight) * 2
      const scrollAmount = itemWidth + 0.5 * 16
      carouselListElement.current.scrollLeft -= scrollAmount
    }
  }

  function handleClickBtnRight() {
    if (carouselListElement.current && itemElement.current) {
      const itemWidth = itemElement.current.offsetWidth
        + parseFloat(getComputedStyle(itemElement.current).marginRight) * 2
      const scrollAmount = itemWidth + 0.5 * 16
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
      {data.map((item, index) => {
        return (
          <div className="carousel__item" key={index} ref={itemElement}>
            <img
              src={`http://localhost:3000/${item}`}
              alt="post-img"
              className="carousel__image"
            />
          </div>
        )
      })}
    </div>
  </div>
}
