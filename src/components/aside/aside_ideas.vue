<template>
    <div class="aside-box aside-menu aside-ideas">
        <ul class="am-menu" v-if="ideas && Object.keys(ideas).length">
            <li class="am-list" v-for="(idea, type, index) in ideas">
                <label :for="'ra_aside_idea_' + index"><h4>{{type}}</h4></label>
                <input type="radio" name="ra-input-idea" class="hidden ra-input-idea" :id="'ra_aside_idea_' + index">
                <ul class="am-menu trans">
                    <li class="am-list" v-for="(i, j) in idea" :key="'idea_' + i.id">
                        <router-link
                        :to="{name: 'ideas', query: i.query}"
                        :key="'idea_rl_' + i.id"
                        :title="i.name"
                        :class="{active: i.active}">
                            <label>
                                <input type="radio" :name="type" class="cb-input" :selected="i.active" :key="'radio_' + i.id" :value="i.id" v-model="i.active">
                                <i class="cb-label"></i> {{i.name}}</label>
                        </router-link>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>
<script>
    import {
        IDEAS_GETTER_ALL,
        IDEAS_GETTER_PARENT_CHILDS
    } from '@/store/getters.js'

    import {IDEAS_ACTION_API_ALL} from '@/store/actions.js'

    import { mapGetters } from 'vuex'

    import {clone} from '@/utils/index.js'

    export default {
        name : 'aside_ideas',
        computed :{
            ...mapGetters({
                ideasPc  : IDEAS_GETTER_PARENT_CHILDS,
                ideasAll : IDEAS_GETTER_ALL,
            }),
            properties(){
                // nếu là đang ở view detail_image thì sẽ lấy properties ở đây
                if(this.$route.name == 'detail_image' && this.$parent.detailImage.images){
                    let detailImage = this.$parent.detailImage,
                        img         = detailImage.images.find(x => x.id == detailImage.id),
                        pp          = img.properties.map(x => x.id)

                    return pp
                }

                let pp = this.$route.query.properties

                if(!(pp instanceof Array)){
                    if(!pp){
                        return []
                    }

                    pp = pp.replace(/^\s?,|,\s?$|\s/g, '')

                    // console.log(1, properties)
                    pp = pp ? pp.toString().split(',') : []
                }

                return pp
            },
            otherQuery(){
                let query = Object.assign({}, this.$route.query)

                delete(query['properties'])

                return query
            },
            ideas(){
                if(!Object.keys(this.ideasPc).length){
                    return {};
                }
                // console.log('this.ideasPc', this.ideasPc);
                let ideas   = Object.assign({}, this.ideasPc),
                    // giới hạn 3 thuộc tính này
                    ideasPcNew = {
                        'Hình thức'  : clone(ideas['Hình thức']),
                        'Vị trí'     : clone(ideas['Vị trí']),
                        'Phong cách' : clone(ideas['Phong cách']),
                    }

                // this.updateProperties(ideas);
                let properties  = this.properties,
                    query       = this.otherQuery

                for(let i in ideasPcNew){
                    let e = ideasPcNew[i],
                        p = properties ? properties.filter(x => !(Object.keys(e).includes(x))) : []

                    for(let j in e){
                        let f   = e[j],
                            _p  = [...p, f.id]

                        f.query = Object.assign({}, query, {properties : _p.join(',')})

                        if(properties.includes(f.id.toString())){
                            let p = properties.filter(x => x != f.id)

                            f.active           = f.id

                            if(p.length){
                                f.query.properties = p.join(',')
                            }else{
                                delete(f.query.properties)
                            }

                        }else{
                            f.active = false
                        }
                        // console.log(properties)
                    }
                }

                return ideasPcNew
            }
        },
        methods:{
            updateProperties(ideasPc){

                let properties  = this.properties,
                    query       = this.otherQuery

                for(let i in ideasPc){
                    let e = ideasPc[i],
                        p = properties ? properties.filter(x => !(Object.keys(e).includes(x))) : []

                    for(let j in e){
                        let f = e[j],
                            _p = [...p, f.id]

                        f.query = Object.assign({}, query, {properties : _p.join(',')})

                        if(properties.includes(f.id.toString())){
                            let p = properties.filter(x => x != f.id)

                            f.active           = f.id

                            if(p.length){
                                f.query.properties = p.join(',')
                            }else{
                                delete(f.query.properties)
                            }

                        }else{
                            f.active = false
                        }
                        // console.log(properties)
                    }
                }

            },
            // async fetch(){
            //     let pc;
            //     // console.log('start fetch aside ideas');
            //     if(Object.keys(this.ideasAll).length == 0){
            //         await this.$store.dispatch(IDEAS_ACTION_API_ALL)
            //     }
            // }
        },
        // async created(){
        //     // console.log('created aside_ideas', this.ideasPc, this.properties);
        //     await this.fetch();
        // }
    }
</script>