<template>
    <el-container>
        <div class="header">
            <el-link type="primary" @click="uploadDialogVisible = true">
                <el-icon>
                    <CirclePlus/>
                </el-icon>
                点击添加比赛条目
            </el-link>
        </div>
        <match-table-comp
                v-model:loading="loading"
                v-model:match-list="matchList"
        />
        <div class="pagination">
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="total"
                    :hide-on-single-page="true"
                    :default-page-size="15"
                    :current-page="page"
                    @current-change="getMatchList"
            />
        </div>
        <el-dialog
                v-model="uploadDialogVisible"
                title="新增比赛条目"
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
                <el-form-item label="官网链接">
                    <el-input v-model="uploadInfo.link" placeholder="请输入赛事的官网链接"/>
                </el-form-item>
                <el-form-item label="一般举办的月份">
                    <el-input-number v-model="uploadInfo.month" :min="1" :max="12"/>
                </el-form-item>
                <el-form-item label="赛事标签">
                    <div class="flex gap-2">
                        <el-tag
                                v-for="tag in uploadInfo.tags"
                                :key="tag"
                                closable
                                :disable-transitions="false"
                                @close="handleClose(tag)"
                                style="margin-right: 8px"
                        >
                            {{ tag }}
                        </el-tag>
                        <el-input
                                v-if="inputVisible"
                                ref="InputRef"
                                v-model="tagInput"
                                class="w-20"
                                size="small"
                                @keyup.enter="handleInputConfirm"
                                @blur="handleInputConfirm"
                                style="margin-top: 8px"
                                placeholder="输入标签后，按Enter添加到标签列表"
                        />
                        <el-button v-else class="button-new-tag" size="small" @click="showInput">
                            + 添加标签
                        </el-button>
                    </div>
                </el-form-item>
                <el-form-item label="赛事描述">
                    <el-input
                            v-model="uploadInfo.description"
                            :rows="5"
                            resize="none"
                            type="textarea"
                            placeholder="对赛事的简要描述"
                    />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="addMatchItem">
                        提交
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </el-container>
</template>

<script setup lang="ts">
import MatchTableComp from "@/components/MatchManageComp/MatchTableComp.vue";
import {nextTick, onMounted, ref} from "vue";
import {MatchItem} from "@/interface/match.ts";
import {ErrorNotice, SuccessNotice, WarnNotice} from "@/utils/Notification.ts";
import api from "@/api";
import {ElInput, FormProps} from "element-plus";

const loading = ref(false);
const matchList = ref<MatchItem[]>([])
const total = ref(0);
const page = ref(1);
const getMatchList = async (newP: number) => {
    page.value = newP;
    loading.value = true;
    try {
        const {data: res} = await api.matchApi.getAllMatch({
            page: page.value,
            pageSize: 15
        });
        if (res.code === 200) {
            const itemList = res.data.matches;
            const tagList = res.data.tagList;
            const itemResultList: MatchItem[] = [];
            for (let i = 0; i < itemList.length; ++i) {
                let temp: MatchItem = {
                    ...itemList[i],
                    tagList: tagList[i]
                };
                itemResultList.push(temp);
            }
            matchList.value = itemResultList;
            total.value = res.data.total;
        } else ErrorNotice(res.message);
    } catch (e: any) {
        ErrorNotice(e.response.data.message);
    } finally {
        loading.value = false;
    }
}

const uploadDialogVisible = ref(false);
const labelPosition = ref<FormProps['labelPosition']>('left')

interface uploadItem {
    title: string,
    link: string,
    month: number,
    description: string,
    tags: string[]
}

const uploadInfo = ref<uploadItem>({
    title: '',
    link: '',
    month: 1,
    description: '',
    tags: []
})

// 上传新比赛条目
const InputRef = ref<InstanceType<typeof ElInput>>()
const tagInput = ref('');
const inputVisible = ref(false);
const handleClose = (tag: string) => {
    uploadInfo.value.tags.splice(uploadInfo.value.tags.indexOf(tag), 1)
}

const showInput = () => {
    inputVisible.value = true
    nextTick(() => {
        InputRef.value!.input!.focus()
    })
}

const handleInputConfirm = () => {
    if (uploadInfo.value.tags.length < 3 && tagInput.value) {
        uploadInfo.value.tags.push(tagInput.value)
    }
    inputVisible.value = false;
    tagInput.value = '';
    if (uploadInfo.value.tags.length === 3) {
        WarnNotice('赛事的相关标签不得超过3个')
    }
}
const addMatchItem = async () => {
    try {
        const {data: res} = await api.matchApi.addMatchItem(uploadInfo.value);
        if (res.code === 200) {
            SuccessNotice('上传成功！');
            await getMatchList(1);
            uploadInfo.value = {
                title: '',
                link: '',
                month: 1,
                description: '',
                tags: []
            };
            uploadDialogVisible.value = false;
        } else ErrorNotice(res.message);
    } catch (e: any) {
        ErrorNotice(e.response.data.message);
    }
}

onMounted(async () => {
    await getMatchList(1);
})
</script>

<style scoped lang="scss">
.el-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .header {
        width: 95%;
        padding: 8px;
    }
}
</style>