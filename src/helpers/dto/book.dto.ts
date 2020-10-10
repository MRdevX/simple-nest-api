export class CreateBookDto {
    readonly title: string
    readonly description: string
    readonly pageCount: number
    readonly excerpt: string
    readonly isbn: string
    readonly categories: number[]
}
