<template lang="pug">
    v-card
        v-card-title.pl-4.mb-0.pb-0
            .title Языки
            v-spacer
            v-btn(icon @click="dialog=true")
                v-icon add
        v-card-text.pt-0.mt-0
            v-list-tile(v-for="code in languages" :key="code" avatar)
                v-list-tile-avatar
                    v-icon flag
                v-list-tile-content
                    v-list-tile-title {{ constants.find(function(item) { return item.code == code }).name }}
                v-list-tile-action
                    v-btn(icon @click="remove(code)" small)
                        v-icon(color="red" small) close
        v-dialog(v-model="dialog" fixed width="500")
            v-card.pa-2
                v-card-title
                    .title Добавить язык
                v-card-text.pt-0.mt-0
                    v-list-tile(v-for="language in constants" :key="language.code" avatar)
                        v-list-tile-avatar
                            v-icon flag
                        v-list-tile-content
                            v-list-tile-title {{ language.name }}
                        v-list-tile-action
                            v-icon(color="green" v-if="languages.includes(language.code)") check
                            v-btn(icon v-if="!languages.includes(language.code)" @click="create(language.code)")
                                v-icon add
</template>

<script>
import Language from '../services/Language'
import Constants from '../assets/languages.json'

export default {
    name: 'Language',
    data () {
        return {
            dialog: false,
            languages: [],
            constants: Constants
        }
    },
    methods: {
        load () {
            Language.getAll().then(languages => { (this.languages = languages) })
        },
        create (code) {
            Language.create({ code }).then(language => {
                this.dialog = false
                this.load()
            })
        },
        remove (code) {
            if (confirm('Все переводы этого языка будут удалены')) {
                Language.remove(code).then(() => this.load())
            }
        }
    },
    created () {
        this.load()
    }
}
</script>

<style scoped>
</style>
