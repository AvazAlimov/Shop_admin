<template lang="pug">
    v-layout(row wrap)
        v-flex(xs12)
            v-card.pa-4
                v-layout(row align-center)
                    v-btn.ma-0(icon to="/settings")
                        v-icon keyboard_backspace
                    .title.ml-2(v-if="!edit") Создать новый сезон
                    .title.ml-2(v-if="edit") Изменить сезон
                v-text-field.mt-4(v-model="name" label="Имя по умолчанию")
                div(v-for="translation in translations" :key="translation.code")
                    v-text-field(
                        v-model="translation.value"
                        :label="'Имя (' + constants.find(constant => constant.code == translation.code).name + ')'"
                    )
                img(v-if="url" :src="url" width="200")
                br
                input(type="file" @change="fileChanged" accept="image/*")
                v-card-actions
                    v-spacer
                    v-btn(flat color="primary" @click="create" :loading="loading" v-if="!edit") Создать
                    v-btn(flat color="primary" @click="update" :loading="loading" v-if="edit") Изменить
</template>

<script>
import Season from '../services/Season'
import Language from '../services/Language'
import Constants from '../assets/languages.json'

export default {
    name: 'Season',
    data () {
        return {
            edit: false,
            name: '',
            translations: [],
            languages: [],
            constants: Constants,
            url: '',
            file: null,
            loading: false
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
            return data
        }
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
                    Season.get(this.$route.params.id).then(season => {
                        this.name = season.default
                        Object.keys(season.name).forEach(key => {
                            this.translations.find(translation => translation.code === key).value = season.name[key]
                        })
                        this.url = season.photo
                    })
                }
            })
        },
        fileChanged (event) {
            this.file = event.target.files.length ? event.target.files[0] : null
        },
        create () {
            this.loading = true
            Season
                .create(this.formData)
                .then(season => {
                    this.$router.push('/settings')
                })
                .catch(error => console.log(error))
                .finally(() => (this.loading = false))
        },
        update () {
            this.loading = true
            Season
                .update(this.$route.params.id, this.formData)
                .then(season => {
                    this.$router.push('/settings')
                })
                .catch(error => console.log(error))
                .finally(() => (this.loading = false))
        }
    },
    created () {
        this.loadLanguages()
    }
}
</script>

<style scoped>
</style>
