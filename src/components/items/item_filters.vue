<template>
    <div class="item-filters" v-if="services && services.length">
        <div class="item" v-for="service in services">
            {{service.title}}
        </div>
    </div>
</template>
<script>
    export default {
        name: 'item-filters',
        props: ['services'],
    }
</script>