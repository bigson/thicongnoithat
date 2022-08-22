<template>
    <div class="main">
        <div class="main-wrap posts">
            <div class="main-center">
                <div class="posts-info">
                    <h1 class="title">Đăng dịch vụ</h1>
                    <div class="fc category">
                        <label for="cat_parent_id">Loại dịch vụ:</label>
                        <select class="input select" name="cat_id" id="cat_id" v-if="Object.keys(category).length" v-model="modelCategory">
                            <optgroup v-for="cat in category[10000].childs" :label="cat.name">
                                <option v-for="c in cat.childs" :data-parent="c.parent_id" :value="c.id" style="line-height: 20px">{{c.name}}</option>
                            </optgroup>
                        </select>
                    </div>
                    <div class="fc">
                        <label for="address">Địa chỉ:</label>
                        <input type="input" class="input" name="address" id="address" v-model='modelAddress'>
                    </div>
                    <div class="fc">
                        <label for="address">Khu vực nhận thi công:</label>
                        <div class="group-input locations">
                            <select class="input select" v-model="modelCity" @change="selectCity($event.target.value)">
                                <option value="0">-- Khu vực cung cấp dịch vụ --</option>
                                <option v-for="c in citiesShow" :value="c.id">{{c.name}}</option>
                            </select>
                            <div class="city" v-for="city in citiesSelected">
                                <input type="checkbox" :id="'city_' + city.id" class="input-city hidden" :value="city.id" v-model="city.checked" @change="checkboxCity($event.target)">
                                <label :for="'city_' + city.id" class="city-name">{{city.name}}: </label>
                                <div class="districts" :city-id="city.id">
                                    <template v-for="district in city.childs">
                                    <input :value="district.id" :name="city.name" type="checkbox" :id="'district_' + district.id" class="input-district hidden" v-model="district.checked" @change="checkboxDistrict($event.target)">
                                    <label class="district-name" :for="'district_' + district.id">{{district.name}}</label>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="fc">
                        <label for="title">Tiêu đề:</label>
                        <input type="input" class="input" name="title" id="title" v-model="modelTitle">
                    </div>
                    <div class="fc">
                        <label>Mô tả:</label>
                        <editable :content="'abc'" @editable="editable" ref="edit" class="editable"/>
                    </div>
                    <div class="fc">
                        <label></label>
                        <button @click="save" class="btn-save">Đăng dịch vụ</button>

                    </div>
                </div>
            </div>
            <div class="main-right">
                <upload-images class="posts-images" ref="images"/>
            </div>
        </div>
    </div>
