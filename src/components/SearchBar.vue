<script setup>
import { computed, ref } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { postsService } from '../services/PostsService.js';



const searchTerm = ref('')

const searchingPosts = computed(() => AppState.searchingPosts)

async function searchPosts(){
    try {
      logger.log('Searching...', searchTerm.value)
      await postsService.searchPosts(searchTerm.value)
      searchTerm.value = ''
    }
    catch (error){
      Pop.error(error);
    }
}

</script>


<template>
    <form @submit.prevent = "searchPosts()">
        <input v-model="searchTerm" type="text" placeholder="Search for posts">
        <button class="btn btn-dark mx-1"><i class="mdi mdi-magnify"></i></button>
    </form>
</template>


<style lang="scss" scoped>

</style>