export interface Match {
    id: number,
    title: string,
    link: string,
    month: number,
    description: string,
    is_delete: number
}

export interface MatchItem extends Match {
    tagList: string[]
}