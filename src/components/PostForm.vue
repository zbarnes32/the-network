<script setup>
import { ref } from 'vue';
import { logger } from '../utils/Logger.js';
import { postsService } from '../services/PostsService.js';
import Pop from '../utils/Pop.js';

const postData = ref({
    body: '',
    imgUrl: ''
})

async function createPost(){
    try {
        logger.log("creating post 📧")
        await postsService.createPost(postData.value)
    }
    catch (error){
      Pop.error(error);
    }
}
</script>


<template>
<form @submit.prevent="createPost()">
    <div class="network-post-card">
        <textarea v-model="postData.body" name="post-body" class="post-body" id="" placeholder="Share what's happening..." required maxlength="500"></textarea>
        <label for="imgUrl" class="mx-5 imgUrl-label" ></label>
        <input v-model="postData.imgUrl" type="url" id="imgUrl" class="post-body imgUrl-input" maxlength="500" placeholder="Post Image/Gif url here...">
    </div>
    <div class="text-end pt-1">
        <button class="btn btn-info" type="submit"><i class="mdi mdi-send"></i>Post</button>
    </div>
</form>

</template>


<style lang="scss" scoped>


textarea {
    margin-left: 2.5em;
    width: 108vh;
    height: 20vh;
}

.imgUrl-input {
    width: 20em;
}

</style>