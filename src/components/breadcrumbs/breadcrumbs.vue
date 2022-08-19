<template>
    <nav v-if="breadcrumbs && breadcrumbs.length">
        <ol class="breadcrumb" itemscope itemtype="http://schema.org/BreadcrumbList">
            <li class="breadcrumb-item" itemprop="itemListElement" itemscope
                itemtype="http://schema.org/ListItem" v-for="(breadcrumb,i) in breadcrumbs">
                <router-link :to="breadcrumb.link" itemscope itemtype="http://schema.org/Thing"
                   itemprop="item">
                    <span itemprop="name">{{breadcrumb.name}}</span>
                </router-link>
                <meta itemprop="position" :content="i"/>
            </li>
        </ol>
    </nav>
</template>
<script>
    export default {
        name: 'breadcrumbs',
        props: ['breadcrumbs'],
    }
</script>