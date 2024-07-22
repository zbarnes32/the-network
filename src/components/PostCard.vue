<script setup>
import { RouterLink } from 'vue-router';
import { Post } from '../models/Post.js';
import { computed, ref } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';

const account = computed(() => AppState.account)

const profile = computed(() => AppState.profile)

defineProps({
    postProp: { type: Post, required: true}
})

async function destroyPost(postId){
  try {
    const wantsToDestroy = await Pop.confirm("Are you sure you want to delete your post?")
    if (!wantsToDestroy) return
    await postsService.destroyPost(postId)
  }
  catch (error){
    Pop.error(error);
  }
}

const isPostLiked = ref ({
    liked: false
})

async function likePost(postId){
    try {
      await postsService.likePost(postId)
    }
    catch (error){
      Pop.error(error);
    }
}



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
            <div class="d-flex justify-content-between">
                <span class="pt-3 px-1">Posted on: {{ postProp.createdAt.toLocaleDateString() }}</span>
                <div>
                    <button v-if="account?.id == postProp.creatorId" @click="destroyPost(postProp.id)" type="button" class="btn btn-outline-danger"><i class="mdi mdi-delete"></i></button>
                    <button @click="likePost(postProp.id)" class="likes mdi mdi-heart-outline fs-2 p-1" :class="isPostLiked ? 'mdi-heart-outline' : 'mdi-heart'"></button>
                    <span class="fs-5 px-1">{{ postProp.likes.length }}</span>
                </div>
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
    color: rgb(23, 162, 184)
}

</style>