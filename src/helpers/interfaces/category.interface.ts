/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CategoryEntity } from '../../models'

interface CategoryData {
    slug: string
    title: string
    description: string
    createdAt?: Date
    updatedAt?: Date
}

export interface CategoryRO {
    category: CategoryEntity
}

export interface CategoriesRO {
    categories: CategoryEntity[]
    categoriesCount: number
}
