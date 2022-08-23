import apiCategories from '@/api/categories'
import {ACT_API_ALL} from '@/store/const/actions.js'
import {GET_ALL, GET_PARENT_CHILDS, GET_DETAIL} from '@/store/const/getters.js'
import {SET_ALL} from '@/store/const/mutations.js'
import { defineStore } from 'pinia'

export const useCategoriesStore = defineStore('categories', {
    state : () => {
        return {
                    all      : {},
                    avaiable : [],
                    pc       : {},
                }
    },
    getters : {
        [GET_PARENT_CHILDS](state, id) {
            return state.all[id];
        },
        [GET_ALL](state){
            return state.all;
        },
        [GET_PARENT_CHILDS](state){
            return state.pc;
        }
    },
    actions : {
        async [ACT_API_ALL]({ commit }) {
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