</template>
<script>
    import {
                CATEGORIES_GETTER_PARENT_CHILDS,
                PAGE_POSTS_SERVICE_GETTER_CITY,
                PAGE_POSTS_SERVICE_GETTER_DISTRICT,
                PAGE_POSTS_SERVICE_GETTER_ADDRESS,
                PAGE_POSTS_SERVICE_GETTER_SERVICE
            } from '@/store/const/getters.js'
    import {
                PAGE_POSTS_SERVICE_ACTION_GET_CITY,
                PAGE_POSTS_SERVICE_ACTION_GET_DISTRICT,
                PAGE_POSTS_SERVICE_ACTION_SEARCH_ADDRESS,
                PAGE_POSTS_SERVICE_ACTION_POST_SERVICE
            } from '@/store/const/actions.js'
    import {
                PAGE_POSTS_SERVICE_SET_CITY_SELECTED,
                PAGE_POSTS_SERVICE_SET_CITY_UNSELECTED
            } from '@/store/const/mutations.js'
    import editable from '@/components/html/editable.vue'
    import uploadImages from '@/components/html/upload_images.vue'

    import apiServices from '@/api/services'
    import titleMixin from '@/mixins/title-mixin'
    import metaMixin from '@/mixins/meta-mixin'
    import ProgressBar from '@/mixins/progress-bar'


    export default {
        mixins     : [titleMixin, metaMixin, ProgressBar],
        name       : 'posts',
        data(){
            return {
                description   : '',
                childCats     : {},
                modelCategory : '',
                modelAddress  : '',
                modelTitle    : '',
                modelCity     : 0,
                c : [],
            }
        },
        components : {
            editable,
            uploadImages
        },
        computed: {
            category(){
                return this.$store.getters[CATEGORIES_GETTER_PARENT_CHILDS]
            },
            gallery(){
                let g = this.$ref.images.images

                return g.map(i => i.name)
            },
            cities : {
                get(){
                    if(this.c.length){
                        return this.c
                    }

                    this.c = [...this.$store.getters[PAGE_POSTS_SERVICE_GETTER_CITY]]
                    return this.c
                },
                set(newValue){
                    this.c = newValue
                }
            },
            citiesShow(){
                return this.cities.filter(x => !x.selected)
            },
            citiesSelected(){
                return this.cities.filter(x => x.selected)
            }
        },

        watch : {
        },

        methods: {
            fetch(){
            },
            editable(text){
                this.description = text
            },
            save(){

                let catId       = this.modelCategory,
                    address     = this.modelAddress,
                    districts   = [],
                    title       = this.modelTitle,
                    description = this.$refs.edit.getHtml()

                console.log(catId,address,districts,title,description)


                // apiServices.
            },
            changeParent(e){
                if(e.target.options.selectedIndex > -1) {
                    let key = e.target.options[e.target.options.selectedIndex].value,
                        parent = e.target.options[e.target.options.selectedIndex].dataset.parent

                    console.log(key,parent, this.category[10000].childs, this.category[10000].childs[parent])
                    this.childCats = this.category[10000].childs[parent].childs[key]
                }
            },
            checkboxCity(input){
                let city = this.cities.filter(x => x.id == input.value)

                input.parentNode.classList.remove('not')

                if(input.checked && city.length){
                    for(let d in city[0].childs){
                        city[0].childs[d].checked = true;
                    }

                }else{
                    for(let d in city[0].childs){
                        city[0].childs[d].checked = false;
                    }
                }
            },
            checkboxDistrict(input){
                let cityId      = input.parentNode.getAttribute('city-id'),
                    city        = this.cities.filter(x => x.id == cityId)

                if(!city.length){
                    console.log(city, cityId)
                    return false
                }

                city = city[0]

                if(city.childs.filter(x => x.checked).length == city.childs.length){
                    input.parentNode.parentNode.classList.remove('not')
                    city.checked = true
                }else{
                    input.parentNode.parentNode.classList.add('not')
                    city.checked = false
                }
            },
            selectCity(){
                if(this.modelCity == 0){
                    return
                }

                this.cities.find(x => x.id == this.modelCity).selected = true

                console.log(this.cities === this.$store.getters[PAGE_POSTS_SERVICE_GETTER_CITY])

                // this.$store.commit(PAGE_POSTS_SERVICE_SET_CITY_SELECTED, this.modelCity)

                // this.$store.dispatch(PAGE_POSTS_SERVICE_ACTION_GET_DISTRICT, this.modelCity)

                this.modelCity = '0'
            },
            async fetchData(){
                let that = this
                await this.getCities()
                            .then(function(){
                                that.progressFinish()
                            }).catch(function(err){
                                that.progressFail(err)
                            })
            },
            async getCities(){
                return await this.$store.dispatch(PAGE_POSTS_SERVICE_ACTION_GET_CITY, {params : {limit: 70}})
            },
        },

        async asyncData ({ store, route }) {
            return await store.dispatch(PAGE_POSTS_SERVICE_ACTION_GET_CITY, {limit: 70})
        },

        beforeMount(){
            this.fetchData();
        },

        title () {
            return this.$route.meta.title;
        },
        meta(){

            let title = this.$route.meta.title,
                description = this.$route.meta.description

            return [
                {
                    name    : 'description',
                    content : description,
                },
                {
                    name    : 'subject',
                    content : title,
                },
                {
                    name    : 'copyright',
                    content : this.$route.meta.copyright,
                },
                {
                    name    : 'language',
                    content : this.$route.meta.language,
                },

                {
                    property : 'og:title',
                    content  : title,
                },
                {
                    property : 'og:type',
                    content  : this.$route.meta.type,
                },
                {
                    property : 'og:url',
                    content  : this.$router.resolve({name:'posts'}).href,
                },
                {
                    property : 'og:image',
                    content  : '',
                },
                {
                    property : 'og:site_name',
                    content  : this.$route.meta.site_name,
                },
                {
                    property : 'og:description',
                    content  : description,
                },
            ]
        }
    }
</script>