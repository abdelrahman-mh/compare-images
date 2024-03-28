import React, { useState } from 'react'
import { useAppDispatch, useSide } from '../utils/hooks'
import { setImageFromUri } from '../features/imageSlice'
import { message } from 'antd'

interface Props {
  children?: React.ReactNode
  classes?: string
  close?: () => void
}

const ImageSearchForm: React.FC<Props> = ({ children, classes, close }) => {
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
      await dispatch(setImageFromUri({ value, side })).unwrap()
      close?.()
    } catch (error) {
      message.error(error as string)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`image-form relative mt-3 flex flex-col-reverse gap-3 sm:flex-row ${classes}`}
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
        required
        className={
          'flex-1 rounded-3xl border-[1px] border-solid border-gray-400 ' +
          'bg-slate-100 px-7 py-2 text-sm font-normal text-gray-950 ' +
          'focus:border-sky-400 focus:outline-none'
        }
      />
      {children}
    </form>
  )
}

export default ImageSearchForm
