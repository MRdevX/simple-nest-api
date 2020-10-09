import { Get, Post, Body, Put, Delete, Query, Param, Controller } from '@nestjs/common'
import { BookService } from './book.service'
import { BooksRO, BookRO } from './book.interface'
import { CreateBookDto } from './dto'

import { ApiBearerAuth, ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiBearerAuth()
@ApiTags('books')
@Controller('books')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @ApiOperation({ summary: 'Get all books' })
    @ApiResponse({ status: 200, description: 'Return all books.' })
    @Get()
    async findAll(@Query() query): Promise<BooksRO> {
        return await this.bookService.findAll(query)
    }

    @Get(':slug')
    async findOne(@Param('slug') slug): Promise<BookRO> {
        return await this.bookService.findOne({ slug })
    }

    @ApiOperation({ summary: 'Create book' })
    @ApiResponse({ status: 201, description: 'The book has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Post()
    async create(@Body('book') bookData: CreateBookDto) {
        return this.bookService.create(bookData)
    }

    @ApiOperation({ summary: 'Update book' })
    @ApiResponse({ status: 201, description: 'The book has been successfully updated.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Put(':slug')
    async update(@Param() params, @Body('book') bookData: CreateBookDto) {
        return this.bookService.update(params.slug, bookData)
    }

    @ApiOperation({ summary: 'Delete book' })
    @ApiResponse({ status: 201, description: 'The book has been successfully deleted.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Delete(':slug')
    async delete(@Param() params) {
        return this.bookService.delete(params.slug)
    }
}
