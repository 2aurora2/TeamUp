<template>
    <div class="reason-card">
        <img :src="props.icon" :alt="props.title">
        <p class="title">{{ props.title }}</p>
        <p class="desc">{{ props.desc }}</p>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    icon: String,
    title: String,
    desc: String
})
</script>

<style scoped lang="scss">
.reason-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: 10px;

    img {
        width: 50px;
        height: 50px;
    }

    p {
        font-size: 18px;
        margin: 6px;
    }

    .title {
        font-size: 20px;
        font-family: 微软雅黑, serif;
    }
}
</style>