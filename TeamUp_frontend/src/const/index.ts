import {RouteDesc} from "@/interface/common.ts";
import routeDesc from '@/assets/file/RouteDesc.json'
import {User} from "@/interface/user.ts";

const ENTRY_ROUTES = ['/login', '/register']
const NOT_NEED_TOKEN_URL = [
    "/register",
    "/login",
]

const ROUTE_DESC: RouteDesc = routeDesc as RouteDesc

const DEFAULT_USER: User = {
    avatar: "", email: "", grade: "", id: 0, is_banned: 0, password: "", school: "", username: ""
}

export default {
    ENTRY_ROUTES,
    NOT_NEED_TOKEN_URL,         // 不需要登录的接口
    ROUTE_DESC,                 // 路由描述
    DEFAULT_USER,               // 数据库用户对象
}

