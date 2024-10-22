<template>
    <el-container
            v-loading="loading"
            element-loading-text="正在获取帖子内容..."
            :element-loading-spinner="svg"
            element-loading-svg-view-box="-10, -10, 50, 50"
    >
        <div class="header col-flex">
            <p style="color: #fcf3f3">{{ post?.title }}</p>
            <p>
                <el-tag type="primary">{{ post?.type === 1 ? "经验贴" : "招募贴" }}</el-tag>
            </p>
        </div>
        <div class="author-info">
            <img :src="author?.avatar" alt="avatar" style="cursor: pointer" @click="router.push('/user/'+author?.id)">
            <div class="username-time">
                <p>{{ author?.username }}</p>
                <p>{{ new Date(post?.create_time as unknown as string | number).toLocaleString() }}</p>
                <div v-html="post?.content"></div>
            </div>
        </div>
        <div style="display: flex;justify-content: space-between;align-items: center">
            <div
                    class="col-flex"
                    style="border-radius: 50%;width: 60px;height: 60px;margin-top: 12px"
                    @click="router.push('/post/edit/'+post.id)"
                    v-if="post?.user_id === userStore.user.id"
            >
                <svg t="1729581510805" class="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="8116" width="36" height="36" style="cursor: pointer">
                    <path d="M824.32 867.9424V344.576l78.0288-86.7328L788.48 143.36l-113.408 104.8064h-372.224a45.5168 45.5168 0 0 0-45.5168 45.5168v585.216z"
                          fill="#FFB966" p-id="8117"></path>
                    <path d="M832.7168 496.2816a30.72 30.72 0 0 0-30.72 30.72v281.1392a40.0384 40.0384 0 0 1-40.0384 40.0384H223.8976a40.0384 40.0384 0 0 1-40.0384-40.0384V230.9632a40.0384 40.0384 0 0 1 40.0384-39.9872h325.8368a30.72 30.72 0 1 0 0-61.44H223.8976a101.5808 101.5808 0 0 0-101.4784 101.4272v577.1776a101.5808 101.5808 0 0 0 101.4784 101.4784h538.0608a101.5808 101.5808 0 0 0 101.4784-101.4784v-281.1392a30.72 30.72 0 0 0-30.72-30.72z"
                          fill="#5D5D66" p-id="8118"></path>
                    <path d="M909.2608 210.5856l-73.728-73.728a65.6384 65.6384 0 0 0-92.6208 0L429.6192 450.1504a30.72 30.72 0 0 0-8.0384 14.08l-40.5504 157.8496a30.72 30.72 0 0 0 36.1984 37.6832l163.4304-35.1232a30.72 30.72 0 0 0 15.36-8.2944l313.2928-313.2928a65.6384 65.6384 0 0 0-0.0512-92.4672z m-350.3616 356.0448l-105.984 22.6816 26.112-101.632L700.928 265.728l81.92 77.1584z m306.8928-306.8928l-39.6288 39.68-81.92-77.1584 41.9328-41.9328a4.0448 4.0448 0 0 1 5.7344 0l73.728 73.728a3.9936 3.9936 0 0 1 0.1536 5.6832z"
                          fill="#5D5D66" p-id="8119"></path>
                </svg>
            </div>
            <div class="col-flex"
                 style="border-radius: 50%;width: 60px;height: 60px;margin-top: 12px"
                 @click="handleLike"
            >
                <svg t="1729523591703" class="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg"
                     p-id="1670" width="36" height="36" style="cursor: pointer">
                    <path id="like"
                          d="M948.4 407.2c-29.2-35.5-76.9-35.5-92.6-35.5H730c10.2-55.2 18.9-119.4 0.2-187.1-12.8-46.6-36.3-79.7-72-101.1-18.7-11.2-38.1-16.9-57.8-16.9-51.8 0-90.6 38.4-96.4 95.7-2.2 21.4-4.2 41.7-9.3 59.1-19 63.9-65.4 112.7-108.3 151.8-16 14.4-33.1 40.2-33.3 69.2-0.6 77.6-0.7 155.5-0.7 235.1l-0.1 141.4c-0.2 47.3 25 85.4 67 101.7 22.2 9 45.7 14 70.1 14.7 38.8 0.5 77.8 0.5 114.3 0.5h56.9c37.2 0 74.4 0 111.8 0.4h1.2c43.5 0 77.7-21.7 93.9-59.5l4.8-11.1c11.3-26 22.9-52.9 30.1-82.8 22-90.9 44.9-188.2 63.4-283.8 7.4-37.9 1.6-68.8-17.4-91.8zM216.1 374.5h-11.9c-56.2 0-101.9 45.7-101.9 101.9v348.4c0 56.2 45.7 101.9 101.9 101.9h11.9c56.2 0 101.9-45.7 101.9-101.9V476.4c0.1-56.2-45.7-101.9-101.9-101.9z"
                          fill="#333333" p-id="1671"></path>
                </svg>
            </div>
            <div
                    class="col-flex"
                    style="border-radius: 50%;width: 60px;height: 60px;margin-top: 12px"
                    @click="dialogVisibleDel = true"
                    v-if="post?.user_id === userStore.user.id"
            >
                <svg t="1729581442691" class="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="6203" width="36" height="36" style="cursor: pointer">
                    <path d="M643.657143 253.910204H380.342857c-27.167347 0-49.632653-22.465306-49.632653-49.632653v-39.706122c0-27.167347 22.465306-49.632653 49.632653-49.632653h263.314286c27.167347 0 49.632653 22.465306 49.632653 49.632653v39.706122c0 27.167347-22.465306 49.632653-49.632653 49.632653z m-263.314286-99.265306c-5.22449 0-9.926531 4.702041-9.92653 9.926531v39.706122c0 5.22449 4.702041 9.926531 9.92653 9.926531h263.314286c5.22449 0 9.926531-4.702041 9.92653-9.926531v-39.706122c0-5.22449-4.702041-9.926531-9.92653-9.926531H380.342857z"
                          fill="#AF8015" p-id="6204"></path>
                    <path d="M725.681633 909.061224H298.840816c-43.885714 0-79.412245-35.526531-79.412245-79.412244V363.102041h585.665307v466.546939c0 43.885714-36.04898 79.412245-79.412245 79.412244z"
                          fill="#F2CB51" p-id="6205"></path>
                    <path d="M412.734694 780.016327c-10.971429 0-19.853061-8.881633-19.853061-19.853062V512c0-10.971429 8.881633-19.853061 19.853061-19.853061s19.853061 8.881633 19.853061 19.853061v248.163265c0 10.971429-8.881633 19.853061-19.853061 19.853062z"
                          fill="#AF8015" p-id="6206"></path>
                    <path d="M611.265306 780.016327c-10.971429 0-19.853061-8.881633-19.853061-19.853062V512c0-10.971429 8.881633-19.853061 19.853061-19.853061s19.853061 8.881633 19.853061 19.853061v248.163265c0 10.971429-8.881633 19.853061-19.853061 19.853062z"
                          fill="#AF8015" p-id="6207"></path>
                    <path d="M829.64898 402.808163H194.35102c-43.885714 0-79.412245-35.526531-79.412244-79.412245v-29.779591C114.938776 249.730612 150.465306 214.204082 194.35102 214.204082h635.29796c43.885714 0 79.412245 35.526531 79.412244 79.412245v29.779591c0 43.885714-35.526531 79.412245-79.412244 79.412245z"
                          fill="#DBAD2C" p-id="6208"></path>
                </svg>
            </div>
        </div>
        <div style="color: #ada3a3;margin-top: 3px;user-select: none">{{ post?.like_count }}</div>
        <el-dialog
                v-model="dialogVisibleDel"
                title="提示"
                width="500"
        >
            <span>确认删除该帖子吗？</span>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisibleDel = false">取消</el-button>
                    <el-button type="primary" @click="handleDel">
                        确定
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </el-container>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {ErrorNotice, SuccessNotice} from "@/utils/Notification.ts";
import router from "@/router";
import api from "@/api";
import {Post} from "@/interface/post.ts";
import {useUserStore} from "@/store/useUserStore.ts";
import {User} from "@/interface/user.ts";

