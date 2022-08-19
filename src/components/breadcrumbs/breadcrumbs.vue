<template>
    <nav v-if="breadcrumbs && breadcrumbs.length">
        <ol vocab="https://schema.org/" typeof="BreadcrumbList" class="breadcrumb">
            <li class="breadcrumb-item"
                property="itemListElement"
                typeof="ListItem"
                v-for="(breadcrumb,i) in breadcrumbs">
                <router-link
                :to="breadcrumb.link"
                :title="breadcrumb.title ? breadcrumb.title : breadcrumb.name"
                property="item"
                typeof="WebPage"><span property="name">{{breadcrumb.name}}</span></router-link>
                <meta property="position" :content="i"/>
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