export interface Article<T extends Date | string = Date> {
  id: string
  createdAt: T
  title: string
  preview: string
  image: string
  description: string
}
