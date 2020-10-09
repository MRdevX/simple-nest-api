import { Get, Post, Body, Put, Delete, Query, Param, Controller } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CategoriesRO, CategoryRO } from './category.interface'
import { CreateCategoryDto } from './dto'

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

    @Get(':slug')
    async findOne(@Param('slug') slug): Promise<CategoryRO> {
        return await this.categoryService.findOne({ slug })
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
    @Put(':slug')
    async update(@Param() params, @Body('category') categoryData: CreateCategoryDto) {
        return this.categoryService.update(params.slug, categoryData)
    }

    @ApiOperation({ summary: 'Delete category' })
    @ApiResponse({ status: 201, description: 'The category has been successfully deleted.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Delete(':slug')
    async delete(@Param() params) {
        return this.categoryService.delete(params.slug)
    }
}
