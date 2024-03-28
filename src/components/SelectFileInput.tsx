import React, { useRef } from 'react'
import { useAppDispatch, useSide } from '../utils/hooks'
import { setFiles } from '../features/imageSlice'
import { message } from 'antd'
interface Props {
  children: React.ReactNode
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
  close?: () => void
}

const SelectFileInput: React.FC<Props> = ({ children, setLoading, close }) => {
  const dispatch = useAppDispatch()
  const side = useSide()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading?.(true)
    const fileList = event.target.files

    try {
      if (fileList) {
        const validFileList = Array.from(fileList)
        await dispatch(setFiles({ files: validFileList, side }))
      } else {
        message.error('No images selected. Please select at least one image.')
      }
    } catch (err) {
      let Errormessage: string
      if (err instanceof Error) {
        Errormessage = err.message
      } else {
        Errormessage = 'Error happened when upload a images'
      }
      message.error(Errormessage)
    } finally {
      close?.()
      setLoading?.(false)
    }
  }

  return (
    <>
      {children &&
        React.cloneElement(children as React.ReactElement, {
          onClick: handleFileInputClick,
        })}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleInputChange}
        multiple
      />
    </>
  )
}

export default SelectFileInput
