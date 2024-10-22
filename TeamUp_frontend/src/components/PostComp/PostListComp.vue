<template>
    <div class="post-list">
        <el-table
                v-loading="loading"
                element-loading-text="获取数据中..."
                stripe
                :data="postList"
                style="width: 100%"
                empty-text="暂无相关帖子，快去发布吧"
                :element-loading-spinner="svg"
                element-loading-svg-view-box="-10, -10, 50, 50"
                @row-click="handleRowClick"
                :row-class-name="getRowClassName"
        >
            <el-table-column type="index" label="#" width="50"/>
            <el-table-column label="帖子">
                <template #default="scope">
                    <p style="font-weight: 800;font-size: 16px">{{ scope.row.title }}</p>
                    <div class="content-truncate" v-html="truncateContent(scope.row.content)"></div>
                </template>
            </el-table-column>
            <el-table-column label="发布时间" align="center">
                <template #default="scope">
                    <p style="display: flex;flex-direction: column; justify-content: center; align-items: center; width: 100%;">
                        {{ new Date(scope.row.create_time as unknown as string | number).toLocaleString() }}
                    </p>
                </template>
            </el-table-column>
            <el-table-column label="点赞数" align="center" width="100">
                <template #default="scope">
                    <div style="display: flex;flex-direction: column; justify-content: center; align-items: center; width: 100%;">
                        <svg t="1729572769975" class="icon" viewBox="0 0 1024 1024" version="1.1"
                             xmlns="http://www.w3.org/2000/svg" p-id="6085" width="16" height="16">
                            <path d="M494.752 98.18c17.21 1.438 37.44 4.19 56.94 9.374 41.794 11.094 63.564 52.634 66.188 95.976 3.302 54.598 1.302 110.046-1.42 151.02 64.928-5.83 129.334-10.446 187.308-13.22 61.21-2.914 112.412 43.444 113.66 104.966 2.052 101.32-4.356 255.56-50.726 380.504-18.204 49.052-66.446 78-118.538 79.7-243.788 7.956-478.212-24.514-478.212-24.514V398.8c27.216-5.12 58.76-10.242 93.216-15.222 30.82-86.442 59.966-187.66 75.51-243.778 7.082-25.548 29.748-43.828 56.074-41.62z"
                                  fill="#FF934A" p-id="6086"></path>
                            <path d="M110.888 873.34c0.544 21.38 12.596 40.814 33.254 46.36 16.32 4.392 38.368 8.3 65.078 8.3s48.758-3.908 65.078-8.3c20.656-5.546 32.71-24.98 33.252-46.36a9323.62 9323.62 0 0 0 2.89-228.756c0-98.426-1.748-183.592-2.89-228.756-0.54-21.378-12.596-40.812-33.252-46.36-16.32-4.392-38.368-8.3-65.08-8.3-26.708 0-48.756 3.908-65.076 8.3-20.658 5.548-32.71 24.982-33.254 46.36A9323.614 9323.614 0 0 0 108 644.584c0 98.426 1.748 183.594 2.888 228.758z"
                                  fill="#1677FF" p-id="6087"></path>
                        </svg>
                        <p>{{ scope.row.like_count }}</p>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup lang="ts">
import {Post} from "@/interface/post.ts";
import router from "@/router";

const postList = defineModel<Post[]>('postList');
const loading = defineModel('loading');
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

const truncateContent = (content: string) => {
    // 使用 DOMParser 解析 HTML 内容，并获取纯文本
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const text = doc.body.textContent || '';

    // 截断到一行，这里假设最大宽度为 100px
    if (text.length > 30) {
        return text.slice(0, 30) + '...';
    }
    return text;
}

const handleRowClick = (row: any) => {
    router.push('/post/' + row.id);
}

//@ts-ignore
const getRowClassName = ({row, rowIndex}) => {
    return 'clickable-row';
}
</script>

<style scoped lang="scss">
.post-list {
    width: 100%;
}

.content-truncate {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: darkgray;
}

.clickable-row {
    cursor: pointer;
}
</style>