<template>
    <el-container
            v-loading="loading"
            :element-loading-text="loading_text"
            :element-loading-spinner="svg"
            element-loading-svg-view-box="-10, -10, 50, 50"
    >
        <h2>帖子发布</h2>
        <div class="header" style="width: 60%;margin-top: 18px">
            <el-form
                    :label-position="labelPosition"
                    label-width="auto"
                    style="width: 430px"
            >
                <el-form-item label="标题">
                    <el-input v-model="title" placeholder="请输入帖子标题"/>
                </el-form-item>
                <el-form-item label="帖子类型" style="display: flex;flex-direction: row;align-items: center">
                    <el-radio-group v-model="type">
                        <el-radio :value="0" size="large">招募帖子</el-radio>
                        <el-radio :value="1" size="large">经验帖子</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
        </div>
        <post-editor-comp
                v-model:content="content"
        />
        <div class="footer">
            <el-button type="primary" @click="handlePost">发布</el-button>
        </div>
    </el-container>
</template>

<script setup lang="ts">
import PostEditorComp from "@/components/PostComp/PostEditorComp.vue";
import {onMounted, ref, watch} from "vue";
import {ElInput, FormProps} from "element-plus";
import api from "@/api";
import {ErrorNotice} from "@/utils/Notification.ts";
import router from "@/router";
import {Post} from "@/interface/post.ts";

const content = ref('');
const loading = ref(false);
const loading_text = ref('正在发布请稍后... ');
const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `;

watch(content, () => {
    localStorage.setItem('post', content.value);
})

const labelPosition = ref<FormProps['labelPosition']>('left')

const title = ref('');
const type = ref(0);

watch(title, () => {
    localStorage.setItem('title', title.value);
})
watch(type, () => {
    localStorage.setItem('type', '' + type.value);
})

onMounted(() => {
    if (localStorage.getItem('title') !== null) {
        title.value = <string>localStorage.getItem('title');
    }
    if (localStorage.getItem('type') !== null) {
        type.value = parseInt(<string>localStorage.getItem('type'), 10);
    }
})

const handlePost = async () => {
    loading.value = true;
    try {
        const {data: res} = await api.postApi.createPost({
            title: title.value,
            type: type.value,
            content: content.value
        })
        if (res.code === 200) {
            loading_text.value = '发布成功，即将前往帖子详情页...';
            const post: Post = res.data.post;
            setTimeout(() => {
                localStorage.removeItem('post');
                localStorage.removeItem('title');
                localStorage.removeItem('type');
                router.push('/post/' + post.id);
                loading.value = false;
            }, 2000);
        } else {
            ErrorNotice(res.message);
            loading.value = false;
        }
    } catch (e: any) {
        ErrorNotice(e.response.data.message);
        loading.value = false;
    }
}
</script>

<style scoped lang="scss">
.el-container {
    width: 100%;
    display: flex;
    flex-direction: column !important;
    align-items: center;

    h2 {
        padding: 8px;
        border-bottom: 2px dashed #dcdcdc;
    }

    .footer {
        width: 60%;
        margin-top: 8px;
        display: flex;
        flex-direction: row;
        justify-content: end;
    }
}
</style>