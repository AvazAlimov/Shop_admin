<template lang="pug">
    v-layout(row wrap)
        v-flex(xs12)
            v-card.pa-4
                v-layout(row align-center)
                    v-btn.ma-0(icon to="/brands")
                        v-icon keyboard_backspace
                    .title.ml-2(v-if="!edit") Создать новый бренд
                    .title.ml-2(v-if="edit") Изменить бренд
                v-text-field.mt-4(v-model="name" label="Имя по умолчанию")
                img(v-if="url" :src="url" width="200")
                br
                input(type="file" @change="fileChanged" accept="image/*")
                v-card-actions
                    v-spacer
                    v-btn(flat color="primary" @click="create" :loading="loading" v-if="!edit") Создать
                    v-btn(flat color="primary" @click="update" :loading="loading" v-if="edit") Изменить
</template>

<script>
import Brand from '../services/Brand'

export default {
    name: 'Brand',
    data () {
        return {
            edit: false,
            loading: false,
            name: '',
            file: null,
            url: ''
        }
    },
    computed: {
        formData () {
            const data = new FormData()
            data.set('name', this.name)
            if (this.file) {
                data.set('logo', this.file)
            }
            return data
        }
    },
    created () {
        if (this.$route.params.id) {
            this.edit = true
            Brand.get(this.$route.params.id).then(brand => {
                this.name = brand.name
                this.url = brand.logo
            })
        }
    },
    methods: {
        fileChanged (event) {
            this.file = event.target.files.length ? event.target.files[0] : null
        },

        create () {
            this.loading = true
            Brand
                .create(this.formData)
                .then(brand => {
                    this.$router.push('/brands')
                })
                .catch(error => console.log(error))
                .finally(() => (this.loading = false))
        },

        update () {
            this.loading = true
            Brand
                .update(this.$route.params.id, this.formData)
                .then(brand => {
                    this.$router.push('/brands')
                })
                .catch(error => console.log(error))
                .finally(() => (this.loading = false))
        }
    }
}
</script>

<style scoped>
</style>
