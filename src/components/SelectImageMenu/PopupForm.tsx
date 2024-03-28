import React, { useRef } from 'react'

import ImageSelectForm from '../ImageSearchForm'
import Popup from 'reactjs-popup'
import { PopupRef } from '../../utils/types'
interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const PopupForm: React.FC<Props> = ({ setOpen }) => {
  const noteEditorRef = useRef<PopupRef>(null)

  const closePopUp = () => noteEditorRef.current?.close()
  return (
    <Popup
      ref={noteEditorRef}
      trigger={<button className="rounded-lg border-none p-1 hover:bg-sky-400/20">From URL</button>}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      repositionOnResize
      modal
      closeOnDocumentClick={false}
      lockScroll
      position="center center"
      className="search-image-modal"
    >
      <ImageSelectForm close={closePopUp} classes="py-[90px] rounded-lg px-3 shadow-sm bg-white">
        <button
          onClick={closePopUp}
          className="absolute -right-3 -top-3 w-8 rounded-full bg-red-400 text-2xl text-white  hover:text-red-500"
        >
          &#x2715;
        </button>
      </ImageSelectForm>
    </Popup>
  )
}

export default PopupForm
