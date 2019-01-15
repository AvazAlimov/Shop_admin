<template lang="pug">
    v-layout(row wrap)
        v-flex(xs12)
            v-card.pa-4
                v-layout(row align-center)
                    v-btn.ma-0(icon to="/collections")
                        v-icon keyboard_backspace
                    .title.ml-2(v-if="!edit") Создать новую коллекцию
                    .title.ml-2(v-if="edit") Изменить коллекцию
                v-text-field.mt-4(v-model="name" label="Имя по умолчанию")
                div(v-for="translation in translations" :key="translation.code")
                    v-text-field(
                        v-model="translation.value"
                        :label="'Имя (' + constants.find(constant => constant.code == translation.code).name + ')'"
                    )
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
import Collection from '../services/Collection'
import Language from '../services/Language'
import Constants from '../assets/languages.json'

export default {
    name: 'Collection',
    data () {
        return {
            loading: false,
            edit: false,
            name: '',
            translations: [],
            languages: [],
            constants: Constants,
            urls: '',
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
                if (this.$route.params.id) {
                    this.edit = true
                    Collection.get(this.$route.params.id).then(collection => {
                        this.name = collection.default
                        Object.keys(collection.name).forEach(key => {
                            this.translations.find(translation => translation.code === key).value = collection.name[key]
                        })
                        this.urls = collection.photo
                    })
                }
            })
        },
        fileChanged (event) {
            this.file = event.target.files
        },
        create () {
            this.loading = true
            Collection
                .create(this.formData)
                .then(collection => {
                    this.$router.push('/collections')
                })
                .catch(error => console.log(error))
                .finally(() => (this.loading = false))
        },
        update () {
            this.loading = true
            Collection
                .update(this.$route.params.id, this.formData)
                .then(collection => {
                    this.$router.push('/collections')
                })
                .catch(error => console.log(error))
                .finally(() => (this.loading = false))
        }
    }
}
</script>

<style scoped>
</style>
