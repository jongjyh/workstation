<template>
    <div class="outter_wrapper">
        <div class="title">作业信息</div>
        <taskfilter></taskfilter>
    </div>
</template>

<script>
    import taskfilter from "@/views/task/filter";
    export default {
        name: "index",
        components: {taskfilter},
    }
</script>

<style scoped>
    .title{
        color: #515a6e;
        font-weight:700;
        font-size: 19px;
        margin-bottom: 15px;
    }
</style>