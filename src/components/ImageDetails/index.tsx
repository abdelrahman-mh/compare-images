import { SideProvider } from '../../context/SideContext'
import { useAppSelector } from '../../utils/hooks'

import DetailsSide from './DetailsSide'
const ImagesDetails = () => {
  const { images } = useAppSelector((state) => state.images)
  const left_image = images.find((e) => e.side === 'left')
  const right_image = images.find((e) => e.side === 'right')
  return (
    <div className='image-details'>
      <SideProvider value='left'>
        <DetailsSide image={left_image} />
      </SideProvider>
      <SideProvider value='right'>
        <DetailsSide image={right_image} />
      </SideProvider>
    </div>
  )
}

export default ImagesDetails
