import apiIdeas from '@/api/ideas'
import {ACTION_API_ALL} from '@/store/actions.js'
import {GETTER_ALL, GETTER_PARENT_CHILDS, GETTER_DETAIL} from '@/store/getters.js'
import {MUTATION_SET_ALL} from '@/store/mutations.js'

// initial state
const state = {
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
    [ACTION_API_ALL] : false,
}

// getters
const getters = {
    [GETTER_DETAIL]: (state) => (id) => {
        return state.getParentChilds;
    },
    [GETTER_ALL](state){
        return state.all;
    },
    [GETTER_PARENT_CHILDS](state){
        return state.pc;
    }
}

// mutations
const mutations = {
    [MUTATION_SET_ALL](state, all) {
        var pc = {}, _all = {};

        all
        .map(x => {
            x.active = false
            x.query  = []
            return x
        })
        .forEach(function(c,i){
            if(!pc[state.type[c.type]]){
                pc[state.type[c.type]] = {[c.id] : c};
            }else{
                pc[state.type[c.type]][c.id] = c;
            }
            _all[c.id] = c;
        });

        state.pc  = pc;
        state.all = _all;
    },
    // [UPDATE_ALL](state, query){

    // }
}

// actions
const actions = {
    async [ACTION_API_ALL]({ commit }) {
        console.log('get ideas properties')
        // kt xem api có đang chạy không
        // nếu có nhiều nơi cùng gọi thì k chạy nhiều lần
        // if(state[ACTION_API_ALL]){
        //     return {};
        // }
        // commit('updateStateApi', true);
        return await apiIdeas({}).then((response) => {
                // commit('updateStateApi', false);
                commit(MUTATION_SET_ALL, response.data.data);
            });
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
