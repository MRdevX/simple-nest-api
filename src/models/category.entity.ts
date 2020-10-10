import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, BeforeUpdate } from 'typeorm'
import { BookEntity } from '../models'

@Entity('category')
export class CategoryEntity {
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

    @ManyToMany(() => BookEntity, (book) => book.categories)
    books: BookEntity[]
}
