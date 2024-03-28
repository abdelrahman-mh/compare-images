import React, { useRef, useState } from 'react'
import { useDropArea } from 'react-use'
import { setFiles, setImageFromUri } from '../../features/imageSlice'
import { useAppDispatch, useAppSelector, useSide } from '../../utils/hooks'
import SelectImage from './SelectImage'
import Image from './Image'
import { message, Spin } from 'antd'

const DragSide: React.FC = () => {
  const dispatch = useAppDispatch()
  const side = useSide()
  const { isFades, images } = useAppSelector((state) => state.images)
  const currentImage = images.find((image) => image.side === side)

  const [dragging, setDragging] = useState(false)
  const [loading, setLoading] = useState(false)
  const dragBoxRef = useRef<HTMLDivElement>(null)

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
      className={`relative flex min-h-[300px] w-full max-w-[500px] flex-col overflow-hidden rounded-lg border-[1px] border-dashed border-gray-700 p-5 ${dragging && 'border-sky-500 bg-sky-50'} ${side} `}
    >
      {currentImage ? (
        <Image url={currentImage.url} />
      ) : (
        <>
          {!dragging && <SelectImage />}
          {dragging && (
            <p className="absolute inset-0 flex items-center justify-center">Drop an image here</p>
          )}
        </>
      )}
      {loading && (
        <Spin className="absolute inset-0 flex items-center justify-center bg-sky-50 opacity-50" />
      )}
    </div>
  )
}

export default DragSide
