<script setup>
import { onMounted, ref } from 'vue';
import Pop from '../utils/Pop.js';
import { accountService } from '../services/AccountService.js';
import { AppState } from '../AppState.js';


const accountData = ref({
  name: '',
  picture: '',
  bio: '',
  coverImg: '',
  github: '',
  linkedin: '',
  resume: '',
  class: '',
  graduated: false
})

onMounted(() => { accountData.value = { ...AppState.account } })

async function updateAccount(){
    try {
        // FIXME pass the value of the ref down here ✅
      await accountService.updateAccount(accountData.value)
      Pop.success("Update successful")
    }
    catch (error){
      Pop.error(error);
    }
}
</script>


<template>
<form @submit.prevent="updateAccount()">
    <div class="mb-2">
        <label for="name" class="form-label">Name:</label>
        <input v-model="accountData.name" type="text" class="form-control" id="name" required maxlength="500">
    </div>
    <div class="mb-2">
        <label for="picture" class="form-label">Img URL:</label>
        <input v-model="accountData.picture" type="url" class="form-control" id="picture" maxlength="500">
    </div>
    <div class="mb-2">
        <label for="bio" class="form-label">Bio:</label>
        <input v-model="accountData.bio" type="text" class="form-control" id="bio" maxlength="1000">
    </div>
    <div class="mb-2">
        <label for="coverImg" class="form-label">Cover Image:</label>
        <input v-model="accountData.coverImg" type="url" class="form-control" id="coverImg" maxlength="500">
    </div>
    <div class="mb-2">
        <label for="github" class="form-label">GitHub:</label>
        <input v-model="accountData.github" type="url" class="form-control" id="github" maxlength="500">
    </div>
    <div class="mb-2">
        <label for="linkedin" class="form-label">LinkedIn:</label>
        <input v-model="accountData.linkedin" type="url" class="form-control" id="linkedin" maxlength="500">
    </div>
    <div class="mb-2">
        <label for="resume" class="form-label">Resume:</label>
        <input v-model="accountData.resume" type="text" class="form-control" id="resume" maxlength="500">
    </div>
    <div class="mb-2">
        <label for="class" class="form-label">Class:</label>
        <input v-model="accountData.class" type="text" class="form-control" id="class" maxlength="100">
    </div>
    <div class="mb-2">
        <label for="graduated" class="form-label">Have you graduated?</label>
        <input v-model="accountData.graduated" type="checkbox" id="graduated">
    </div>
    <button type="submit" class="btn btn-info">Submit</button>
</form>
</template>


<style lang="scss" scoped>

</style>