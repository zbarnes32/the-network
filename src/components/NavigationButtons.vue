<script setup>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';



const currentPage = computed(() => AppState.currentPage)

async function changePage(pageNumber){
    try {
      await postsService.changePage(pageNumber)
    }
    catch (error){
      Pop.error(error);
    }
}
</script>


<template>
    <div>
        <button :disabled="currentPage == 1" @click="changePage(currentPage-1)">Previous Page</button>
        <!-- FIXME disable next button when currentPage is equal to totalPages -->
        <button :disabled="currentPage == 39" @click="changePage(currentPage+1)">Next Page</button>
    </div>
</template>


<style lang="scss" scoped>

</style>