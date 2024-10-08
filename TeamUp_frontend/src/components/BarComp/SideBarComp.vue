<template>
    <el-row class="tac">
        <el-col :span="24">
            <el-menu
                    :default-active="defaultActive"
                    class="el-menu-vertical-demo"
                    :router="true"
                    @select="handleSelect"
            >
                <el-menu-item :index="isAdmin?adminProPath:teachProPath">
                    <el-icon>
                        <UserFilled/>
                    </el-icon>
                    <span>个人信息</span>
                </el-menu-item>
                <el-menu-item index="/admin/audit" v-if="isAdmin">
                    <el-icon>
                        <Checked/>
                    </el-icon>
                    <span>审核管理</span>
                </el-menu-item>
                <el-menu-item index="/admin/apply" v-if="isAdmin">
                    <el-icon>
                        <ChromeFilled/>
                    </el-icon>
                    <span>申请管理</span>
                </el-menu-item>
                <el-menu-item index="/admin/user/manage" v-if="isAdmin">
                    <el-icon>
                        <HelpFilled/>
                    </el-icon>
                    <span>用户管理</span>
                </el-menu-item>
                <el-menu-item index="/teach/class/manage" v-if="isTeach">
                    <el-icon>
                        <HelpFilled/>
                    </el-icon>
                    <span>班级管理</span>
                </el-menu-item>
                <el-menu-item index="/teach/homework/manage" v-if="isTeach">
                    <el-icon>
                        <Checked/>
                    </el-icon>
                    <span>作业管理</span>
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
const isAdmin = ref(false);
const isTeach = ref(false);
const adminProPath = ref('/admin/profile');
const teachProPath = ref('/teach/profile');

const defaultActive = ref('')

const handleSelect = (key: string) => {
    defaultActive.value = key;
    router.push(defaultActive.value);
    localStorage.setItem('defaultPath', key);
}

watch(() => router.currentRoute.value.fullPath, (newP, _) => {
    if(newP.includes('admin') && !isAdmin.value){
        isAdmin.value = true;
        isTeach.value = false;
        defaultActive.value = adminProPath.value;
    }
    else if(newP.includes('teach') && !isTeach.value){
        isAdmin.value = false;
        isTeach.value = true;
        defaultActive.value = teachProPath.value;
    }
})

onMounted(() => {
    if (router.currentRoute.value.fullPath.includes('admin') && (props.roleList?.includes(1) || props.roleList?.includes(2))) {
        isAdmin.value = true;
        isTeach.value = false;
    }
    if (router.currentRoute.value.fullPath.includes('teach') && (props.roleList?.includes(3))) {
        isTeach.value = true;
        isAdmin.value = false;
    }

    if (localStorage.getItem('defaultPath') != null) defaultActive.value = <string>localStorage.getItem('defaultPath');
    else defaultActive.value = isAdmin.value ? '/admin/profile' : '/teach/profile';
    router.push(defaultActive.value);
})

onUnmounted(() => {
    localStorage.removeItem('defaultPath');
    localStorage.removeItem('backHome');
})
</script>

<style scoped lang="scss">
.tac {
    height: 100%;
    font-family: 幼圆, serif;

    .el-menu-vertical-demo {
        height: 100%;
    }
}
</style>