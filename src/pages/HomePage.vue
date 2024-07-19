<script setup>
import { onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';


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
      <div class="col-8">
        <p>Post go here</p>
      </div>
      <div class="col-2">
        <p>Ads go here</p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">

</style>
