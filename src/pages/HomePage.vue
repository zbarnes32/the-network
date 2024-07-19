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
  <section class="container-fluid">
    <div class="row">
      <div class="col-2 text-center">
        <p>Side profile here</p>
      </div>
      <div class="col-md-8 p-5">
        <div v-for="post in posts" :key="post.id" >
          <PostCard :postProp="post" />
        </div>
      </div>
      <div class="col-2">
        <p>Ads go here</p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">

</style>
