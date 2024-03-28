import React, { useState } from 'react'
import { useAppDispatch, useSide } from '../utils/hooks'
import { setNotification } from '../features/notificationSlice'
import imageServices from '../services/imageServices'
import { parseImageFromWEB } from '../utils/helper'
import { setImage } from '../features/imageSlice'

interface Props {
  children?: React.ReactNode
}

const ImageForm: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch()
  const side = useSide()
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)
    try {
      const response = await imageServices.fetchImage(value)

      const image = await parseImageFromWEB({
        response,
        imageUrl: value,
        side,
      })
      if (image) {
        dispatch(setImage(image))
      } else {
        throw new Error('The URL does not point to a valid image.')
      }
    } catch (error) {
      dispatch(
        setNotification({
          message: 'Invalid image URL. Please enter a valid URL or try another one.',
          type: 'error',
        })
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="image-form mt-3 flex flex-col-reverse gap-3  sm:flex-row"
    >
      <button
        type="submit"
        disabled={loading}
        className={
          'rounded-3xl border-[1px] border-solid border-gray-400 ' +
          'bg-slate-100 px-7 py-2 text-base font-normal text-sky-500 ' +
          'hover:bg-slate-300 hover:text-sky-600'
        }
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
      <input
        type="url"
        placeholder="Paste image link"
        value={value}
        disabled={loading}
        onChange={handleChange}
        className="flex-1 rounded-3xl border-[1px] border-solid border-gray-400 bg-slate-100 px-7 py-2 text-sm font-normal text-gray-950 focus:border-sky-400 focus:outline-none"
      />
      {children}
    </form>
  )
}

export default ImageForm
