export interface User {
    id: number,
    username: string,
    password: string,
    email: string,
    major: string,
    grade: string,
    avatar: string,
    is_banned: number
}

export interface UserItem extends User {
    role: string
}