import React from 'react'
import { UseMeasureRef } from 'react-use/lib/useMeasure'
interface Props {
  url: string
  className?: string
  innerRef?: UseMeasureRef<HTMLImageElement>
  style?: React.CSSProperties
}

const Image: React.FC<Props> = ({ url, className, innerRef, style }) => {
  return (
    <img
      ref={innerRef}
      style={style}
      alt="side-image"
      className={`block max-w-full ${className}`}
      src={url}
    />
  )
}

export default Image
