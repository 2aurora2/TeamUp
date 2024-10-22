<template>
    <el-container>
        <user-table-comp
                v-model:loading="loading"
                v-model:user-list="userList"
        />
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
    </el-container>
</template>

<script setup lang="ts">
import UserTableComp from "@/components/UserManageComp/UserTableComp.vue";
import {onMounted, ref} from "vue";
import api from "@/api";
import {ErrorNotice} from "@/utils/Notification.ts";
import {User} from "@/interface/user.ts";

const loading = ref(false);
const userList = ref<User[]>([]);
const total = ref(0);
const page = ref(1);
const pageSize = ref(15);

const getPostList = async (newP: number) => {
    page.value = newP;
    loading.value = true;
    try {
        const {data: res} = await api.userApi.getAllUserList({
            page: page.value,
            pageSize: 15
        });
        if (res.code === 200) {
            userList.value = res.data.userList;
            total.value = res.data.total;
        } else ErrorNotice(res.message);
    } catch (e: any) {
        ErrorNotice(e.response.data.message);
    } finally {
        loading.value = false;
    }
}

onMounted(async () => {
    await getPostList(1);
})
</script>

<style scoped lang="scss">
.el-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>