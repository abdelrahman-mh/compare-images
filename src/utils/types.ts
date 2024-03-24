export type NotificationTypes = 'error' | 'success' | 'warring'

export type Side = 'left' | 'right'

export interface Image {
  url: string
  name: string
  size: number
  side: Side
}

export type NotifyType = 'error' | 'success' | 'warning' | 'info'
export interface Notification {
  message: string
  type?: NotifyType

  // default 3000;
  timeout?: number
}
