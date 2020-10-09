import { Entity, PrimaryGeneratedColumn, Column, BeforeUpdate } from 'typeorm'

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
}
