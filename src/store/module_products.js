import { defineStore } from 'pinia'
import shop from '@/api/products'

export const useProductsStore = defineStore('products', {
    state : () => {
        return {
            all: []
        }
    },
    actions : {
        getProducts() {
            let response = shop.getProducts(),
                data     = response.data.data

            this.all = data
        },
        decrementProductInventory({ id }) {
            const product = this.all.find(product => product.id === id)
            product.inventory--
        }
    },
})
