import { Entity, PrimaryGeneratedColumn, Column, BeforeUpdate, ManyToOne } from 'typeorm'
import { BookEntity } from '../book/book.entity'

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

    @ManyToOne((type) => BookEntity, (book) => book.categories)
    book: BookEntity
}
