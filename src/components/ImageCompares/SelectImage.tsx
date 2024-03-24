import React from 'react'
import SelectFileInput from '../SelectFileInput'
import ImageForm from '../ImageForm'

interface Props {}

const SelectImage: React.FC<Props> = () => {
  return (
    <>
      <div className='inputFile-select'>
        <img alt='image-icon' className='image-compare__select-image-icon' src='./image-icon.svg' draggable='false' />
        <p>
          Drag an image here or{' '}
          <SelectFileInput>
            <span className='image-compare__upload-file-link'>upload a file</span>
          </SelectFileInput>
        </p>
      </div>
      <div className='url-select'>
        <div className='or-operator'>
          <span></span>
          <span>OR</span>
          <span></span>
        </div>
        <ImageForm />
      </div>
    </>
  )
}

export default SelectImage
