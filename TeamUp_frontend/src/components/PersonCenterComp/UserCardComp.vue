<template>
    <div class="user-card">
        <div class="avatar col-flex">
            <img :src="props.avatar" alt="avatar"/>
            <el-tag type="primary">{{ props.role }}</el-tag>
        </div>
        <div class="info">
            <div class="info-item">
                <img src="@/assets/image/username.png" alt="username"/>
                <span class="label">用户名：</span>
                <span>{{ props.username }}</span>
            </div>
            <div class="info-item">
                <img src="@/assets/image/major.png" alt="major"/>
                <span class="label">专业：</span>
                <span>{{ props.major }}</span>
            </div>
            <div class="info-item">
                <img src="@/assets/image/grade.png" alt="grade"/>
                <span class="label">年级：</span>
                <span>{{ props.grade }}</span>
            </div>
            <div v-if="props.isOwn" style="margin: 15px">
                <el-link type="primary" @click="handleOpenDialog">修改个人信息</el-link>
            </div>
        </div>
    </div>
    <el-dialog
            v-model="updateDialogVisible"
            title="修改个人信息"
            width="500"
    >
        <el-form
                :label-position="labelPosition"
                label-width="auto"
                :model="updateInfo"
                style="width: 430px"
        >
            <el-form-item label="头像">
                <el-upload
                        class="avatar-uploader"
                        action="" accept="image/png,image/jpg,image/jpeg"
                        :http-request="uploadFile"
                        :on-success="handleUploadSuccess"
                        :on-error="handleUploadError"
                        :limit="1"
                        :show-file-list="false"
                >
                    <img :src="updateInfo.avatar" class="avatar" alt="avatar"
                         style="width: 50px;height: 50px;border-radius: 50%;margin: 5px"/>
                </el-upload>
                <span>(点击头像可上新的头像)</span>
            </el-form-item>
            <el-form-item label="用户名">
                <el-input v-model="updateInfo.username" placeholder="请输入用户名"/>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="updateInfo.email" placeholder="请输入邮箱"/>
            </el-form-item>
            <el-form-item label="专业">
                <el-input v-model="updateInfo.major" placeholder="请输入你所处的专业"/>
            </el-form-item>
            <el-form-item label="年级">
                <el-input v-model="updateInfo.grade" placeholder="请输入你当前的年级（比如2022级……）"/>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="handleUpdate">
                    提交
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {FormProps, UploadFile, UploadFiles, UploadRequestOptions} from "element-plus";
import {ErrorNotice, SuccessNotice} from "@/utils/Notification.ts";
import api from "@/api";
import {useUserStore} from "@/store/useUserStore.ts";

const props = defineProps({
    avatar: String,
    username: String,
    major: String,
    grade: String,
    role: String,
    isOwn: Boolean,
    email: String
})

const updateDialogVisible = ref(false);
const labelPosition = ref<FormProps['labelPosition']>('left')
const updateInfo = ref({
    email: '',
    username: '',
    major: '',
    grade: '',
    avatar: ''
})
const userStore = useUserStore();

const uploadFile = (options: UploadRequestOptions) => {
    let formData = new FormData();
    formData.append('file', options.file);
    return api.commonApi.uploadFile({file: formData});
}

const handleUploadSuccess = (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
    if (response.data.code === 200) {
        updateInfo.value.avatar = response.data.data.url;
        SuccessNotice('上传成功！');
    } else {
        ErrorNotice('上传失败！' + response.data.message);
        uploadFiles.splice(uploadFiles.indexOf(uploadFile), 1);
    }
}

const handleUploadError = (error: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
    ErrorNotice('上传失败！' + error.message);
    uploadFiles.splice(uploadFiles.indexOf(uploadFile), 1);
}

const handleOpenDialog = () => {
    updateDialogVisible.value = true;
    updateInfo.value = {
        email: props.email ? props.email : '',
        username: props.username ? props.username : '',
        major: props.major ? props.major : '',
        grade: props.grade ? props.grade : '',
        avatar: props.avatar ? props.avatar : '',
    }
}

const handleUpdate = async () => {
    try {
        const {data: res} = await api.userApi.updateUserInfo(updateInfo.value);
        if (res.code === 200) {
            SuccessNotice('修改个人信息成功！');
            updateDialogVisible.value = false;
            userStore.user = res.data.user;
            setTimeout(() => {
                location.reload();
            }, 300);
        } else ErrorNotice(res.message);
    } catch (e: any) {
        ErrorNotice(e.response.data.message);
    }
}
</script>

<style scoped lang="scss">
.user-card {
    width: 70%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-top: 15px;

    .avatar {
        width: 20%;
        overflow: hidden;

        img {
            width: 90%;
            height: auto;
            border: 1px solid #cccccc;
            border-radius: 50%;
            margin: 8px;
        }
    }

    .info {
        width: 60%;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .info-item {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin: 8px;

            img {
                width: 25px;
                height: 25px;
                margin: 8px;
            }

            span {
                font-size: 20px;
            }

            .label {
                font-size: 25px;
                font-weight: 800;
                padding: 3px;
            }
        }
    }
}
</style>