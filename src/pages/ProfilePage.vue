<script setup>
import { useRoute } from 'vue-router';
import { computed, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { profilesService } from '../services/ProfilesService.js';
import { AppState } from '../AppState.js';

const profile = computed(() => AppState.profile)

const route = useRoute()

onMounted(() => {
    const profileId = route.params.profileId
    getProfileById(profileId)
})

async function getProfileById(profileId){
    try {
      await profilesService.getProfileById(profileId)
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
                    <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <div class="main-info">
                                <img :src="profile.picture" :alt="profile.name" class="profile-picture">
                                <h3 class="card-title pt-3">{{ profile.name }}</h3>
                                <h5 class="graduation-class">{{ profile.class }}</h5>
                            </div>
                            <div class="socials">
                                <span v-if="profile.github" class="fs-1 mdi mdi-github"><a :href="profile.github"></a></span>
                                <span v-if="profile.linkedin" class="fs-1 mdi mdi-linkedin"><a :href="profile.linkedin"></a></span>
                                <span v-if="profile.resume" class="fs-1 mdi mdi-card-account-details-outline"><a :href="profile.resume"></a></span>
                            </div>

                        </div>
                        <p class="card-text bio">{{ profile.bio }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>


.cover-img {
    height: 40vh;
    width: 100%;
    object-fit: cover;
    object-position: center;
}

.profile-picture {
    height: 20vh;
    aspect-ratio: 1/1;
    border-radius: 50%;
}


</style>