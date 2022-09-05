<template>
    <div class="item-paging" v-if="meta && meta.total_page > 1">
        <ul class="paging">
            <li v-for="p in list" :key="'paging_' + p.page" v-if="!p.current" :title="p.title">
                <router-link :to="{path : path, query : p.query}" >
                    {{p.page}}
                </router-link>
            </li>
            <li v-else class="current" :title="'Bạn đang ở trang ' + p.page">
                <span>{{p.page}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        //v-if="i < currentPage + 3"
        name: 'ItemPaging',
        props: ['meta'],
        data(){
            return {
                // list        : [],
                // currentPage : 1,
                // path        : '',
            }
        },
        computed:{
            list(){
                if(!this.meta){
                    return [];
                }
                let query = this.query,
                    _list  = Array.from({length: this.meta.total_page}, (v, k) => {
                            let page = k + 1,
                                q = Object.assign({}, query);

                            q.page = page;
                            // nếu là trang 1 thì xóa page trên url
                            if(page == 1){
                                delete(q.page);
                            }

                            return {
                                page  : page,
                                query : q,
                                title : 'Đến trang ' + page,
                            }
                        }),
                    left,
                    right,
                    list        = [],
                    currentPage = this.currentPage ? parseInt(this.currentPage) : 1,
                    queryFirst  = Object.assign({page: 0}, query);

                delete(queryFirst.page);

                left  = currentPage - 4;
                right = currentPage + 4;
                if(left < 0){
                    right -= left;
                    left  = 0;
                }
                if(right - this.meta.total_page > 0){
                    left  -= right - this.meta.total_page;
                    right = this.meta.total_page;

                    if(left < 0){
                        left = 0;
                    }
                }

                // add first nếu từ trang 2 trở đi
                if(currentPage > 2){
                    let pre = currentPage - 1;
                    list.push({
                        page  : '❮❮',
                        query : queryFirst,
                        title : 'Trang đầu',
                    });
                    list.push({
                        page  : '❮',
                        query : Object.assign({}, query, {page: pre}),
                        title : 'Trang trước',
                    });
                }else{
                    list.push({
                        page  : '❮',
                        query : queryFirst,
                        title : 'Trang đầu',
                    });
                }

                // add left
                list = list.concat(_list.slice(left, currentPage - 1));
                // add current
                list.push({
                    page    : currentPage,
                    current : true,
                    query   : {},
                });
                // add right
                list = list.concat(_list.slice(currentPage, right));
                // add next
                if(currentPage + 1 <= this.meta.total_page){
                    list.push({
                        page  : 'Xem tiếp ❱',
                        query : Object.assign({}, this.query, {page: currentPage + 1}),
                        title : 'Trang tiếp theo',
                    });
                }
                // this.list = list;
                return list;
            },
            query(){
                return this.$route.query;
            },
            path(){
                return this.$route.path;
            },
            currentPage(){
                return this.$route.query.page;
            }
        },
        watch : {
            meta : function(){
                // console.log('update meta paging');
                // this.processPaging();
            }
        },
        methods : {
            processPaging(){
                if(!this.meta){
                    return false;
                }
                let query = this.query,
                    _list  = Array.from({length: this.meta.total_page}, (v, k) => {
                            let page = k + 1,
                                q = Object.assign({}, query);

                            q.page = page;
                            // nếu là trang 1 thì xóa page trên url
                            if(page == 1){
                                delete(q.page);
                            }

                            return {
                                page  : page,
                                query : q,
                                title : 'Đến trang ' + page,
                            }
                        }),
                    left,
                    right,
                    list        = [],
                    currentPage = this.currentPage ? parseInt(this.currentPage) : 1,
                    queryFirst  = Object.assign({page: 0}, query);
                console.log(currentPage);
                delete(queryFirst.page);

                if(query.page && query.page > 1){
                    currentPage = parseInt(query.page);
                }

                left  = currentPage - 4;
                right = currentPage + 4;
                if(left < 0){
                    right -= left;
                    left  = 0;
                }
                if(right - this.meta.total_page > 0){
                    left  -= right - this.meta.total_page;
                    right = this.meta.total_page;

                    if(left < 0){
                        left = 0;
                    }
                }

                // add first nếu từ trang 2 trở đi
                if(currentPage > 2){
                    let pre = currentPage - 1;
                    console.log(pre, currentPage, Object.assign(query, {page: pre}));
                    list.push({
                        page  : '❮❮',
                        query : queryFirst,
                        title : 'Trang đầu',
                    });
                    list.push({
                        page  : '❮',
                        query : Object.assign(query, {page: pre}),
                        title : 'Trang trước',
                    });
                    console.log('list', list, query);
                }else{
                    list.push({
                        page  : '❮',
                        query : queryFirst,
                        title : 'Trang đầu',
                    });
                }

                // add left
                list = list.concat(_list.slice(left, currentPage - 1));
                // add current
                list.push({
                    page : currentPage,
                    current : true,
                    query: {},
                });
                // add right
                list = list.concat(_list.slice(currentPage, right));
                console.log('pre end', currentPage);
                // add next
                if(currentPage + 1 <= this.meta.total_page){
                    list.push({
                        page  : 'Xem tiếp ❱',
                        query : Object.assign(this.query, {page: currentPage + 1}),
                        title : 'Trang tiếp theo',
                    });
                }
                console.log('end', currentPage)
                this.list = list;
            }
        },
        created(){
            console.log('created pai');
            // chạy khi f5 trang
            // this.processPaging();
        },
    }
</script>