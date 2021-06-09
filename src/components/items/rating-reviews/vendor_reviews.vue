<template>
    <ul class="rating-vendor c" v-if="rating.length">
        <li v-for="(item, p) in rating" class="item r" vocab="https://schema.org/" typeof="Review">
            <div class="user" property="author" typeof="Person"><span property="name">{{item.user}}</span></div>
            <div class="content">
                <p class="score" property="reviewRating" typeof="Rating">
                    <meta property="worstRating" content="1"/>
                    <meta property="bestRating"  content="5"/>
                    <meta property="ratingValue" :content="item.rate"/>
                    <template v-for="i in item.rate">★ </template>
                    <template v-for="i in (5 - item.rate)">☆ </template>
                </p>
                <span property="description">{{item.content}}</span>
            </div>
            <meta property="position" :content="p"/>
        </li>
    </ul>
</template>
<script>
    export default {
        name: 'item-rating-vendor',
        props: ['rating'],
    }
</script>