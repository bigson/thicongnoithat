import shop from '@/api/products'

export default defineStore({
    state : () => {
        return {
            all: []
        }
    },
    actions : {
        getProducts({ commit }) {
            let response = shop.getProducts(),
                data     = response.data.data

            this.all = data
        },
        decrementProductInventory({ id }) {
            const product = this.all.find(product => product.id === id)
            product.inventory--
        }
    },
}
