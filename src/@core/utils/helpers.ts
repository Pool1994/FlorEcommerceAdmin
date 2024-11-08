import { ModalProps } from "../contracts/IModal"
export enum MimeType {
  JPEG = 'image/jpeg',
  PNG = 'image/png',
  PDF = 'application/pdf',
  PLAIN = 'text/plain',
  MPEG = 'audio/mpeg',
  MP4 = 'video/mp4'
}

// 👉 IsEmpty
export const isEmpty = (value: unknown): boolean => {
  if (value === null || value === undefined || value === '')
    return true

  return !!(Array.isArray(value) && value.length === 0)
}

// 👉 IsNullOrUndefined
export const isNullOrUndefined = (value: unknown): value is undefined | null => {
  return value === null || value === undefined
}

// 👉 IsEmptyArray
export const isEmptyArray = (arr: unknown): boolean => {
  return Array.isArray(arr) && arr.length === 0
}

// 👉 IsObject
export const isObject = (obj: unknown): obj is Record<string, unknown> =>
  obj !== null && !!obj && typeof obj === 'object' && !Array.isArray(obj)

// 👉 IsToday
export const isToday = (date: Date) => {
  const today = new Date()

  return (
    date.getDate() === today.getDate()
    && date.getMonth() === today.getMonth()
    && date.getFullYear() === today.getFullYear()
  )
}
export function isModalProps<T>(modal: any): modal is ModalProps<T> {
  return (
    typeof modal === 'object' &&
    modal !== null &&
    typeof modal.show === 'boolean' &&
    typeof modal.title === 'string' &&
    (modal.item === undefined || typeof modal.item === 'object')
  )
}
export async function urlToFile(blobUrl: string, fileName: string, mimeType: MimeType, init?: RequestInit): Promise<File> {
  // Fetch the Blob from the URL
  const response = await fetch(blobUrl, init);
  const blob = await response.blob();

  // Create a new File from the Blob
  const file = new File([blob], fileName, { type: mimeType });
  return file;
}

