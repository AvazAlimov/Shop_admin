<template lang="pug">
    v-layout(row wrap)
        v-flex(xs12)
            v-card
                v-card-title.pl-4.mb-0.pb-0
                    .title Товары: {{ products.length }}
                    v-spacer
                    v-btn(icon to="/product")
                        v-icon add
                v-card-text.pt-0.mt-0
                    v-list
                        v-list-tile(avatar v-for="product in products")
                            v-list-tile-avatar
                                img(:src="product.photo[0]")
                            v-list-tile-content
                                v-list-tile-title(v-html="product.default")
                            v-list-tile-action
                                v-layout(row wrap justify-end)
                                    v-btn.mr-2(icon flat color="green" :to="'/product/' + product.id")
                                        v-icon edit
                                    v-btn(icon flat color="red" @click="remove(product.id)")
                                        v-icon close
</template>

<script>
import Product from '../services/Product'

export default {
    name: 'Products',
    data () {
        return {
            products: []
        }
    },
    created () {
        this.load()
    },
    methods: {
        load () {
            Product.getAll().then(products => {
                this.products = products
            })
        },

        remove (id) {
            if (confirm('Вы уверены, что хотите удалить это?')) {
                Product.remove(id).then(() => this.load())
            }
        }
    }
}
</script>

<style scoped>
</style>
