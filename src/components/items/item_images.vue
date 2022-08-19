<template>
    <div class="items item-images" v-if="images && images.length">
        <div class="item" v-for="image in images">
            <div class="item-image">
                <img :src="image.src" :alt="image.album">
            </div>
            <h3>{{image.album}}</h3>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'item-images',
        props: ['images'],
    }
</script>