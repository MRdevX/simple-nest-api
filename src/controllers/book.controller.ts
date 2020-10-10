import { Get, Post, Body, Put, Delete, Query, Param, Controller } from '@nestjs/common'
import { BookService } from '../services'
import { BooksRO, BookRO } from '../helpers/interfaces'
import { CreateBookDto } from '../helpers/dto'

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

    @Get(':id')
    async findOne(@Param('id') id): Promise<BookRO> {
        return await this.bookService.findOne({ id })
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
    @Put(':id')
    async update(@Param() params, @Body('book') bookData: CreateBookDto) {
        return this.bookService.update(params.id, bookData)
    }

    @ApiOperation({ summary: 'Delete book' })
    @ApiResponse({ status: 201, description: 'The book has been successfully deleted.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Delete(':id')
    async delete(@Param() params) {
        return this.bookService.delete(params.id)
    }
}
