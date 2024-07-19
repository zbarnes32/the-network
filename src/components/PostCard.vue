<script setup>
import { RouterLink } from 'vue-router';
import { Post } from '../models/Post.js';



defineProps({
    postProp: { type: Post, required: true}
})

</script>


<template>
<div class="card m-4">
    <div class="row">
        <div class="col-2">
            <div class="p-3">
                <RouterLink :to="{name: 'Profile', params: { profileId: postProp.creatorId}}">
                    <img :src="postProp.creator.picture" :alt="postProp.creator.name" class="creator-img" :title="postProp.creator.name">
                </RouterLink>
            </div>
        </div>
        <div class="col-10 d-flex justify-content-start">
                <p class="fs-3">{{ postProp.creator.name }}</p>
                <div class="text-end">
                    <span class="mdi mdi-dots-horizontal"></span>
                </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12 text-start">
            <p>{{ postProp.body }}</p>
            <img :src="postProp.imgUrl" alt="" class="post-img">
            <div class="text-end">
                <span class="likes mdi mdi-heart-outline fs-2 p-1"></span>
                <span class="fs-5 px-1">{{ postProp.likes.length }}</span>
            </div>
        </div>
    </div>
</div>
</template>


<style lang="scss" scoped>

.creator-img{
    height: 10vh;
    aspect-ratio: 1/1;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
    border: 1px solid black;
}

.post-img{
    height: 40vh;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
}

.grad-cap{
    color: rgb(120, 120, 120)
}

.likes{
    color: rgb(113, 0, 166)
}

</style>