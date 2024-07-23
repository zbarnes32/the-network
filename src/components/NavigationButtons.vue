<script setup>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';
import { useRoute } from 'vue-router';
import { logger } from '../utils/Logger.js';

// FIXME bring in the route here, and call a different function in the service if you are on the profile page
const route = useRoute()
const profileId = route.params.profileId

const currentPage = computed(() => AppState.currentPage)

async function changePage(pageNumber){
  logger.log("Did we get the profileId?",profileId)
    try {
      if (!profileId){
        await postsService.changePage(pageNumber)
      } else {
        await postsService.getPostsByProfileId(profileId, pageNumber)
      }
    }
    catch (error){
      Pop.error(error);
    }
}
</script>


<template>
    <div class="d-flex justify-content-between">
        <button :disabled="currentPage == 1" @click="changePage(currentPage-1)" class="btn btn-warning">Previous Page</button>
        <!-- FIXME disable next button when currentPage is equal to totalPages -->
        <button :disabled="currentPage == 39" @click="changePage(currentPage+1)" class="btn btn-warning">Next Page</button>
    </div>
</template>


<style lang="scss" scoped>

</style>