<template>
    <div class="item-slide-home">
        <div class="item" v-for="image in images">

        </div>
    </div>
</template>
<script>
    export default {
        name: 'item-filters',
        props: ['services'],
    }
</script>