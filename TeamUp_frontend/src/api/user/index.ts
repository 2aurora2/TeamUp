import service from "@/http/service.ts";
import {ResponseResult} from "@/api/type.ts";
import {
    BanUserReq, GetAllUserListReq,
    GetAllUserListRes,
    GetUserInfoByIdReq,
    GetUserInfoByIdRes,
    LoginReq,
    LoginRes,
    RegisterReq,
    RegisterRes,
    UpdateUserInfoReq, UpdateUserInfoRes
} from "@/api/user/type.ts";
import {urlEncode} from "@/utils/CommonUtils.ts";

const login = (data: LoginReq) => {
    return service.post<ResponseResult<LoginRes>>('/login', data);
};

const logout = () => {
    return service.post<ResponseResult<null>>('/logout');
}

const register = (data: RegisterReq) => {
    return service.post<ResponseResult<RegisterRes>>('/register', data);
}

const getUserInfoById = (data: GetUserInfoByIdReq) => {
    return service.get<ResponseResult<GetUserInfoByIdRes>>('/user/get/info' + urlEncode(data));
}

const updateUserInfo = (data: UpdateUserInfoReq) => {
    return service.post<ResponseResult<UpdateUserInfoRes>>('/user/update/info', data);
}

const getAllUserList = (data: GetAllUserListReq) => {
    return service.get<ResponseResult<GetAllUserListRes>>('/user/get/all' + urlEncode(data));
}

const banUser = (data: BanUserReq) => {
    return service.post<ResponseResult<null>>('/user/ban', data);
}

export default {
    login,               // 用户登录
    logout,              // 退出登录
    register,            // 用户注册
    getUserInfoById,     // 获取用户信息
    updateUserInfo,      // 更新用户信息
    getAllUserList,      // 获取所有未被封禁的用户信息
    banUser,             // 封禁用户
};
