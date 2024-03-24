import React from 'react'
import { Image } from '../../utils/types'
import SelectImageMenu from '../SelectImageMenu'

interface Props {
  image?: Image
}
const DetailsSide: React.FC<Props> = ({ image }) => {
  return (
    <div className='image-details__detail-side'>
      <p className='image-details__detail-item'>
        Name: <span>{image?.name}</span>
      </p>
      <p className='image-details__detail-item'>
        Size: <span>{image?.size}</span>
      </p>
      <p className='image-details__detail-item'>
        Url: <span>{image?.url}</span>
      </p>
      <SelectImageMenu isFill={image !== undefined} />
    </div>
  )
}
export default DetailsSide
