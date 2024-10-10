<template>
    <el-container>
        <user-card-comp
                :avatar="user?.avatar"
                :username="user?.username"
                :major="user?.major"
                :grade="user?.grade"
                :role="user?.role"
                :email="user?.email"
                :is-own="isOwn"
        />
        <div class="award-record col-flex">
            <p>获奖经历</p>
            <el-link v-if="isOwn" @click="uploadDialogVisible = true">点击上传获奖经历</el-link>
            <award-table-comp
                    v-model:award-list="awardList"
                    v-model:loading="loading"
                    :is-own="isOwn"
                    @update-award-list="getAwardList(1)"
            />
            <div class="pagination">
                <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="total"
                        :hide-on-single-page="true"
                        :default-page-size="10"
                        :current-page="page"
                        @current-change="getAwardList"
                />
            </div>
        </div>
        <el-dialog
                v-model="uploadDialogVisible"
                title="上传获奖经历"
                width="500"
                destroy-on-close
        >
            <el-form
                    :label-position="labelPosition"
                    label-width="auto"
                    :model="uploadInfo"
                    style="width: 430px"
            >
                <el-form-item label="赛事名称">
                    <el-input v-model="uploadInfo.title" placeholder="请输入赛事名称"/>
                </el-form-item>
                <el-form-item label="奖项">
                    <el-input v-model="uploadInfo.prize" placeholder="请输入所获奖项"/>
                </el-form-item>
                <el-form-item label="获奖时间">
                    <el-date-picker
                            v-model="uploadInfo.date"
                            type="date"
                            placeholder="请选择获奖时间"
                            format="YYYY/MM/DD"
                            value-format="YYYY-MM-DD"
                    />
                </el-form-item>
                <el-form-item label="上传证明材料">
                    <el-upload
                            accept="image/png,image/jpg,image/jpeg"
                            :http-request="uploadFile"
                            :on-error="handleUploadError"
                            :on-success="handleUploadSuccess"
                            :before-upload="handleBeforeUpload"
                            :show-file-list="true"
                            :on-remove="handleRemoveFile"
                    >
                        <template #trigger>
                            <el-link type="primary">选择一张图片上传</el-link>
                        </template>
                    </el-upload>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="handleUploadAward">
                        提交
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </el-container>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import router from "@/router";
import {UserItem} from "@/interface/user.ts";
import {getUserInfoById} from "@/utils/DataTranformUtils.ts";
import {ErrorNotice, SuccessNotice, WarnNotice} from "@/utils/Notification.ts";
import {useUserStore} from "@/store/useUserStore.ts";
import UserCardComp from "@/components/PersonCenterComp/UserCardComp.vue";
import {Award} from "@/interface/award.ts";
import AwardTableComp from "@/components/PersonCenterComp/AwardTableComp.vue";
import api from "@/api";
import {FormProps, UploadFile, UploadFiles, UploadRequestOptions} from "element-plus";

const user = ref<UserItem | null>(null);
const isOwn = ref(false);
const userStore = useUserStore();

const getUserCardInfo = async (userId: number) => {
    // 获取当前router对应用户信息
    user.value = await getUserInfoById(userId);
    if (!user.value) {
        ErrorNotice('获取用户信息失败！');
        router.push('/404');
    }
    // 判断是否为用户自己
    isOwn.value = userStore.user.id === user.value?.id;
}

const loading = ref(true);
const total = ref(0);
const page = ref(1);
const awardList = ref<Award[]>([]);
const getAwardList = async (newPage: number) => {
    page.value = newPage;
    loading.value = false;
    const userId = parseInt(<string>router.currentRoute.value.params.userId, 10);
    try {
        const {data: res} = await api.awardApi.getAllAwardsById({
            userId: userId,
            page: page.value,
            pageSize: 10
        });
        if (res.code === 200) {
            awardList.value = res.data.awardList;
            total.value = res.data.total;
        } else ErrorNotice(res.message);
    } catch (e: any) {
        ErrorNotice(e.response.data.message);
    }
}

const uploadDialogVisible = ref(false);
const labelPosition = ref<FormProps['labelPosition']>('left')
const uploadInfo = ref({
    title: '',
    prize: '',
    date: '',
    proof: ''
})
const handleUploadAward = async () => {
    try {
        const {data: res} = await api.awardApi.addAward(uploadInfo.value);
        if (res.code === 200) {
            SuccessNotice('上传获奖经历成功！');
            uploadInfo.value = {
                title: '',
                prize: '',
                date: '',
                proof: ''
            };
            uploadDialogVisible.value = false;
            await getAwardList(1);
        } else ErrorNotice(res.message);
    } catch (e: any) {
        ErrorNotice(e.response.data.message);
    }
}
// 上传图片相关-1
const uploadFile = (options: UploadRequestOptions) => {
    let formData = new FormData();
    formData.append('file', options.file);
    return api.commonApi.uploadFile({file: formData});
}
// 上传图片相关-2
const handleUploadSuccess = (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
    if (response.data.code === 200) {
        uploadInfo.value.proof = response.data.data.url;
        SuccessNotice('上传成功！');
    } else {
        ErrorNotice('上传失败！' + response.data.message);
        uploadFiles.splice(uploadFiles.indexOf(uploadFile), 1);
    }
}
// 上传图片相关-3
const handleUploadError = (error: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
    ErrorNotice('上传失败！' + error.message);
    uploadFiles.splice(uploadFiles.indexOf(uploadFile), 1);
}
// 上传图片相关-4
const handleBeforeUpload = () => {
    if (uploadInfo.value.proof !== '') {
        WarnNotice('仅可上传一张图片！');
        return false;
    }
    return true;
}
// 上传图片相关-5
const handleRemoveFile = () => {
    uploadInfo.value.proof = '';
}

watch(() => router.currentRoute.value.params.userId, () => {
    location.reload();
})

onMounted(async () => {
    const userId = parseInt(<string>router.currentRoute.value.params.userId, 10);
    await getUserCardInfo(userId);
    await getAwardList(page.value);
})
</script>

<style scoped lang="scss">
.el-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column !important;
    align-items: center;

    .award-record {
        width: 70%;
        margin-top: 10px;

        p {
            font-size: 28px;
            width: 100%;
            text-align: center;
            margin: 10px;
        }
    }
}
</style>