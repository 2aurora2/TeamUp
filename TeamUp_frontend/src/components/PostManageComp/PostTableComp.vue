<template>
    <el-table
            v-loading="loading"
            element-loading-text="获取数据中..."
            stripe
            :data="postList"
            style="width: 95%"
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
            empty-text="暂无帖子"
            :element-loading-spinner="svg"
            element-loading-svg-view-box="-10, -10, 50, 50"
    >
        <el-table-column type="index" label="#" width="50"/>
        <el-table-column prop="title" label="帖子名称"/>
        <el-table-column label="帖子类型">
            <template #default="scope">
                <el-tag :type="scope.row.type?'primary':'warning'">{{
                        scope.row.type ? '经验帖子' : '招募帖子'
                    }}
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="right">
            <template #default="scope">
                <el-button
                        type="danger"
                        size="small"
                        @click.prevent="handleOpenDialog(scope.$index)"
                >
                    删除
                </el-button>
                <el-button
                        type="primary"
                        size="small"
                        @click.prevent="handleShowDetails(scope.$index)"
                >
                    查看详情
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog
            v-model="delDialogVisible"
            title="删除帖子"
            width="500"
    >
        <span>确定删除 “<strong>{{ delTitle }}</strong>” 该帖子吗？</span>
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
import {ref} from "vue";
import api from "@/api";
import {ErrorNotice, SuccessNotice} from "@/utils/Notification.ts";
import {Post} from "@/interface/post.ts";
import router from "@/router";

const loading = defineModel('loading');
const postList = defineModel<Post[]>('postList');

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
    delTitle.value = (<Post[]>postList.value)[delIndex.value].title;
}
const handleDelPost = async () => {
    try {
        const {data: res} = await api.postApi.delPublicPost({
            postId: (<Post[]>postList.value)[delIndex.value].id,
            userId: (<Post[]>postList.value)[delIndex.value].user_id
        });
        if (res.code === 200) {
            (<Post[]>postList.value).splice(delIndex.value, 1);
            SuccessNotice('成功删除对应帖子！');
        } else ErrorNotice(res.message);
    } catch (e: any) {
        ErrorNotice(e.response.data.message);
    } finally {
        delDialogVisible.value = false;
    }
}

const showDialogVisible = ref(false);
const handleShowDetails = (index: number) => {
    showDialogVisible.value = true;
    router.push('/post/' + (<Post[]>postList.value)[index].id);
}
</script>

<style scoped lang="scss">

</style>