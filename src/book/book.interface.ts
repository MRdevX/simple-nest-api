import { BookEntity } from './book.entity'

interface BookData {
    slug: string
    title: string
    description: string
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
