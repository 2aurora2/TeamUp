<template>
    <el-container>
        <div class="header col-flex">
            <p>招募大厅</p>
            <p>快速连接同校志同道合的伙伴，组建队伍，共同成长</p>
        </div>
        <div class="main">
            <div class="search" :disabled="loading">
                <el-input style="width: 40%" v-model="keyword" placeholder="按照关键词检索相关招募帖子">
                    <template #append>
                        <el-button :icon="Search" :disabled="loading" @click="getPostList(page)"/>
                    </template>
                </el-input>
                <el-switch
                        v-model="sort"
                        class="ml-2"
                        style="--el-switch-on-color: #13ce66; --el-switch-off-color: #49a4ff"
                        active-text="时间"
                        inactive-text="点赞"
                        :disabled="loading"
                        @change="getPostList(page)"
                />
            </div>
            <div class="table">
                <post-list-comp v-model:post-list="postList" v-model:loading="loading"/>
            </div>
            <div class="pagination">
                <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="total"
                        :hide-on-single-page="true"
                        :default-page-size="pageSize"
                        :current-page="page"
                        @current-change="getPostList"
                />
            </div>
        </div>
    </el-container>
</template>

<script setup lang="ts">
import {ElInput} from "element-plus";
import {Search} from '@element-plus/icons-vue'
import {onMounted, ref} from "vue";
import {ErrorNotice} from "@/utils/Notification.ts";
import api from "@/api";
import {Post} from "@/interface/post.ts";
import PostListComp from "@/components/PostComp/PostListComp.vue";

const keyword = ref('');
const sort = ref(true);

const loading = ref(false);
const total = ref(0);
const page = ref(1);
const pageSize = ref(12);
const postList = ref<Post[]>([]);

const getPostList = async (newP: number) => {
    page.value = newP;
    loading.value = true;
    try {
        const {data: res} = await api.postApi.getPostList({
            key: keyword.value === '' ? null : keyword.value,
            sort: sort.value ? 'time' : 'like',
            type: 0,
            page: page.value,
            pageSize: pageSize.value
        })
        postList.value = res.data.postList;
        total.value = res.data.total;
    } catch (e: any) {
        ErrorNotice(e.response.data.message);
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    getPostList(1);
})
</script>

<style scoped lang="scss">
.el-container {
    width: 100%;
    display: flex;
    flex-direction: column !important;
    align-items: center;
    font-family: 微软雅黑, serif;

    .header {
        width: 100%;
        height: 100px;
        padding: 20px;
        background-color: rgba(149, 181, 238, 0.7);

        p {
            color: #383837;
            font-size: 16px;
            padding: 4px;
        }

        p:nth-child(1) {
            font-size: 35px;
        }
    }

    .main {
        width: 50%;
        margin-top: 8px;
        display: flex;
        flex-direction: column;

        .search {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }
    }

}
</style>