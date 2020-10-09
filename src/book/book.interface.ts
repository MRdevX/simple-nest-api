/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BookEntity } from './book.entity'

interface BookData {
    slug: string
    title: string
    description: string
    excerpt?: string
    isbn?: string
    pageCount?: number
    createdAt?: Date
    updatedAt?: Date
}

export interface BookRO {
    book: BookEntity
}

export interface BooksRO {
    books: BookEntity[]
    booksCount: number
}
