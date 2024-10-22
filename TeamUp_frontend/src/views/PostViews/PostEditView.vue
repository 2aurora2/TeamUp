<template>
    <el-container
            v-loading="loading"
            :element-loading-text="loading_text"
            :element-loading-spinner="svg"
            element-loading-svg-view-box="-10, -10, 50, 50"
    >
        <h2>帖子修改</h2>
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
            <el-button type="primary" @click="handlePost">提交修改</el-button>
        </div>
    </el-container>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {useUserStore} from "@/store/useUserStore.ts";
import api from "@/api";
import router from "@/router";
import {ErrorNotice} from "@/utils/Notification.ts";
import {ElInput, FormProps} from "element-plus";
import PostEditorComp from "@/components/PostComp/PostEditorComp.vue";

const userStore = useUserStore();
const title = ref('');
const content = ref('');
const labelPosition = ref<FormProps['labelPosition']>('left')
const type = ref(0);

const loading = ref(false);
const loading_text = ref('正在提交更新，请稍后... ');
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

const getPostDetails = async () => {
    try {
        const {data: res} = await api.postApi.getPostDetails({
            postId: parseInt(<string>router.currentRoute.value.params.postId, 10)
        });
        if (res.data.post.user_id === userStore.user.id) {
            localStorage.setItem('title', res.data.post.title);
            localStorage.setItem('type', String(res.data.post.type));
            localStorage.setItem('post', res.data.post.content);
        } else {
            ErrorNotice('无权限修改！');
            router.replace('/404');
        }
    } catch (e: any) {
        ErrorNotice(e.response.data.message);
    }
}

watch(() => router.currentRoute.value.params.postId, () => {
    getPostDetails();
})

watch(title, () => {
    localStorage.setItem('title', title.value);
})

watch(type, () => {
    localStorage.setItem('type', '' + type.value);
})

watch(content, () => {
    localStorage.setItem('post', content.value);
})

const handlePost = async () => {
    loading.value = true;
    try {
        const {data: res} = await api.postApi.updateOwnPost({
            postId: parseInt(<string>router.currentRoute.value.params.postId, 10),
            title: title.value,
            type: type.value,
            content: content.value
        })
        if (res.code === 200) {
            loading_text.value = '提交更新成功，即将前往帖子详情页...';
            setTimeout(() => {
                localStorage.removeItem('post');
                localStorage.removeItem('title');
                localStorage.removeItem('type');
                router.push('/post/' + router.currentRoute.value.params.postId);
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

onMounted(async () => {
    await getPostDetails();
    if (localStorage.getItem('title') !== null) {
        title.value = <string>localStorage.getItem('title');
    }
    if (localStorage.getItem('type') !== null) {
        type.value = parseInt(<string>localStorage.getItem('type'), 10);
    }
    if (localStorage.getItem('post') !== null) {
        content.value = <string>localStorage.getItem('post');
    }
})
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