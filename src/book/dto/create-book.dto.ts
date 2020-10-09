export class CreateBookDto {
    readonly title: string
    readonly description: string
    readonly pageCount: number
    readonly excerpt: string
    readonly ismb: string
    readonly categories: string[]
}
