<template>
    <el-table
            v-loading="loading"
            element-loading-text="获取数据中..."
            stripe
            :data="awardList"
            style="width: 100%"
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
            empty-text="暂未上传相关获奖经历"
            :element-loading-spinner="svg"
            element-loading-svg-view-box="-10, -10, 50, 50"
    >
        <el-table-column type="index" label="#" width="50"/>
        <el-table-column prop="title" label="赛事名称"/>
        <el-table-column prop="prize" label="所获奖项"/>
        <el-table-column prop="date" label="获奖日期"/>
        <el-table-column fixed="right" label="操作" align="right">
            <template #default="scope">
                <el-button
                        v-if="props.isOwn"
                        type="danger"
                        size="small"
                        @click.prevent="handleDelAward(scope.$index)"
                >
                    移除
                </el-button>
                <el-button
                        type="primary"
                        size="small"
                        @click.prevent="handleShowProof(scope.$index)"
                >
                    查看详情
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-image-viewer
            v-if="imagePreviewVisible"
            :zoom-rate="1"
            :url-list="imageList"
            @close="handleClosePreview"
    />
</template>

<script setup lang="ts">
import {ElImageViewer} from "element-plus";
import {ref} from "vue";
import {Award} from "@/interface/award.ts";
import {ErrorNotice, SuccessNotice} from "@/utils/Notification.ts";
import api from "@/api";

const props = defineProps({
    isOwn: Boolean
})

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

const awardList = defineModel('awardList');
const loading = defineModel('loading');
const emit = defineEmits(['updateAwardList'])
const imagePreviewVisible = ref(false);
const imageList = ref<string[]>([]);

const handleDelAward = async (index: number) => {
    try {
        const {data: res} = await api.awardApi.delAwardByAwardId({
            awardId: (<Award[]>awardList.value)[index].id
        });
        if (res.code === 200) {
            SuccessNotice('删除奖项成功！');
            emit('updateAwardList');
        } else ErrorNotice(res.message);
    } catch (e: any) {
        ErrorNotice(e.response.data.message);
    }
}

const handleShowProof = (index: number) => {
    imagePreviewVisible.value = true;
    imageList.value = [(<Award[]>awardList.value)[index].proof];
}

const handleClosePreview = () => {
    imageList.value = [];
    imagePreviewVisible.value = false;
}
</script>

<style scoped lang="scss">

</style>