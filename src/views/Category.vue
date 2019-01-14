<template lang="pug">
    v-layout(row wrap)
        v-flex(xs12)
            v-card.pa-4
                v-layout(row align-center)
                    v-btn.ma-0(icon to="/settings")
                        v-icon keyboard_backspace
                    .title.ml-2(v-if="!edit") Создать новую категорию
                    .title.ml-2(v-if="edit") Изменить категорию
                v-text-field.mt-4(v-model="name" label="Имя по умолчанию")
                div(v-for="translation in translations" :key="translation.code")
                    v-text-field(
                        v-model="translation.value"
                        :label="'Имя (' + constants.find(constant => constant.code == translation.code).name + ')'"
                    )
                v-combobox(
                        v-model="parent"
                        :items="categories"
                        label="Принадлежит к ..."
                        item-text="default"
                        clearable)
                img(v-if="url" :src="url" width="200")
                br
                input(type="file" @change="fileChanged" accept="image/*")
                v-card-actions
                    v-spacer
                    v-btn(flat color="primary" @click="create" :loading="loading" v-if="!edit") Создать
                    v-btn(flat color="primary" @click="update" :loading="loading" v-if="edit") Изменить
</template>

<script>
import Category from '../services/Category'
import Language from '../services/Language'
import Constants from '../assets/languages.json'

export default {
    name: 'Category',
    data () {
        return {
            loading: false,
            constants: Constants,
            translations: [],
            languages: [],
            file: null,
            url: '',
            name: '',
            categories: [],
            parent: null,
            edit: false
        }
    },
    computed: {
        formData () {
            const data = new FormData()
            data.set('default', this.name)
            this.translations.forEach(translation => {
                data.set('translations[' + [translation.code] + ']', translation.value)
            })
            if (this.file) {
                data.set('photo', this.file)
            }
            if (this.parent) {
                data.set('parent', this.parent.id)
            }
            return data
        }
    },
    created () {
        Category.getAll().then(categories => {
            this.categories = categories

            Language.getAll().then(codes => {
                codes.forEach(code => this.translations.push({
                    code: code,
                    value: ''
                }))

                if (this.$route.params.id) {
                    this.edit = true
                    Category.get(this.$route.params.id).then(category => {
                        this.name = category.default
                        Object.keys(category.name).forEach(key => {
                            this.translations.find(translation => translation.code === key).value = category.name[key]
                        })
                        this.url = category.photo
                        if (category.parent) {
                            this.parent = this.categories.find(item => item.id === category.parent)
                        }
                    })
                }
            })
        })
    },
    methods: {
        fileChanged (event) {
            this.file = event.target.files.length ? event.target.files[0] : null
        },
        create () {
            this.loading = true
            Category
                .create(this.formData)
                .then(season => {
                    this.$router.push('/settings')
                })
                .catch(error => console.log(error))
                .finally(() => (this.loading = false))
        },
        update () {
            this.loading = true
            Category
                .update(this.$route.params.id, this.formData)
                .then(season => {
                    this.$router.push('/settings')
                })
                .catch(error => console.log(error))
                .finally(() => (this.loading = false))
        }
    }
}
</script>

<style scoped>

</style>
