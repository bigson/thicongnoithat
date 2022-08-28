import apiIdeas from '@/api/ideas'
import { defineStore } from 'pinia'

export const IDEAS_GETTER_DETAIL        = 'IDEAS_GETTER_DETAIL'
export const IDEAS_GETTER_ALL           = 'IDEAS_GETTER_ALL'
export const IDEAS_GETTER_PARENT_CHILDS = 'IDEAS_GETTER_PARENT_CHILDS'
export const IDEAS_ACTION_API_ALL       = 'IDEAS_ACTION_API_ALL'

export const useIdeasStore = defineStore('ideas', {
    state : () => {
        return {
                all      : [],
                avaiable : [],
                pc       : {},
                type     : {
                            1 : 'Hình thức',//    const TYPE_KIND           = ;
                            2 : 'Vị trí',//    const TYPE_LOCATION       = ;
                            3 : 'Phong cách',//    const TYPE_STYLE          = ;
                            4 : 'Nguồn gốc',//    const TYPE_SOURCE         = ;
                            5 : 'Vật liệu',//    const TYPE_MATERIAL       = ;
                            6 : 'Vật liệu sàn',//    const TYPE_MATERIAL_FLOOR = ;
                            7 : 'Màu sắc',//    const TYPE_COLOR          = ;
                            8 : 'Hoa văn',//    const TYPE_TEXTURE        = ;
                            9 : 'Tiện ích',//    const TYPE_SMART          = ;
                        },
                [ACT_API_ALL] : false,
            }
    },
    getters : {
        [IDEAS_GETTER_DETAIL](id) {
            return state.getParentChilds;
        },
        [IDEAS_GETTER_ALL](){
            return state.all;
        },
        [IDEAS_GETTER_PARENT_CHILDS](){
            return state.pc;
        }
    },
    actions : {
        async [IDEAS_ACTION_API_ALL]({ commit }) {
            // kt xem api có đang chạy không
            // nếu có nhiều nơi cùng gọi thì k chạy nhiều lần
            // if(state[ACT_API_ALL]){
            //     return {};
            // }
            // commit('updateStateApi', true);
            // return new Promise((resolve, reject) => {
            //     ({}, function(response) {
            //        resolve(response);
            //     });
            // }).then((response) => {
            //     commit('updateStateApi', false);
            //     commit(SET_ALL, response.data.data);
            // });

            let response = await apiIdeas(),
                all = response.data.data,
                pc = {},
                _all = {};

            all.forEach(function(c,i){
                if(!pc[state.type[c.type]]){
                    pc[state.type[c.type]] = {[c.id] : c};
                }else{
                    pc[state.type[c.type]][c.id] = c;
                }
                _all[c.id] = c;
            });

            state.pc  = pc;
            state.all = _all;
        }
    },
})
