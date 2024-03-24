import React, { useRef } from 'react'

import ImageForm from '../ImageForm'
import Popup from 'reactjs-popup'

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

type PopupRef = {
  close: () => void
  open: () => void
  toggle: () => void
}

const PopupForm: React.FC<Props> = ({ setOpen }) => {
  const noteEditorRef = useRef<PopupRef>(null)

  const closePopUp = () => noteEditorRef.current?.close()
  return (
    <Popup
      ref={noteEditorRef}
      trigger={<button className=''>From URL</button>}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      repositionOnResize
      modal
      closeOnDocumentClick={true}
      lockScroll
      position='center center'>
      <ImageForm>
        <button className='close-popup-form' onClick={closePopUp}>
          &#x2715;
        </button>
      </ImageForm>
    </Popup>
  )
}

export default PopupForm
