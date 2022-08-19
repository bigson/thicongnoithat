import shop from '@/api/products'

// initial state
const state = {
    all: []
}

// getters
const getters = {}

// actions
const actions = {
    getProducts({ commit }) {
        shop.getProducts(products => {
            commit('setProducts', products)
        })
    }
}

// mutations
const mutations = {
    setProducts(state, products) {
        state.all = products
    },

    decrementProductInventory(state, { id }) {
        const product = state.all.find(product => product.id === id)
        product.inventory--
    }
}

export default defineStore({
    state,
    getters,
    actions,
    mutations
}
