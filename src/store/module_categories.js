import apiCategories from '@/api/categories'
import { defineStore } from 'pinia'

export const CATEGORIES_GETTER_ALL           = 'CATEGORIES_GETTER_ALL'
export const CATEGORIES_GETTER_PARENT_CHILDS = 'CATEGORIES_GETTER_PARENT_CHILDS'
export const CATEGORIES_GETTER_BY_ID         = 'CATEGORIES_GETTER_BY_ID'
export const CATEGORIES_ACTION_API_ALL       = 'CATEGORIES_ACTION_API_ALL'

export const useCategoriesStore = defineStore('categories', {
    state : () => {
        return {
                    all      : {},
                    avaiable : [],
                    pc       : {},
                }
    },
    getters : {
        [CATEGORIES_GETTER_PARENT_CHILDS](state) {
            return (id) => state.all[id];
        },
        [CATEGORIES_GETTER_ALL](state){
            return state.all;
        },
        [CATEGORIES_GETTER_PARENT_CHILDS](state){
            return state.pc;
        },
        [CATEGORIES_GETTER_BY_ID](state){
            return (id) => {

            }
        }
    },
    actions : {
        async [CATEGORIES_ACTION_API_ALL]() {
            let response = await apiCategories(),
                all = response.data.data,
                pc = {},
                _all = {}

            all.forEach(function(c,i){
                c.childs      = {};
                c.breadcrumbs = {name : c.name, link : c.slug};

                if(c.parent_id > 0){
                    let path = c.path.split('_'),
                        breadcrumbs = [];
                    path.pop();

                    parent = pc;
                    path.forEach(function(id, i){
                        parent      = parent[id];
                        breadcrumbs = parent['breadcrumbs'];
                        parent      = parent['childs'];
                    });

                    breadcrumbs     = breadcrumbs.slice(0);
                    breadcrumbs.push(c.breadcrumbs);
                    c.breadcrumbs   = breadcrumbs;
                    parent[c.id]    = c;
                }else{
                    c.breadcrumbs = [c.breadcrumbs];
                    pc[c.id]      = c;
                }

                _all[c.id] = c;
            });


            state.pc  = pc;
            state.all = _all;
        }
    }
})
