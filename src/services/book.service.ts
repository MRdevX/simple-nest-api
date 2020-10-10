import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, getRepository, DeleteResult } from 'typeorm'
import { BookEntity, CategoryEntity } from '../models'
import { CreateBookDto } from '../helpers/dto'
import { BookRO, BooksRO } from '../helpers/interfaces'

import * as slug from 'slug'

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(BookEntity)
        private readonly bookRepository: Repository<BookEntity>,
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>,
    ) {}

    async findAll(query): Promise<BooksRO> {
        const qb = await getRepository(BookEntity).createQueryBuilder('book')

        qb.where('1 = 1')

        qb.orderBy('book.created', 'DESC')

        const booksCount = await qb.getCount()

        if ('limit' in query) {
            qb.limit(query.limit)
        }

        if ('offset' in query) {
            qb.offset(query.offset)
        }

        if ('title' in query) {
            qb.andWhere('book.title LIKE :title', { title: `%${query.title}%` })
        }

        const books = await qb.leftJoinAndSelect('book.categories', 'category').getMany()

        return { books, booksCount }
    }

    async findOne(where): Promise<BookRO> {
        const book = await this.bookRepository.findOne(where, { relations: ['categories'] })
        return { book }
    }

    async create(bookData: CreateBookDto): Promise<BookEntity> {
        const book = new BookEntity()
        book.title = bookData.title
        book.description = bookData.description
        book.slug = this.slugify(bookData.title)
        book.categories = []
        const { categories } = bookData

        await Promise.all(
            categories.map(async (categoryId) => {
                const category = await this.categoryRepository.findOne({ where: { id: categoryId } })
                if (category) {
                    book.categories.push(category)
                }
            }),
        )

        const newBook = await this.bookRepository.save(book)

        return newBook
    }

    async update(id: number, bookData: any): Promise<BookRO> {
        const toUpdate = await this.bookRepository.findOne({ id: id })
        const updated = Object.assign(toUpdate, bookData)
        const book = await this.bookRepository.save(updated)
        return { book }
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.bookRepository.delete({ id: id })
    }

    slugify(title: string) {
        return `${slug(title, { lower: true })}-${((Math.random() * Math.pow(36, 6)) | 0).toString(36)}`
    }
}