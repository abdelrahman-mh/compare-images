import React, { useRef } from 'react'
import { useAppDispatch, useSide } from '../utils/hooks'
import { setFiles } from '../features/imageSlice'

interface Props {
  children: React.ReactNode
}

const SelectFileInput: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch()
  const side = useSide()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files
    if (fileList) {
      const validFileList = Array.from(fileList)
      dispatch(setFiles({ files: validFileList, side }))
    }
  }

  return (
    <>
      {children && React.cloneElement(children as React.ReactElement, { onClick: handleFileInputClick })}
      <input type='file' ref={fileInputRef} style={{ display: 'none' }} accept='image/*' className='images-diff__side-input' onChange={handleInputChange} multiple />
    </>
  )
}

export default SelectFileInput
