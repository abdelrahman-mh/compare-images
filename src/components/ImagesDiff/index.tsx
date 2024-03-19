import React from 'react'
import DragComponent from './ImageSide'
import {  useAppSelector } from '../../hooks'
import UploadImageInput from './UploadImageInput'

interface Props {}

const ImageDiff: React.FC<Props> = () => {
  const { isFades } = useAppSelector((state) => state.images)
  const { one: imageOne, tow: imageTow } = useAppSelector((state) => state.images.images)

  return (
    <div className='images-diff'>
      <div className="images-diff__title-bar">
        <UploadImageInput />
        <UploadImageInput />
      </div>
      <div className="images-diff__overlay">
      <DragComponent image={imageOne} isFades={isFades} />
      <DragComponent image={imageTow} baseImage={true} isFades={isFades} />
      <div className='diff-bar'></div>
      </div>
    </div>
  )
}

export default ImageDiff
