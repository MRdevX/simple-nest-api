import { Entity, PrimaryGeneratedColumn, Column, BeforeUpdate, OneToMany } from 'typeorm'
import { CategoryEntity } from '../category/category.entity'

@Entity('book')
export class BookEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    slug: string

    @Column()
    title: string

    @Column({ default: '' })
    description: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created: Date

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated: Date

    @BeforeUpdate()
    updateTimestamp() {
        this.updated = new Date()
    }

    @OneToMany((type) => CategoryEntity, (category) => category.slug)
    categories: CategoryEntity[]
}
