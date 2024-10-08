import service from "@/http/service.ts";
import {UploadFileReq, UploadFileRes} from "@/api/common/type.ts";
import {ResponseResult} from "@/api/type.ts";

const uploadFile = (data: UploadFileReq) => {
    return service.post<ResponseResult<UploadFileRes>>('/upload', data.file);
}

export default {
    uploadFile // 上传文件
}