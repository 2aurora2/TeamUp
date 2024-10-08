import {UserItem} from "@/interface/user.ts";
import api from "@/api";

export const getUserInfoById = async (userId: number): Promise<UserItem | null> => {
    try {
        const {data: res} = await api.userApi.getUserInfoById({
            userId: userId
        });
        if (res.code === 200) {
            return {
                ...res.data.user,
                role: res.data.roleList.includes(1) ? '超级管理员' : (res.data.roleList.includes(2) ? '管理员' : '普通用户')
            };
        } else return null;
    } catch (e: any) {
        return null;
    }
}