import React from 'react'

interface Props {
  isFades: boolean
  image: string // Make the image prop optional
  baseImage?: boolean
}

const DragComponent: React.FC<Props> = ({ isFades, image, baseImage }) => {
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files?.[0] // Use optional chaining
    console.log('file', file)
    console.log('onDragDrop')
    // setIsDragOver(false)
    // handleFile(file)
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    console.log('onDragOver')
    // setIsDragOver(true)
  }
  const handleOnDrag = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    console.log('onDrag')
  }
  const handleOnDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    console.log('onDragEnd')
  }
  const handleOnDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    console.log('onDragEnter')
  }
  const handleOnDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    console.log('onDragLeave')
  }
  const handleOnDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    console.log('onDragStart')
  }

  const ImageContent = () => (image ? <img alt='image' className={`image ${isFades ? 'fades' : ''} ${baseImage ? 'baseImage' : ''}`} src={image} /> : null) // Check if image exists
  const DragComponentContent = () => (
    <div
      className={`drag-component ${!isFades ? 'none' : ''}`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDrag={handleOnDrag}
      onDragEnd={handleOnDragEnd}
      onDragEnter={handleOnDragEnter}
      onDragLeave={handleOnDragLeave}
      onDragStart={handleOnDragStart}>
      DragComponent
    </div>
  )

  return <>{image ? <ImageContent /> : <DragComponentContent />}</> // Render based on whether image exists
}

export default DragComponent
