<script setup>
import { computed, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';
import { AppState } from '../AppState.js';
import PostCard from '../components/PostCard.vue';

const posts = computed(() => AppState.posts)

onMounted(() => { getPosts() })

async function getPosts(){
  try {
    await postsService.getPosts()
  }
  catch (error){
    Pop.error(error);
  }
}

</script>

<template>
  <section class="container">
    <div class="row">
      <div class="col-2 sidebar justify-content-start">
        <p>Side goes here</p>
      </div>
      <div v-for="post in posts" :key="post.id" class="col-md-8">
       <PostCard :postProp="post" /></div>
      <div class="col-2">
        <p>Ads go here</p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">

</style>
