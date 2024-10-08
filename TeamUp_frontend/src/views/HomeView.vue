<template>
    <el-container>
        <notice-card-comp/>
        <div class="reason-part col-flex">
            <p>为什么选择TeamUp?</p>
            <div class="reason-cards">
                <reason-card-comp
                        v-for="(item,index) in reasons"
                        :key="index"
                        :icon="item.icon"
                        :title="item.title"
                        :desc="item.desc"
                />
            </div>
        </div>
    </el-container>
</template>

<script setup lang="ts">
import NoticeCardComp from "@/components/HomeComp/NoticeCardComp.vue";
import ReasonCardComp from "@/components/HomeComp/ReasonCardComp.vue";

const reasons = [
    {
        icon: import.meta.env.VITE_PROXY_URL + '/images/people.png',
        title: '校内人脉网络',
        desc: '快速连接同校志同道合的伙伴，组建队伍，共同成长'
    },
    {
        icon: import.meta.env.VITE_PROXY_URL + '/images/match.png',
        title: '校内赛事追踪',
        desc: '及时获取校内外最新竞赛信息，不错失机会，保持领先'
    },
    {
        icon: import.meta.env.VITE_PROXY_URL + '/images/award.png',
        title: '经验智慧分享',
        desc: '竞赛经验的分享，助你在竞赛中脱颖而出，赢得荣誉'
    }
];
</script>

<style scoped lang="scss">
.el-container {
    width: 100%;
    height: 100%;
    background-color: #faf7f7;
    display: flex;
    flex-direction: column !important;
    align-items: center;

    .reason-part {
        width: 100%;
        background-color: #ffffff;
        margin-top: 30px;
        padding: 20px;
        cursor: pointer;

        p {
            font-size: 25px;
            margin: 10px;
            font-weight: 1000;
        }

        .reason-cards {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            margin-top: 15px;
            margin-bottom: 15px;
        }
    }
}
</style>