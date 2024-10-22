export interface Post {
    id: number,
    user_id: number,
    title: string,
    type: number,
    content: string,
    like_count: number,
    create_time: number,
    is_delete: number
}