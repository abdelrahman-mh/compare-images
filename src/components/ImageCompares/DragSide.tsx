import React, { useRef, useState } from 'react'
import { useDropArea } from 'react-use'
import { setFiles, setImageFromUri } from '../../features/imageSlice'
import { useAppDispatch, useAppSelector, useSide } from '../../utils/hooks'
import SelectImage from './SelectImage'
import Image from './Image'
import { message, Spin } from 'antd'

const DragSide: React.FC = () => {
  const [dragging, setDragging] = useState(false)
  const [loading, setLoading] = useState(false)
  const dragBoxRef = useRef<HTMLDivElement>(null)

  const dispatch = useAppDispatch()
  const side = useSide()
  const { isFades, images } = useAppSelector((state) => state.images)
  const currentImage = images.find((image) => image.side === side)

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (dragBoxRef.current && !dragBoxRef.current.contains(e.relatedTarget as Node)) {
      setDragging(false)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleFile = async (files: File[]) => {
    setDragging(false)
    setLoading(true)
    try {
      await dispatch(setFiles({ files, side }))
    } catch (err) {
      if (err instanceof Error) {
        message.error(err.message)
      } else {
        message.error('Error happened when uploading the image, please try again!')
      }
    } finally {
      setLoading(false)
    }
  }
  const handleUriOrText = async (value: string) => {
    console.log('from text!')
    setDragging(false)
    setLoading(true)
    try {
      await dispatch(setImageFromUri({ value, side })).unwrap()
    } catch (error) {
      message.error(error as string)
    } finally {
      setLoading(false)
    }
  }

  const [bond] = useDropArea({
    onFiles: handleFile,
    onUri: handleUriOrText,
    onText: handleUriOrText,
  })
  return (
    <div
      {...bond}
      ref={dragBoxRef}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`rounded-lg border-dashed p-5 z-20
    ${isFades ? (side === 'left' ? 'left-0' : 'right-0') + ' absolute top-0 h-full w-1/2' : 'relative flex min-h-[300px] w-full max-w-[500px] flex-col overflow-hidden border border-gray-700'}
    ${dragging ? 'border border-sky-500' : ''}`}
    >
      {!isFades && (
        <>
          {!currentImage && <SelectImage setLoading={setLoading} />}
          {currentImage && <Image url={currentImage.url} />}
        </>
      )}
      {dragging && (
        <p className="absolute inset-0 flex items-center justify-center bg-sky-50">
          Drop an image here
        </p>
      )}
      {loading && (
        <Spin className="absolute inset-0 flex items-center justify-center bg-sky-50 opacity-50" />
      )}
    </div>
  )
}

export default DragSide
