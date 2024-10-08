import {User} from "@/interface/user.ts";

export type LoginReq = {
    email: string,
    password: string,
}

export type LoginRes = {
    token: string,
    user: User,
    roleList: number[],
}

export type RegisterReq = {
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    major: string,
    grade: string
}

export type RegisterRes = {
    user: User
}

export type GetUserInfoByIdReq = {
    userId: number
}

export type GetUserInfoByIdRes = {
    user: User,
    roleList: number[]
}

export type UpdateUserInfoReq = {
    username: string,
    email: string,
    major: string,
    grade: string,
    avatar: string
}

export type UpdateUserInfoRes = {
    user: User
}