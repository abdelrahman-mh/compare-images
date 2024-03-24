import React, { useState } from 'react'
import Popup from 'reactjs-popup'

import SelectFileInput from '../SelectFileInput'
import PopupForm from './PopupForm'
interface Props {
  isFill: boolean
}

const SelectImageMenu: React.FC<Props> = ({ isFill }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Popup trigger={isFill ? <span>Change this image</span> : <span>Chose image</span>} nested={isOpen} repositionOnResize position='right center'>
      <SelectFileInput>
        <button>Browse</button>
      </SelectFileInput>
      <PopupForm setOpen={setIsOpen} />
    </Popup>
  )
}

export default SelectImageMenu
