<template>
    <el-container class="form-container col-flex">
        <div class="form-header col-flex">
            <div class="header row-flex">
                <img class="logo-avatar-size" src="@/assets/image/logo.png" alt="logo">
                <span style="margin-left: 8px">TeamUp</span>
            </div>
            <div><span>用户登录</span></div>
        </div>
        <el-form
                :label-position="labelPosition"
                label-width="auto"
                :model="loginInfo"
                style="width: 430px"
        >
            <el-form-item label="邮箱">
                <el-input v-model="loginInfo.email" placeholder="请输入注册所用邮箱"/>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="loginInfo.password" :type="addPassFlag ? 'text' : 'password'"
                          placeholder="请输入密码">
                    <template #suffix>
              <span @click="addPassFlag = !addPassFlag">
                <el-icon v-if="addPassFlag"><View/></el-icon>
                <el-icon v-else><Hide/></el-icon>
              </span>
                    </template>
                </el-input>
            </el-form-item>
        </el-form>
        <div class="reset">
            <router-link to="/reset" style="text-decoration: none;font-size: 12px">忘记密码?前往重置</router-link>
        </div>
        <el-button color="#626aef" style="width: 200px;margin-top: 20px;font-size: 15px" @click="loginHandle">
            登录
        </el-button>
    </el-container>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {FormProps} from 'element-plus'
import api from "@/api";
import {ErrorNotice, SuccessNotice, WarnNotice} from "@/utils/Notification.ts";
import {useUserStore} from "@/store/useUserStore.ts";
import router from "@/router";
import {Hide, View} from "@element-plus/icons-vue";
import {checkEmptyProperty} from "@/utils/CommonUtils.ts";

const labelPosition = ref<FormProps['labelPosition']>('right')
const userStore = useUserStore()
const addPassFlag = ref(false)
const loginInfo = ref({
    email: '',
    password: ''
})

const loginHandle = async () => {
    if (checkEmptyProperty(loginInfo.value)) {
        WarnNotice('请确保输入信息不为空！');
        return;
    }
    try {
        const {data: res} = await api.userApi.login(loginInfo.value);
        if (res.code === 200) {
            userStore.user = res.data.user;
            userStore.roleList = res.data.roleList;
            userStore.token = res.data.token;
            userStore.haveLogin = true;
            SuccessNotice('登录成功', 1000);
            await router.push('/');
        } else ErrorNotice(res.message)
    } catch (e: any) {
        ErrorNotice(e.response.data.message)
    }
}
</script>

<style scoped lang="scss">
@import "@/assets/style/global";

.form-container {
    height: 100%;

    .form-header {
        padding: 20px;

        div {
            margin-top: 20px;

            span {
                font-size: 20px;
            }
        }
    }

    .reset {
        width: 430px;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }
}
</style>