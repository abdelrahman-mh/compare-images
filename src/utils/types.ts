export type NotificationTypes = 'error' | 'success' | 'warring'

export type Side = 'left' | 'right'

export interface Image {
  url: string
  name: string
  size: number
  side: Side
}
export type PopupRef = {
  close: () => void
  open: () => void
  toggle: () => void
}
