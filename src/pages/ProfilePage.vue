<script setup>
import { useRoute } from 'vue-router';
import { computed, onMounted, watchEffect } from 'vue';
import Pop from '../utils/Pop.js';
import { profilesService } from '../services/ProfilesService.js';
import { AppState } from '../AppState.js';
import { postsService } from '../services/PostsService.js';
import PostCard from '../components/PostCard.vue';
import NavigationButtons from '../components/NavigationButtons.vue';
import MonetaryPicture from '../components/MonetaryPicture.vue';
import { monetaryPicturesService } from '../services/MonetaryPicturesService.js';
import PostForm from '../components/PostForm.vue';

const profile = computed(() => AppState.profile)

const posts = computed(() => AppState.profilePosts)

const route = useRoute()

const monetaryPictures = computed(() => AppState.monetaryPictures)

const account = computed(() => AppState.account)

watchEffect(() => {
    const profileId = route.params.profileId
    getProfileById(profileId)
    getPostsByProfileId(profileId)
    getMonetaryPictures()
})

async function getProfileById(profileId){
    try {
      await profilesService.getProfileById(profileId)
    }
    catch (error){
      Pop.error(error);
    }
}

async function getPostsByProfileId(profileId, pageNumber){
    try {
     await postsService.getPostsByProfileId(profileId, pageNumber) 
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
    <div v-if="profile" class="container">
        <div class="row">
            <div class="col-10 px-0">
                <div class="card mt-4">
                <img :src="profile.coverImg" class="card-img-top cover-img" alt="Cover Image">
                    <div class="card-body profile-body">
                        <div class="d-flex justify-content-between">
                            <div class="main-info">
                                <img :src="profile.picture" :alt="profile.name" class="profile-picture">
                                <h3 class="card-title pt-3">{{ profile.name }}<span v-if="profile.graduated"><span class="mdi mdi-school"></span></span></h3>
                                <h5 class="graduation-class">{{ profile.class }}</h5>
                            </div>
                            <div class="socials">
                                <a :href="profile.github" target="_blank">
                                    <span v-if="profile.github" class="fs-1 mdi mdi-github"></span>
                                </a>
                                <a :href="profile.linkedin" target="_blank">
                                    <span v-if="profile.linkedin" class="fs-1 mdi mdi-linkedin"></span>
                                </a>
                                <a :href="profile.resume" target="_blank"><span v-if="profile.resume" class="fs-1 mdi mdi-card-account-details-outline"></span>
                                </a>
                            </div>
                        </div>
                        <div>
                            <p class="card-text bio">{{ profile.bio }}</p>
                            <!-- FIXME render button only when account.id == profile.id -->
                        <!-- <div class="text-end">
                            <button class="btn btn-outline-secondary">Edit</button>
                        </div> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-2 v-stack mx-auto">
                <div v-for="monetaryPicture in monetaryPictures" :key="monetaryPicture.title">
            <MonetaryPicture :monetaryPictureProp="monetaryPicture" />
                </div>
            </div>
                <!-- FIXME Running into error on v-if on line 100 -->
                <!-- <div v-if="account.id == profile.id" class="card col-10 mt-4 p-1">
                    <div class="card-body d-flex px-1">
                        <img :src="profile.picture" :alt="profile.name" class="post-card-img">
                        <PostForm /> -->
                    <!-- <div class="card-body d-flex px-1">
                        <img :src="profile.picture" :alt="profile.name" class="post-card-img">
                        <form>
                            <div class="network-post-card">
                                <textarea name="post-body" class="post-body" id="" placeholder="Share what's happening..."></textarea>
                            </div>
                        </form> -->
                    <!-- </div>
                </div> -->
        </div>  
    </div>
    <section class="row">
            <!-- {{ posts }} -->
        <div v-for="post in posts" :key="post.id" class="col-md-10">
            <PostCard :postProp="post"/>
        </div>
    </section>
    <section>
        <NavigationButtons/>
    </section>
</template>


<style lang="scss" scoped>


.cover-img {
    height: 60vh;
    width: 100%;
    object-fit: cover;
    object-position: center;
}

.profile-picture {
    height: 20vh;
    aspect-ratio: 1/1;
    border-radius: 50%;
    border: 1px solid black;
}

.post-card-img {
    height: 15vh;
    aspect-ratio: 1/1;
    border-radius: 50%;
    border: 1px solid black;
}

a {
    color: rgb(86, 86, 86)
}

// textarea {
//     margin-left: 3.5em;
//     width: 100vh;
//     height: 20vh;
// }


</style>