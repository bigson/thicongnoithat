import apiCategories from '@/api/categories'
import {ACTION_API_ALL} from '@/store/actions.js'
import {GETTER_ALL, GETTER_PARENT_CHILDS, GETTER_DETAIL, GETTER_BY_ID} from '@/store/getters.js'
import {MUTATION_SET_ALL} from '@/store/mutations.js'

// initial state
const state = {
    all      : {},
    pc       : {},
    // avaiable : [],
}

// getters
// Vì ssr hydrat dl nhưng không sync data category nên phần này đang dính bug phải trict ntn
const getters = {
    [GETTER_BY_ID]: (state) => (id) => {
        if(!state.all[id]){
            console.log('khong co', state, state.all, id)
        }
        return state.all[id]
        // if(!Object.keys(state).length){
        //     state = this.a.state
        // }
        // console.log('store category', state, id, state.all[id])
        // if(arguments[1] && arguments[1]['a'] && arguments[1]['a']['state']){
        //     return arguments[1]['a']['state'].all[id]
        // }else{
        //     return state.all[id]
        // }
    },
    [GETTER_ALL] : (state) => {
        return state.all
        // if(!Object.keys(state).length){
        //     state = this.a.state
        // }
        // if(arguments[0] && arguments[0].all){
        //     return arguments[0].all
        // }else{
        //     // console.log(arguments)
        //     return state.all
        // }
    },
    [GETTER_PARENT_CHILDS]:(state) => {
        return state.pc
        // if(!Object.keys(state).length){
        //     state = this.a.state
        // }
        // if(arguments[0] && arguments[0].pc){
        //     return arguments[0].pc
        // }else{
        //     // console.log(arguments)
        //     return state.pc
        // }
    }
}

// mutations
const mutations = {
    [MUTATION_SET_ALL](state, all) {
        // console.log('start category set all')
        var pc = {}, _all = {};

        all.forEach(function(c,i){
            c.childs      = {};
            c.breadcrumbs = {name : c.name, link : '/' + c.slug, title : c.meta.title}

            if(c.parent_id > 0){
                let path        = c.path.split('_'),
                    breadcrumbs = []
                path.pop()

                let parent = pc
                path.forEach(function(id, i){
                    parent      = parent[id];
                    breadcrumbs = parent['breadcrumbs']
                    parent      = parent['childs']
                });

                breadcrumbs     = breadcrumbs.slice(0);
                breadcrumbs.push(c.breadcrumbs)
                c.breadcrumbs   = breadcrumbs
                parent[c.id]    = c
            }else{
                c.breadcrumbs = [c.breadcrumbs]
                pc[c.id]      = c
            }

            _all[c.id] = c
        });


        state.pc  = pc
        state.all = _all
    }
}

// actions
const actions = {
    async [ACTION_API_ALL]({ commit, state }) {

        return await apiCategories({}).then(function(response) {
                // console.log('after call api categories')
                // resolve(response);
                commit(MUTATION_SET_ALL, response.data.data);
            })
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
