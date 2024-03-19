import React from 'react'

interface Props {}

const UploadImageInput: React.FC<Props> = () => {
  return (
    <div>
      <span className='selected-file-name'>fileName</span>
      <input type='file' accept='image/*' />
    </div>
  )
}

export default UploadImageInput
