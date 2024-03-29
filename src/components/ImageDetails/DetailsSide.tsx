import React from 'react'
import { Image } from '../../utils/types'
import SelectImageMenu from '../SelectImageMenu'
import { Tooltip, message } from 'antd'
import { formatSize } from '../../utils/helper'
import { IoCopy } from 'react-icons/io5'
import { FaQuestion } from 'react-icons/fa'

interface Props {
  image?: Image
}

const DetailsSide: React.FC<Props> = ({ image }) => {
  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value)
    message.success('copied to clipboard!')
  }

  const Item = ({ label, value }: { label: string; value?: string | number }) => {
    return (
      <div className="flex items-center gap-1">
        <span className="rounded-lg bg-sky-400/20 p-1 text-base font-semibold text-sky-600">
          {label}:{' '}
        </span>
        {value ? (
          <>
            <span className="truncate text-sm text-slate-600">
              {label === 'Size' ? formatSize(value as number) : value}
            </span>
            <Tooltip title="Copy" placement="top">
              <span
                className="cursor-pointer p-1 text-lg text-sky-400 hover:text-sky-600 hover:shadow-sm"
                onClick={() => copyToClipboard(value.toString())}
              >
                <IoCopy />
              </span>
            </Tooltip>
          </>
        ) : (
          <FaQuestion className="text-sky-600" />
        )}
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col gap-1 overflow-hidden whitespace-nowrap">
      <Item label="Name" value={image?.name} />
      <Item label="Size" value={image?.size} />
      <Item label="Url" value={image?.url} />

      <SelectImageMenu isFill={!!image} />
    </div>
  )
}

export default DetailsSide
