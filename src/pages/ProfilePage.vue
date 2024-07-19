<script setup>
import { useRoute } from 'vue-router';
import { computed, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { profilesService } from '../services/ProfilesService.js';
import { AppState } from '../AppState.js';
import { postsService } from '../services/PostsService.js';
import PostCard from '../components/PostCard.vue';

const profile = computed(() => AppState.profile)

const posts = computed(() => AppState.profilePosts)

const route = useRoute()

onMounted(() => {
    const profileId = route.params.profileId
    getProfileById(profileId)
    getPostsByProfileId(profileId)
})

async function getProfileById(profileId){
    try {
      await profilesService.getProfileById(profileId)
    }
    catch (error){
      Pop.error(error);
    }
}

async function getPostsByProfileId(profileId){
    try {
     await postsService.getPostsByProfileId(profileId) 
    }
    catch (error){
      Pop.error(error);
    }
}

</script>


<template>
    <div v-if="profile" class="container">
        <div class="row">
            <div class="col-12">
                <div class="card">
                <img :src="profile.coverImg" class="card-img-top cover-img" alt="Cover Image">
                    <div class="card-body profile-body">
                        <div class="d-flex justify-content-between">
                            <div class="main-info">
                                <img :src="profile.picture" :alt="profile.name" class="profile-picture">
                                <h3 class="card-title pt-3">{{ profile.name }}</h3>
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
                        <div class="text-end">
                            <button class="btn btn-outline-secondary">Edit</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-body d-flex">
                <img :src="profile.picture" :alt="profile.name" class="post-card-img">
                <form>
                    <textarea name="post-body" id="" placeholder="Share what's happening..."></textarea>
                </form>
            </div>
        </div>
    </div>
    <section class="row">
            <!-- {{ posts }} -->
        <div v-for="post in posts" :key="post.id" class="col-md-8">
            <PostCard :postProp="post"/>
        </div>
    </section>
</template>


<style lang="scss" scoped>


.cover-img {
    height: 20vh;
    width: 100%;
    object-fit: cover;
    object-position: center;
}

.profile-picture {
    height: 20vh;
    aspect-ratio: 1/1;
    border-radius: 50%;
}

.post-card-img {
    height: 8vh;
    aspect-ratio: 1/1;
    border-radius: 50%;
}

a {
    color: rgb(86, 86, 86)
}

textarea {
    width: 60vh;
}


</style>