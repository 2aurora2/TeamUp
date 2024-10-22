<template>
    <el-table
            v-loading="loading"
            element-loading-text="获取数据中..."
            stripe
            :data="userList"
            style="width: 95%"
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
            empty-text="暂无用户"
            :element-loading-spinner="svg"
            element-loading-svg-view-box="-10, -10, 50, 50"
    >
        <el-table-column type="index" label="#" width="50"/>
        <el-table-column prop="username" label="用户名"/>
        <el-table-column prop="email" label="邮箱"/>
        <el-table-column prop="grade" label="年级"/>
        <el-table-column prop="major" label="专业"/>
        <el-table-column fixed="right" label="操作" align="right">
            <template #default="scope">
                <el-button
                        type="danger"
                        size="small"
                        @click.prevent="handleOpenDialog(scope.$index)"
                >
                    封禁
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog
            v-model="delDialogVisible"
            title="删除帖子"
            width="500"
    >
        <span>确定封禁用户- “<strong>{{ delTitle }}</strong>” 吗？</span>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="delDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleDelPost">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">

import {User} from "@/interface/user.ts";
import {ref} from "vue";
import api from "@/api";
import {ErrorNotice, SuccessNotice} from "@/utils/Notification.ts";

const loading = defineModel('loading');
const userList = defineModel<User[]>('userList');

const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `

const delIndex = ref(0);
const delTitle = ref('');
const delDialogVisible = ref(false);
const handleOpenDialog = (index: number) => {
    delDialogVisible.value = true;
    delIndex.value = index;
    delTitle.value = (<User[]>userList.value)[delIndex.value].username;
}

const handleDelPost = async () => {
    try {
        const {data: res} = await api.userApi.banUser({
            userId: (<User[]>userList.value)[delIndex.value].id
        });
        if (res.code === 200) {
            (<User[]>userList.value).splice(delIndex.value, 1);
            SuccessNotice('成功删除用户！');
        } else ErrorNotice(res.message);
    } catch (e: any) {
        ErrorNotice(e.response.data.message);
    } finally {
        delDialogVisible.value = false;
    }
}
</script>

<style scoped lang="scss">

</style>