import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, getRepository, DeleteResult } from 'typeorm'
import { CategoryEntity } from './category.entity'
import { CreateCategoryDto } from './dto'
import { CategoryRO, CategoriesRO } from './category.interface'

import * as slug from 'slug'

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>,
    ) {}

    async findAll(query): Promise<CategoriesRO> {
        const qb = await getRepository(CategoryEntity).createQueryBuilder('category')

        qb.where('1 = 1')

        qb.orderBy('category.created', 'DESC')

        const categoriesCount = await qb.getCount()

        if ('limit' in query) {
            qb.limit(query.limit)
        }

        if ('offset' in query) {
            qb.offset(query.offset)
        }

        const categories = await qb.getMany()

        return { categories, categoriesCount }
    }

    async findOne(where): Promise<CategoryRO> {
        const category = await this.categoryRepository.findOne(where)
        return { category }
    }

    async create(categoryData: CreateCategoryDto): Promise<CategoryEntity> {
        const category = new CategoryEntity()
        category.title = categoryData.title
        category.description = categoryData.description
        category.slug = this.slugify(categoryData.title)

        const newCategory = await this.categoryRepository.save(category)

        return newCategory
    }

    async update(slug: string, categoryData: any): Promise<CategoryRO> {
        const toUpdate = await this.categoryRepository.findOne({ slug: slug })
        const updated = Object.assign(toUpdate, categoryData)
        const category = await this.categoryRepository.save(updated)
        return { category }
    }

    async delete(slug: string): Promise<DeleteResult> {
        return await this.categoryRepository.delete({ slug: slug })
    }

    slugify(title: string) {
        return `${slug(title, { lower: true })}`
    }
}
