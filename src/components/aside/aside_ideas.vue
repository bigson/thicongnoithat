<template>
    <div class="aside-box aside-menu aside-ideas">
        <ul class="am-menu" v-if="ideas && Object.keys(ideas).length">
            <li class="am-list" v-for="(idea, type) in ideas">
                <h4>{{type}}</h4>
                <ul class="am-menu">
                    <li class="am-list" v-for="(i, j) in idea" :key="'idea_' + i.id">
                        <router-link :to="{name: 'ideas', query: {properties : i.properties}}" :key="'idea_rl_' + i.id" :class="{active: i.active}">
                            <label>
                                <input type="radio" :name="type" class="cb-input" :selected="i.active" :key="'radio_' + i.id" :value="i.id" v-model="i.active">
                                <i class="cb-label"></i>
                                {{i.name}}
                            </label>
                        </router-link>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>
<script>
    import { mapState, mapActions } from 'pinia'
    import {
        IDEAS_GETTER_ALL,
        IDEAS_GETTER_PARENT_CHILDS,
        IDEAS_ACTION_API_ALL,
        useIdeasStore
    } from '@/store/module_ideas.js'

    export default {
        name : 'AsideIdeas',
        computed :{
            ...mapState(useIdeasStore,[
                    IDEAS_GETTER_ALL,
                    IDEAS_GETTER_PARENT_CHILDS,
                ]),
            ideasPc(){
                return this[IDEAS_GETTER_PARENT_CHILDS];
            },
            ideasAll(){
                return this[IDEAS_GETTER_ALL];
            },
            properties(){
                return this.$route.query.properties;
            },
            ideas(){
                if(!Object.keys(this.ideasPc).length){
                    return {};
                }

                let ideas = Object.assign({}, this.ideasPc);

                // giới hạn 3 thuộc tính này
                ideas = {
                    'Hình thức'  : ideas['Hình thức'],
                    'Vị trí'     : ideas['Vị trí'],
                    'Phong cách' : ideas['Phong cách'],
                }

                this.updateProperties(ideas);
                return ideas;
            }
        },
        methods:{
            ...mapActions(useIdeasStore, [IDEAS_ACTION_API_ALL]),
            updateProperties(ideasPc){
                let properties  = this.properties;

                properties = properties ? properties.toString().split(',') : [];

                for(let i in ideasPc){
                    let e = ideasPc[i],
                        p = properties ? properties.filter(x => !(Object.keys(e).includes(x))) : [];

                    for(let j in e){
                        let f = e[j],
                            _p = [...p,f.id];

                        f.properties = _p.join(',');
                        // console.log(properties, f.id, properties.includes(f.id));
                        if(properties.includes(f.id.toString())){
                            f.active = f.id;
                        }else{
                            f.active = false;
                        }
                    }
                }
            },
            async fetch(){
                let pc;
                console.log('start fetch aside ideas');
                if(Object.keys(this.ideasAll).length == 0){
                    await this[IDEAS_ACTION_API_ALL]().then((...a) => {
                        console.log('done fetch aside ideas', this[IDEAS_GETTER_PARENT_CHILDS], a);
                    });
                }
            }
        },
        created(){
            // console.log('created aside_ideas', this.ideasPc, this.properties);
            this.fetch();
        }
    }
</script>