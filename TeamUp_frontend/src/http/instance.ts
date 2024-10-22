import axios from 'axios'
import {useUserStore} from "@/store/useUserStore.ts";
import router from "@/router";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_PROXY_URL,
    timeout: 30 * 1000,
    headers: {
        'Content-Type': 'application/json',
    }
})

// 请求拦截器
axiosInstance.interceptors.request.use(
    (config) => {
        if (config.url === '/upload') {
            config.headers['Content-Type'] = 'multipart/form-data'
        }
        const userStore = useUserStore();
        const token = userStore.token;
        // token为空则重新登录
        if (!token) {
            localStorage.clear();
            router.push('/login');
            return config;
        }
        config.headers['token'] = `${userStore.token}`;
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
)

// 响应拦截器
// 2xx 范围内的状态码都会触发该函数
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (err) => {
        return Promise.reject(err);
    }
)

export default axiosInstance;

