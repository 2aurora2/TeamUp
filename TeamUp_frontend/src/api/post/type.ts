import {Post} from "@/interface/post.ts";

export type CreatePostReq = {
    title: string,
    type: number,
    content: string
}

export type CreatePostRes = {
    post: Post
}

export type GetPostDetailsReq = {
    postId: number
}

export type GetPostDetailsRes = {
    post: Post
}

export type LikeOrUnlikePostReq = {
    postId: number
}

export type GetUserLikePostReq = {
    postId: number,
    userId: number
}

export type GetUserLikePostRes = {
    like: number
}

export type GetPostListReq = {
    key: string | null,
    sort: string,
    type: number,
    page: number,
    pageSize: number
}

export type GetPostListRes = {
    postList: Post[],
    total: number
}

export type DelOwnPostReq = {
    postId: number
}

export type DelPublicPostReq = {
    userId: number,
    postId: number
}

export type UpdateOwnPostReq = {
    postId: number,
    title: string,
    type: number,
    content: string
}

export type GetAllPostListReq = {
    page: number,
    pageSize: number
}

export type GetAllPostListRes = {
    postList: Post[],
    total: number
}
