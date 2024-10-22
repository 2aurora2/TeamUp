import {
    CreatePostReq,
    CreatePostRes, DelOwnPostReq, DelPublicPostReq, GetAllPostListReq, GetAllPostListRes,
    GetPostDetailsReq,
    GetPostDetailsRes, GetPostListReq, GetPostListRes, GetUserLikePostReq, GetUserLikePostRes,
    LikeOrUnlikePostReq, UpdateOwnPostReq
} from "@/api/post/type.ts";
import service from "@/http/service.ts";
import {ResponseResult} from "@/api/type.ts";
import {urlEncode} from "@/utils/CommonUtils.ts";

const createPost = (data: CreatePostReq) => {
    return service.post<ResponseResult<CreatePostRes>>('/post/create', data);
}

const getPostDetails = (data: GetPostDetailsReq) => {
    return service.get<ResponseResult<GetPostDetailsRes>>('/post/get/info' + urlEncode(data));
}

const likeOrUnlikePost = (like: number, data: LikeOrUnlikePostReq) => {
    if (like) return service.post<ResponseResult<null>>('/post/like', data);
    else return service.post<ResponseResult<null>>('/post/unlike', data);
}

const getUserLikePost = (data: GetUserLikePostReq) => {
    return service.get<ResponseResult<GetUserLikePostRes>>('/post/get/user/like' + urlEncode(data));
}

const getPostList = (data: GetPostListReq) => {
    return service.get<ResponseResult<GetPostListRes>>('/post/get/list' + urlEncode(data));
}

const delOwnPost = (data: DelOwnPostReq) => {
    return service.post<ResponseResult<null>>('/post/del/own', data);
}

const delPublicPost = (data: DelPublicPostReq) => {
    return service.post<ResponseResult<null>>('/post/del/public', data);
}

const updateOwnPost = (data: UpdateOwnPostReq) => {
    return service.post<ResponseResult<null>>('/post/update/own', data);
}

const getAllPostList = (data: GetAllPostListReq) => {
    return service.get<ResponseResult<GetAllPostListRes>>('/post/get/all' + urlEncode(data));
}

export default {
    createPost,     // 创建帖子
    getPostDetails, // 根据帖子id获取帖子内容
    likeOrUnlikePost,   // 点赞或取消点赞帖子
    getUserLikePost,    // 查询用户是否点赞了帖子
    getPostList,        // 查询特定条件的帖子列表
    delOwnPost,         // 删除自己发布的帖子
    delPublicPost,      // 管理员删除平台帖子
    updateOwnPost,      // 更新自己发布的帖子
    getAllPostList,     // 获取所有未删除的帖子
}