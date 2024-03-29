import { Image } from './types'
import { AxiosResponse } from 'axios'

// For Development Tests!
export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function formatSize(size: number) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let unitIndex = 0

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex++
  }

  return size.toFixed(2) + ' ' + units[unitIndex]
}

export const getBase64Representation = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result as string)
    }
    reader.onerror = (error) => {
      reject(error)
    }
    reader.readAsDataURL(file)
  })
}

export const isValidURL = (url: string): boolean => {
  const pattern = /^(ftp|http|https):\/\/[^ "]+$/
  return pattern.test(url)
}

export const isValidType = (file: File): boolean => {
  return file.type.startsWith('image/')
}
export const parseImage = async (file: File, side: 'left' | 'right'): Promise<Image> => {
  if (isValidType(file)) {
    const url = await getBase64Representation(file)
    const image: Image = {
      url,
      name: file.name,
      size: file.size,
      side,
    }

    return image
  }
  throw new Error('Invalid image!')
}

export const fileNameFromUrl = (imageUrl: string): string => {
  const urlParts = imageUrl.split('/')
  return urlParts[urlParts.length - 1]
}

export const parseImageFromWEB = ({
  response,
  imageUrl,
  side,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response: AxiosResponse<any, any>
  imageUrl: string
  side: 'left' | 'right'
}): Promise<Image> => {
  return new Promise((resolve, reject) => {
    try {
      const contentType = response.headers['content-type']
      if (contentType && contentType.startsWith('image/')) {
        const imageData = new Blob([response.data], { type: contentType })
        const imageUrlObject = URL.createObjectURL(imageData)
        const imageInfo: Image = {
          url: imageUrlObject,
          name: fileNameFromUrl(imageUrl),
          size: Number(imageData.size),
          side,
        }

        resolve(imageInfo)
      } else {
        reject(new Error('The URL does not point to a valid image.'))
      }
    } catch (error) {
      reject(error)
    }
  })
}
