import {AddMatchItemReq, DelMatchItemReq, GetAllMatchReq, GetAllMatchRes, GetRecentMatchRes} from "@/api/match/type.ts";
import service from "@/http/service.ts";
import {ResponseResult} from "@/api/type.ts";
import {urlEncode} from "@/utils/CommonUtils.ts";

const addMatchItem = (data: AddMatchItemReq) => {
    return service.post<ResponseResult<null>>('/match/add', data);
}

const delMatchItem = (data: DelMatchItemReq) => {
    return service.post<ResponseResult<null>>('/match/del', data);
}

const getAllMatch = (data: GetAllMatchReq) => {
    return service.get<ResponseResult<GetAllMatchRes>>('/match/get/all' + urlEncode(data));
}

const getRecentMatch = () => {
    return service.get<ResponseResult<GetRecentMatchRes>>('/match/get/recent');
}

export default {
    addMatchItem,   // 添加比赛条目
    delMatchItem,   // 删除比赛条目
    getAllMatch,    // 获取所有比赛
    getRecentMatch, // 获取近期比赛
}