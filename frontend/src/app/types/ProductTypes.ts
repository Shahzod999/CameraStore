export interface Product {
  _id: string
  name: string
  image: string
  brand: string
  quantity: number
  category: Category
  description: string
  rating: number
  numReviews: number
  price: number
  countInStock: number
  createdAt: string
  updatedAt: string
  __v: number
}

export interface Category {
  _id: string
  name: string
  __v: number
}
