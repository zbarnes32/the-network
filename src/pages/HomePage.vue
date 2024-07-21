<script setup>
import { computed, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';
import { AppState } from '../AppState.js';
import PostCard from '../components/PostCard.vue';
import { monetaryPicturesService } from '../services/MonetaryPicturesService.js';
import MonetaryPicture from '../components/MonetaryPicture.vue';

const posts = computed(() => AppState.posts)


const monetaryPictures = computed(() => AppState.monetaryPictures)

onMounted(() => { 
  getPosts() 
  getMonetaryPictures()
})

async function getPosts(){
  try {
    await postsService.getPosts()
  }
  catch (error){
    Pop.error(error);
  }
}

async function getMonetaryPictures(){
  try {
    await monetaryPicturesService.getMonetaryPictures()
  }
  catch (error){
    Pop.error(error);
  }
}

</script>

<template>
  <section class="container">
    <div class="row">
      <div class="col-2 text-center">
        <p>Side profile here</p>
      </div>
      <div class="col-md-8 p-4">
        <div v-for="post in posts" :key="post.id">
          <PostCard :postProp="post" />
        </div>
      </div>
      <div class="col-2 v-stack mx-auto">
        <div v-for="monetaryPicture in monetaryPictures" :key="monetaryPicture.title">
          <MonetaryPicture :monetaryPictureProp="monetaryPicture" />
        </div>
      </div>
    </div>
  </section>

  <NavigationButtons/>
</template>

<style scoped lang="scss">

</style>
