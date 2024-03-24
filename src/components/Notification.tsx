import { useAppSelector } from '../utils/hooks'

const Notification = () => {
  const { message, type, visible } = useAppSelector((state) => state.notification)

  if (!visible) return null

  return <div className={`notification ${type}`}>{message}</div>
}

export default Notification
