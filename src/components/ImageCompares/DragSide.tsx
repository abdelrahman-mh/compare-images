import React from 'react'
import { useDropArea } from 'react-use'
import { useAppDispatch, useAppSelector, useSide } from '../../utils/hooks'
import { setFiles } from '../../features/imageSlice'
import SelectImage from './SelectImage'
import Image from './Image'

const DragSide: React.FC = () => {
  const dispatch = useAppDispatch()
  const side = useSide()
  const { isFades, images } = useAppSelector((state) => state.images)
  const currImage = images.find((e) => e.side === side)

  const handleFile = (files: File[]) => {
    dispatch(setFiles({ files, side }))
  }

  const [bond, dragState] = useDropArea({
    onFiles: handleFile,
  })
  console.log(dragState)
  return (
    <div {...bond} className={`image-compare__side-item ${isFades ? 'fades' : ''} ${currImage ? 'fill' : 'not-fill'} ${side} ${dragState ? 'dragging' : ''}`}>
      {currImage && <Image url={currImage.url} />}
      {!currImage && !dragState.over && <SelectImage />}
      {!currImage && dragState.over && <p className='pos-absolute pos-absolute-center '>Drop an image here</p>}
    </div>
  )
}

export default DragSide
