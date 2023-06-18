export interface IBook {
  id: string
  imageUrl: string
  title: string
  descr: string
  author: string
  price: number
  category: number
  rating: number
}

export interface ISort {
  name: string
  sortProperty: string
}
