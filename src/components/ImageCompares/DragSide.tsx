import React from 'react'
import { useDropArea } from 'react-use'
import { setFiles } from '../../features/imageSlice'
import { useAppDispatch, useAppSelector, useSide } from '../../utils/hooks'
import SelectImage from './SelectImage'
import Image from './Image'

const DragSide: React.FC = () => {
  const dispatch = useAppDispatch()
  const side = useSide()
  const { isFades, images } = useAppSelector((state) => state.images)
  const currentImage = images.find((image) => image.side === side)

  const handleFile = (files: File[]) => {
    dispatch(setFiles({ files, side }))
  }

  const [bond, dragState] = useDropArea({
    onFiles: handleFile,
  })
  console.log('drag state', dragState.over)
  return (
    <div
      className={`relative flex min-h-[300px] w-full max-w-[500px] flex-col overflow-hidden rounded-lg border-[1px] border-dashed border-gray-700 ${dragState.over && 'border-sky-500'} p-5 ${isFades ? '' : ''} ${currentImage ? '' : ''} ${side} `}
    >
      <div
        {...bond}
        className={`pointer-events-none absolute inset-0 z-20 ${dragState.over && 'bg-sky-100 opacity-25'}`}
      ></div>
      {currentImage ? (
        <Image url={currentImage.url} />
      ) : (
        <>
          {!dragState.over && <SelectImage />}
          {dragState.over && (
            <p className="absolute inset-0 flex items-center justify-center">Drop an image here</p>
          )}
        </>
      )}
    </div>
  )
}

export default DragSide
