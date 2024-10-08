import {AddAwardReq, DelAwardByAwardIdReq, GetAllAwardsByIdReq, GetAllAwardsByIdRes} from "@/api/award/type.ts";
import service from "@/http/service.ts";
import {urlEncode} from "@/utils/CommonUtils.ts";
import {ResponseResult} from "@/api/type.ts";

const getAllAwardsById = (data: GetAllAwardsByIdReq) => {
    return service.get<ResponseResult<GetAllAwardsByIdRes>>('/award/get/all' + urlEncode(data));
}

const delAwardByAwardId = (data: DelAwardByAwardIdReq) => {
    return service.post<ResponseResult<null>>('/award/del/', data);
}

const addAward = (data: AddAwardReq) => {
    return service.post<ResponseResult<null>>('/award/add', data);
}

export default {
    getAllAwardsById,   // 获取用户所有获奖记录
    delAwardByAwardId,  // 删除自己awardId对应的获奖经历
    addAward,           // 添加自己的获奖记录
}