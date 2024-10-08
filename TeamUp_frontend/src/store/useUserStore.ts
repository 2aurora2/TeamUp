import {defineStore} from "pinia";
import {SelfStorage} from "./index.ts";
import {parse, stringify} from 'zipson'
import {User} from "@/interface/user.ts";
import Const from "@/const";

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            haveLogin: false,
            user: Const.DEFAULT_USER as User,
            token: '',
            roleList: [] as number[]
        }
    },
    getters: {},
    actions: {},
    persist: {
        key: 'teamup-user',
        serializer: {
            deserialize: parse,
            serialize: stringify,
        },
        storage: SelfStorage
    }
})