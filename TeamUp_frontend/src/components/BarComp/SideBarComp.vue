<template>
    <el-row class="tac">
        <el-col :span="24">
            <el-menu
                    :default-active="defaultActive"
                    class="el-menu-vertical-demo"
                    :router="true"
                    @select="handleSelect"
            >
                <el-menu-item index="/admin/profile">
                    <el-icon>
                        <UserFilled/>
                    </el-icon>
                    <span>个人信息</span>
                </el-menu-item>
                <el-menu-item index="/admin/match/manage" v-if="isSuperAdmin">
                    <el-icon>
                        <Checked/>
                    </el-icon>
                    <span>比赛管理</span>
                </el-menu-item>
                <el-menu-item index="/admin/post/manage">
                    <el-icon>
                        <ChromeFilled/>
                    </el-icon>
                    <span>帖子管理</span>
                </el-menu-item>
                <el-menu-item index="/admin/user/manage">
                    <el-icon>
                        <HelpFilled/>
                    </el-icon>
                    <span>用户管理</span>
                </el-menu-item>
            </el-menu>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import {Checked, ChromeFilled, HelpFilled, UserFilled} from "@element-plus/icons-vue";
import {onMounted, onUnmounted, ref, watch} from "vue";
import router from "@/router";

const props = defineProps({
    roleList: Array<number>
});

const isSuperAdmin = ref(false);

const defaultActive = ref('/admin/profile');

const handleSelect = (key: string) => {
    defaultActive.value = key;
    router.push(defaultActive.value);
    localStorage.setItem('defaultPath', key);
}

watch(() => router.currentRoute.value.fullPath, (newP, _) => {
    defaultActive.value = newP;
})

onMounted(() => {
    if (props.roleList?.includes(1)) isSuperAdmin.value = true;
    if (localStorage.getItem('defaultPath') != null) defaultActive.value = <string>localStorage.getItem('defaultPath');
    router.push(defaultActive.value);
})

onUnmounted(() => {
    localStorage.removeItem('defaultPath');
    localStorage.removeItem('backHome');
})
</script>

<style scoped lang="scss">
.tac {
    width: 15%;
    height: 100%;
    font-family: 幼圆, serif;

    .el-menu-vertical-demo {
        height: 100%;
    }
}
</style>