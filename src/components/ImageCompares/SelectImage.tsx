import React from 'react'
import SelectFileInput from '../SelectFileInput'
import ImageSearchForm from '../ImageSearchForm'

interface Props {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const SelectImage: React.FC<Props> = ({ setLoading }) => {
  return (
    <>
      <div className="inputFile-select flex flex-1 items-center justify-center gap-5">
        <img
          alt="image-icon"
          className="image-compare__select-image-icon"
          src="./image-icon.svg"
          draggable="false"
        />
        <p className="break-normal text-base">
          Drag an image here or{' '}
          <SelectFileInput setLoading={setLoading}>
            <span className="cursor-pointer text-sky-500 underline">upload a file</span>
          </SelectFileInput>
        </p>
      </div>
      <div className="url-select">
        <div className="or-operator flex items-center gap-2 text-base">
          <span className="h-[1px] flex-1 bg-gray-400"></span>
          <span>OR</span>
          <span className="h-[1px] flex-1 bg-gray-400"></span>
        </div>
        <ImageSearchForm />
      </div>
    </>
  )
}

export default SelectImage