const loading = ref(true);
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

const post = ref<Post>();
const haveLike = ref(false);
const userStore = useUserStore();
const author = ref<User>();

const getPostDetails = async () => {
    loading.value = true;
    try {
        const {data: res} = await api.postApi.getPostDetails({
            postId: parseInt(<string>router.currentRoute.value.params.postId, 10)
        })
        if (res.code === 200) {
            post.value = res.data.post;
            const p1 = api.postApi.getUserLikePost({
                userId: userStore.user.id,
                postId: post.value?.id
            });
            const p2 = api.userApi.getUserInfoById({
                userId: post.value?.user_id
            });
            const p = await Promise.all([p1, p2]);
            haveLike.value = p[0]['data']['data']['like'] === 1;
            author.value = p[1]['data']['data']['user'];
            const icon = document.getElementById('like');
            if (haveLike.value) icon!.setAttribute('fill', 'red');
            else icon!.setAttribute('fill', '#333333');
        } else {
            ErrorNotice('获取帖子失败！');
            router.push('/404');
        }
    } catch (e: any) {
        ErrorNotice('获取帖子失败！');
        router.push('/404');
    } finally {
        loading.value = false;
    }
}

const handleLike = async () => {
    try {
        const {data: res} = await api.postApi.likeOrUnlikePost(haveLike.value ? 0 : 1, {
            postId: post.value!.id
        });
        if (res.code === 200) {
            haveLike.value = !haveLike.value;
            if (haveLike.value) post.value!.like_count++;
            else post.value!.like_count--;
        }
    } catch (e: any) {
        ErrorNotice(e.response.data.message);
    } finally {
        const icon = document.getElementById('like');
        if (haveLike.value) icon!.setAttribute('fill', 'red');
        else icon!.setAttribute('fill', '#333333');
    }
}

const dialogVisibleDel = ref(false);
const handleDel = async () => {
    try {
        const {data: res} = await api.postApi.delOwnPost({
            postId: post.value!.id
        });
        if (res.code === 200) {
            SuccessNotice('删除成功！');
            router.replace('/');
        } else ErrorNotice(res.message);
    } catch (e: any) {
        ErrorNotice(e.response.data.message);
    }
}

watch(() => router.currentRoute.value.params.postId, () => {
    getPostDetails();
})

onMounted(() => {
    getPostDetails();
})
</script>

<style scoped lang="scss">
.el-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 微软雅黑, serif;

    .header {
        width: 100%;
        height: 100px;
        padding: 20px;
        background-color: rgba(149, 181, 238, 0.9);

        p {
            font-size: 30px;
        }
    }

    .author-info {
        width: 50%;
        display: flex;
        flex-direction: row;
        margin-top: 8px;

        img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: 2px solid #dcdcdc;
            margin-right: 8px;
        }

        .username-time {
            width: 100%;

            p:nth-child(1) {
                font-size: 20px;
                margin-bottom: 8px;
                font-family: 华文细黑, serif;
                font-weight: bolder;
            }

            p:nth-child(2) {
                font-size: 13px;
                width: 100%;
                padding-bottom: 8px;
                border-bottom: 2px dashed #dcdcdc;
            }

            div {
                margin-top: 8px;

                * {
                    margin-bottom: 8px;
                    line-height: 25px;
                }
            }
        }
    }
}
</style>