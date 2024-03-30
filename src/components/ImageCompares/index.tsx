import React, { useRef } from 'react'
import { useMouseHovered } from 'react-use'
import DragSide from './DragSide'
import { SideProvider } from '../../context/SideContext'
import { useAppSelector } from '../../utils/hooks'
import ImagesView from './ImagesView'

interface Props {}

const ImageCompare: React.FC<Props> = () => {
  const { isFades } = useAppSelector((state) => state.images)

  const ref = useRef(null)
  const { elX, elW } = useMouseHovered(ref, {
    bound: true,
    whenHovered: true,
  })

  return (
    <div
      ref={ref}
      className={`relative mx-auto mt-3 px-[5px] py-7 ${isFades ? 'cursor-col-resize box-border grid w-fit grid-cols-1 grid-rows-1 border' : 'flex flex-col items-center justify-center gap-5 sm:flex-row'}`}
    >
      <SideProvider value="left">
        <DragSide />
      </SideProvider>
      <SideProvider value="right">
        <DragSide />
      </SideProvider>
      {isFades && (
        <>
          <ImagesView elX={elX} elW={elW} />
          <div
            className={`absolute top-0 z-30 h-full w-1 bg-red-600`}
            style={{ left: `${elX}px` }}
          ></div>
          <div
            className={`absolute -bottom-[32px] z-30 -translate-x-1/2 rounded-lg bg-red-600 px-3 py-1`}
            style={{ left: `${elX + 2}px` }}
          >
            {parseInt(`${elX}`)}
          </div>
        </>
      )}
    </div>
  )
}

export default ImageCompare

// ImagesView
