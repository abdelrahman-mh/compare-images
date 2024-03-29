import React, { useState, useRef } from 'react'
import Popup from 'reactjs-popup'
import { TbArrowBigRightFilled } from 'react-icons/tb'
import { CgArrowsExchange } from 'react-icons/cg'
import SelectFileInput from '../SelectFileInput'
import PopupForm from './PopupForm'
import { PopupRef } from '../../utils/types'

interface Props {
  isFill: boolean
}

const SelectImageMenu: React.FC<Props> = ({ isFill }) => {
  const [isOpen, setIsOpen] = useState(false)
  const listRef = useRef<PopupRef>(null)

  const closeList = () => listRef.current?.close()

  const triggerContent = (
    <span className="flex w-min cursor-pointer select-none items-center gap-1 text-sky-400 underline">
      {isFill ? (
        <CgArrowsExchange className="text-2xl font-black text-sky-700" />
      ) : (
        <TbArrowBigRightFilled className="text-sky-700" />
      )}{' '}
      {isFill ? 'Change this image' : 'Choose image'}
    </span>
  )

  return (
    <Popup
      trigger={triggerContent}
      ref={listRef}
      nested={isOpen}
      repositionOnResize
      position="right center"
    >
      <div className="flex flex-col rounded-lg bg-gray-700 px-4 py-2 text-base text-green-300">
        <SelectFileInput close={closeList}>
          <button className="rounded-lg border-none p-1 hover:bg-sky-400/20">Browse</button>
        </SelectFileInput>
        <PopupForm setOpen={setIsOpen} />
      </div>
    </Popup>
  )
}

export default SelectImageMenu
