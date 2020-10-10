import { Entity, PrimaryGeneratedColumn, Column, BeforeUpdate, JoinTable, ManyToMany } from 'typeorm'
import { CategoryEntity } from '../models'

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

    @Column({ default: 0 })
    pageCount: string

    @Column({ default: '' })
    excerpt: string

    @Column({ default: '' })
    isbn: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created: Date

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated: Date

    @BeforeUpdate()
    updateTimestamp() {
        this.updated = new Date()
    }

    @ManyToMany(() => CategoryEntity, (category) => category.books, {
        cascade: true,
    })
    @JoinTable()
    categories: CategoryEntity[]
}
