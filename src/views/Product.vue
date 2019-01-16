<template lang="pug">
    v-layout(row wrap)
        v-flex(xs12)
            v-card.pa-4
                v-layout(row align-center)
                    v-btn.ma-0(icon to="/products")
                        v-icon keyboard_backspace
                    .title.ml-2(v-if="!edit") Создать новый продукт
                    .title.ml-2(v-if="edit") Изменить продукт
                v-text-field.mt-4(v-model="name" label="Имя по умолчанию")

                //- Default Name
                .title.mt-4 Имя
                div(v-for="translation in translations" :key="`translation_${translation.code}`")
                    v-text-field(
                        v-model="translation.value"
                        :label="constants.find(constant => constant.code == translation.code).name"
                    )

                //- Name Translations
                .title.mt-4 Описание
                div(v-for="description in descriptions" :key="`description_${description.code}`")
                    v-textarea(
                        v-model="description.value"
                        :label="constants.find(constant => constant.code == description.code).name"
                    )

                //- Descriptions
                .title.mt-4 Бренд
                v-combobox(
                        v-model="brand"
                        :items="brands"
                        label="Поиск"
                        item-text="name"
                        clearable)

                //- Seasons
                .title.mt-4 Сезон
                v-combobox(
                        v-model="season"
                        :items="seasons"
                        label="Поиск"
                        item-text="default"
                        clearable)

                //- Categories
                .title.mt-4 Категория
                v-combobox(
                        v-model="category"
                        :items="categories"
                        label="Поиск"
                        item-text="default"
                        clearable)

                //- Collections
                .title.mt-4 Коллекция
                v-combobox(
                        v-model="collection"
                        :items="collections"
                        label="Поиск"
                        item-text="default"
                        clearable)

                //- Photos
                .title.mt-4 Картинки
                div(v-if="urls")
                    img(v-for="url in urls" :src="url" width="200")
                br
                input(type="file" @change="fileChanged" accept="image/*" multiple)

                v-card-actions
                    v-spacer
                    v-btn(flat color="primary" @click="create" :loading="loading" v-if="!edit") Создать
                    v-btn(flat color="primary" @click="update" :loading="loading" v-if="edit") Изменить
</template>

<script>
import Product from '../services/Product'
import Brand from '../services/Brand'
import Season from '../services/Season'
import Category from '../services/Category'
import Collection from '../services/Collection'
import Language from '../services/Language'
import Constants from '../assets/languages.json'

export default {
    name: 'Product',
    data () {
        return {
            loading: false,
            edit: false,
            name: '',
            translations: [],
            descriptions: [],
            languages: [],
            constants: Constants,
            brands: [],
            brand: null,
            seasons: [],
            season: null,
            categories: [],
            category: null,
            collections: [],
            collection: null,
            urls: [],
            file: null
        }
    },
    computed: {
        formData () {
            const data = new FormData()
            data.set('default', this.name)
            this.translations.forEach(translation => {
                data.set(`translations[${[translation.code]}]`, translation.value)
            })
            this.descriptions.forEach(description => {
                data.set(`descriptions[${[description.code]}]`, description.value)
            })
            if (this.brand) {
                data.set('brand', this.brand.id)
            }
            if (this.season) {
                data.set('season', this.season.id)
            }
            if (this.category) {
                data.set('category', this.category.id)
            }
            if (this.collection) {
                data.set('collection', this.collection.id)
            }
            if (this.file && this.file.length) {
                for (let i = 0; i < this.file.length; i++) {
                    data.set(`photo[${i}]`, this.file[i])
                }
            }
            return data
        }
    },
    created () {
        this.loadLanguages()
    },
    methods: {
        loadLanguages () {
            Language.getAll().then(codes => {
                codes.forEach(code => this.translations.push({
                    code: code,
                    value: ''
                }))

                codes.forEach(code => this.descriptions.push({
                    code: code,
                    value: ''
                }))

                Brand.getAll().then(brands => {
                    this.brands = brands
                })

                Season.getAll().then(seasons => {
                    this.seasons = seasons
                })

                Category.getAll().then(categories => {
                    this.categories = categories
                })

                Collection.getAll().then(collections => {
                    this.collections = collections
                })

                if (this.$route.params.id) {
                    this.edit = true
                    Product.get(this.$route.params.id).then(product => {
                        this.name = product.default
                        Object.keys(product.name).forEach(key => {
                            this.translations.find(translation => translation.code === key).value = product.name[key]
                        })
                        Object.keys(product.description).forEach(key => {
                            this.descriptions.find(description => description.code === key).value = product.description[key]
                        })
                        this.brand = product.brand
                        this.season = product.season
                        this.category = product.category
                        this.collection = product.collection
                        this.urls = product.photo
                    })
                }
            })
        },
        fileChanged (event) {
            this.file = event.target.files
        },
        create () {
            this.loading = true
            Product
                .create(this.formData)
                .then(collection => {
                    this.$router.push('/products')
                })
                .catch(error => console.log(error))
                .finally(() => (this.loading = false))
        },
        update () {
            this.loading = true
            Product
                .update(this.$route.params.id, this.formData)
                .then(collection => {
                    this.$router.push('/products')
                })
                .catch(error => console.log(error))
                .finally(() => (this.loading = false))
        }
    }
}
</script>

<style scoped>

</style>
