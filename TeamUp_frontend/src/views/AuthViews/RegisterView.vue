<template>
    <el-container class="form-container col-flex">
        <div class="form-header col-flex">
            <div class="header row-flex">
                <img class="logo-avatar-size" src="@/assets/image/logo.png" alt="logo">
                <span style="margin-left: 8px">TeamUp</span>
            </div>
            <div><span>用户注册</span></div>
        </div>
        <el-form
                :label-position="labelPosition"
                label-width="auto"
                :model="registerInfo"
                style="width: 430px"
        >
            <el-form-item label="用户名">
                <el-input v-model="registerInfo.username" placeholder="请输入用户名"/>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="registerInfo.email" placeholder="请使用未注册过的邮箱进行注册"/>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="registerInfo.password" type="password" placeholder="请输入密码"/>
            </el-form-item>
            <el-form-item label="确认密码">
                <el-input v-model="registerInfo.confirmPassword" type="password" placeholder="请再次输入密码"/>
            </el-form-item>
            <el-form-item label="专业">
                <el-input v-model="registerInfo.major" placeholder="请输入你所处的专业"/>
            </el-form-item>
            <el-form-item label="年级">
                <el-input v-model="registerInfo.grade" placeholder="请输入你当前的年级（比如2022级……）"/>
            </el-form-item>
        </el-form>
        <el-button color="#626aef" style="width: 200px;margin-top: 20px;font-size: 15px" @click="registerHandle">
            注册
        </el-button>
    </el-container>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {FormProps} from "element-plus";
import {ErrorNotice, SuccessNotice, WarnNotice} from "@/utils/Notification.ts";
import api from "@/api";
import router from "@/router";
import {checkEmptyProperty} from "@/utils/CommonUtils.ts";

const labelPosition = ref<FormProps['labelPosition']>('left')
const registerInfo = ref({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    major: '',
    grade: ''
})
const registerHandle = async () => {
    if (checkEmptyProperty(registerInfo.value)) {
        WarnNotice('请确保输入信息不为空！');
        return;
    }
    try {
        const {data: res} = await api.userApi.register(registerInfo.value);
        if (res.code === 200) {
            SuccessNotice('注册成功!');
            router.push('./login');
        } else ErrorNotice(res.message);
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
}

.send-code {
    color: dodgerblue;

    &:hover {
        cursor: pointer;
    }
}
</style>