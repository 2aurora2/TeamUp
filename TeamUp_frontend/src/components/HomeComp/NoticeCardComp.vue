<template>
    <div class="notice col-flex">
        <p class="big-title">TeamUp</p>
        <p class="big-title">寻找你的竞赛最佳拍档</p>
        <p class="desc">无论是创新创业、学科竞赛还是科研项目，在这里找到志同道合的小伙伴！</p>
        <div class="router-btn row-flex">
            <div @click="router.push('#')">招募大厅</div>
            <div @click="router.push('#')">经验分享</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from "@/router";
</script>

<style scoped lang="scss">
.notice {
    width: 50%;
    padding: 5px;
    background-color: #ffffff;
    border-radius: 8px;
    margin-top: 25px;
    transition: transform 1s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    &:hover {
        transform: scale(1.05);
    }

    p {
        width: 100%;
        text-align: center;
        margin: 0;
    }

    .big-title {
        color: #1e40af;
        margin: 3px;
        font-size: 25px;
        font-weight: 800;
    }

    .desc {
        font-size: 16px;
        margin: 8px;
    }

    .router-btn {
        width: 100%;

        div {
            width: 20%;
            text-align: center;
            border-radius: 8px;
            margin: 8px;
            padding: 8px;
            cursor: pointer;
            font-size: 16px;

            &:nth-child(1) {
                background-color: #2563eb;
                color: #ffffff;

                &:hover {
                    background-color: #1e40af;
                }
            }

            &:nth-child(2) {
                background-color: #ffffff;
                color: #2563eb;
                border: 1px solid #dcdcdc;

                &:hover {
                    background-color: #dcdcdc;
                }
            }
        }
    }
}
</style>