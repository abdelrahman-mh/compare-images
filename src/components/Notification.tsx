import React from 'react'
import { NotificationTypes } from '../types'

interface Props {
  type: NotificationTypes
  message: string
}

const Notification: React.FC<Props> = ({ type, message }) => {
  return <p className={`notification ${type}-notify`}>{message}</p>
}

export default Notification
