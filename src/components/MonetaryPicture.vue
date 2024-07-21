<script setup>
import { MonetaryPicture } from '../models/MonetaryPicture.js';


defineProps({
    monetaryPictureProp: { type: MonetaryPicture, required: true}
})
</script>


<template>
<div>
    <div class="my-3">
        <img :src="monetaryPictureProp.tall" :alt="monetaryPictureProp.title">
    </div>
</div>
</template>


<style lang="scss" scoped>

img {
    width: 100%;
    display: block;
}
</style>