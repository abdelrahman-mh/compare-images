import React from 'react'
import Image from './Image'
import { useAppSelector } from '../../utils/hooks'
import { useMeasure } from 'react-use'
import { Image as ImageType } from '../../utils/types'

interface Props {
  elX: number
  elW: number
}

const ImagesView: React.FC<Props> = ({ elX, elW }) => {
  const { images } = useAppSelector((state) => state.images)
  const leftImage = images.find((i) => i.side === 'left') as ImageType
  const rightImage = images.find((i) => i.side === 'right') as ImageType

  const [leftIR, { width: leftIW }] = useMeasure()
  const [rightIR, { width: rightIW }] = useMeasure()
  return (
    <>
      <Image
        innerRef={leftIR}
        url={leftImage.url}
        style={{
          clipPath: `polygon(0 0, ${elX - (elW - 10 - leftIW) / 2}px 0, ${elX - (elW - 10 - leftIW) / 2}px 100%, 0 100%)`,
        }}
        className="pointer-events-none z-10 col-start-1 col-end-1 row-start-1 row-end-1 block max-h-[70vh] w-auto select-none self-start justify-self-center object-contain"
      />
      <Image
        innerRef={rightIR}
        style={{
          clipPath: `polygon(${elX - (elW - 10 - rightIW) / 2}px 0, 100% 0, 100% 100%, ${elX - (elW - 10 - rightIW) / 2}px 100%)`,
        }}
        url={rightImage.url}
        className="pointer-events-none col-start-1 col-end-1 row-start-1 row-end-1 block max-h-[70vh] w-auto select-none self-start justify-self-center object-contain"
      />
      <div className="absolute"></div>
    </>
  )
}

export default ImagesView
