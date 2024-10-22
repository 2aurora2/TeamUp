<template>
    <el-container>
        <p>比赛概览</p>
        <el-empty v-if="matchList.length === 0" description="暂无比赛"/>
        <div class="match-cards">
            <match-card-comp
                    v-for="(item,index) in matchList"
                    :key="index"
                    :title="item.title"
                    :month="item.month"
                    :description="item.description"
                    :tag-list="item.tagList"
                    :link="item.link"
            />
        </div>
        <div class="pagination">
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="total"
                    :hide-on-single-page="true"
                    :default-page-size="16"
                    :current-page="page"
                    @current-change="getMatchList"
            />
        </div>
    </el-container>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {MatchItem} from "@/interface/match.ts";
import api from "@/api";
import {ErrorNotice} from "@/utils/Notification.ts";
import MatchCardComp from "@/components/MatchSummaryComp/MatchCardComp.vue";

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
            pageSize: 16
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

onMounted(async () => {
    await getMatchList(1);
})
</script>

<style scoped lang="scss">
.el-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column !important;
    align-items: center;
    justify-content: center;

    .match-cards {
        width: 90%;
        display: grid;
        grid-template-columns: repeat(auto-fill, 17%);
        grid-row-gap: 50px;
        grid-column-gap: 50px;
        justify-content: space-evenly;
        justify-items: center;
        align-items: center;
    }

    p {
        font-size: 40px;
        margin: 8px;
    }
}
</style>