<template>
    <el-table
            v-loading="loading"
            element-loading-text="获取数据中..."
            stripe
            :data="matchList"
            style="width: 95%"
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
            empty-text="暂无比赛条目"
            :element-loading-spinner="svg"
            element-loading-svg-view-box="-10, -10, 50, 50"
    >
        <el-table-column type="index" label="#" width="50"/>
        <el-table-column prop="title" label="赛事名称"/>
        <el-table-column prop="link" label="官网链接">
            <template #default="scope">
                <el-link :href="scope.row.link" type="primary">{{ scope.row.title }}</el-link>
            </template>
        </el-table-column>
        <el-table-column prop="month" label="举办月份" width="100"/>
        <el-table-column fixed="right" label="操作" align="right">
            <template #default="scope">
                <el-button
                        type="danger"
                        size="small"
                        @click.prevent="handleOpenDialog(scope.$index)"
                >
                    移除
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
            title="删除比赛条目"
            width="500"
    >
        <span>确定删除 “<strong>{{ delTitle }}</strong>” 该比赛条目吗？</span>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="delDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleDelAward">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>
    <match-card-comp
            v-model:show-dialog-visible="showDialogVisible"
            v-model:match-item="showMatchItem"
    />
</template>

<script setup lang="ts">
import {ErrorNotice, SuccessNotice} from "@/utils/Notification.ts";
import api from "@/api";
import {MatchItem} from "@/interface/match.ts";
import {ref} from "vue";
import MatchCardComp from "@/components/MatchManageComp/MatchCardComp.vue";

const loading = defineModel('loading');
const matchList = defineModel('matchList');

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
    delTitle.value = (<MatchItem[]>matchList.value)[delIndex.value].title;
}
const handleDelAward = async () => {
    try {
        const {data: res} = await api.matchApi.delMatchItem({
            matchId: (<MatchItem[]>matchList.value)[delIndex.value].id
        });
        if (res.code === 200) {
            (<MatchItem[]>matchList.value).splice(delIndex.value, 1);
            SuccessNotice('成功删除比赛条目！');
        } else ErrorNotice(res.message);
    } catch (e: any) {
        ErrorNotice(e.response.data.message);
    } finally {
        delDialogVisible.value = false;
    }
}

const showDialogVisible = ref(false);
const showMatchItem = ref<MatchItem | null>(null);
const handleShowDetails = (index: number) => {
    showDialogVisible.value = true;
    showMatchItem.value = (<MatchItem[]>matchList.value)[index];
}
</script>

<style scoped lang="scss">

</style>