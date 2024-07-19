<script setup>
import { Post } from '../models/Post.js';



defineProps({
    postProp: { type: Post, required: true}
})

</script>


<template>
<p>{{  postProp.id }}</p>
</template>


<style lang="scss" scoped>

</style>