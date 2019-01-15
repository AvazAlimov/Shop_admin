<template lang="pug">
    v-layout(row wrap)
        v-flex(xs12)
            v-card
                v-card-title.pl-4.mb-0.pb-0
                    .title Бренды: {{ brands.length }}
                    v-spacer
                    v-btn(icon to="/brand")
                        v-icon add
                v-card-text.pt-0.mt-0
                    v-list
                        v-list-tile(avatar v-for="brand in brands")
                            v-list-tile-avatar
                                img(:src="brand.logo")
                            v-list-tile-content
                                v-list-tile-title(v-html="brand.name")
                            v-list-tile-action
                                v-layout(row wrap justify-end)
                                    v-btn.mr-2(icon flat color="green" :to="'/brand/' + brand.id")
                                        v-icon edit
                                    v-btn(icon flat color="red" @click="remove(brand.id)")
                                        v-icon close
</template>

<script>
import Brand from '../services/Brand'

export default {
    name: 'Brands',
    data () {
        return {
            brands: []
        }
    },
    created () {
        this.load()
    },
    methods: {
        load () {
            Brand.getAll().then(brands => {
                this.brands = brands
            })
        },

        remove (id) {
            if (confirm('Вы уверены, что хотите удалить это?')) {
                Brand.remove(id).then(() => this.load())
            }
        }
    }
}
</script>

<style scoped>

</style>
