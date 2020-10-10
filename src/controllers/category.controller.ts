import { Get, Post, Body, Put, Delete, Query, Param, Controller } from '@nestjs/common'
import { CategoryService } from '../services'
import { CategoriesRO, CategoryRO } from '../helpers/interfaces'
import { CreateCategoryDto } from '../helpers/dto'

import { ApiBearerAuth, ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiBearerAuth()
@ApiTags('categories')
@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @ApiOperation({ summary: 'Get all categories' })
    @ApiResponse({ status: 200, description: 'Return all categories.' })
    @Get()
    async findAll(@Query() query): Promise<CategoriesRO> {
        return await this.categoryService.findAll(query)
    }

    @Get(':id')
    async findOne(@Param('id') id): Promise<CategoryRO> {
        return await this.categoryService.findOne({ id })
    }

    @ApiOperation({ summary: 'Create category' })
    @ApiResponse({ status: 201, description: 'The category has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Post()
    async create(@Body('category') categoryData: CreateCategoryDto) {
        return this.categoryService.create(categoryData)
    }

    @ApiOperation({ summary: 'Update category' })
    @ApiResponse({ status: 201, description: 'The category has been successfully updated.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Put(':id')
    async update(@Param() params, @Body('category') categoryData: CreateCategoryDto) {
        return this.categoryService.update(params.id, categoryData)
    }

    @ApiOperation({ summary: 'Delete category' })
    @ApiResponse({ status: 201, description: 'The category has been successfully deleted.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Delete(':id')
    async delete(@Param() params) {
        return this.categoryService.delete(params.id)
    }
}
