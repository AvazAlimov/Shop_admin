<template lang="pug">
    v-layout(row wrap)
        v-flex(xs12 sm6 md4)
            v-card.pa-4(to="/brands")
                v-layout(row align-center)
                    v-icon(medium) star
                    .title.ml-3 Бренды
                    v-spacer
                    .title {{ brands.length }}
        v-flex(xs12 sm6 md4)
            v-card.pa-4(to="/collections")
                v-layout(row align-center)
                    v-icon(medium) collections
                    .title.ml-3 Коллекции
                    v-spacer
                    .title {{ collections.length }}
        v-flex(xs12 sm6 md4)
            v-card.pa-4(to="products")
                v-layout(row align-center)
                    v-icon(medium) redeem
                    .title.ml-3 Товары
                    v-spacer
                    .title {{ products.length }}
</template>

<script>
import Brand from '../services/Brand'
import Product from '../services/Product'
import Collection from '../services/Collection'

export default {
    name: 'Home',
    data () {
        return {
            brands: [],
            collections: [],
            products: []
        }
    },
    created () {
        Brand.getAll().then(brands => { this.brands = brands })
        Product.getAll().then(products => { this.products = products })
        Collection.getAll().then(collections => { this.collections = collections })
    }
}
</script>

<style scoped>
</style>
