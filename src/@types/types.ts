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

export interface ICartItem extends IBook {
  id: string
  imageUrl: string
  title: string
  descr: string
  author: string
  price: number
  category: number
  rating: number
  count: number
}

export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
}

export interface ISort {
  name: string
  sortProperty: SortPropertyEnum
}
