<template lang="pug">
    v-card
        v-card-title.pl-4.mb-0.pb-0
            .title Сезоны
            v-spacer
            v-btn(icon to="/season")
                v-icon add
        v-card-text.pt-0.mt-0
            v-list-tile(v-for="season in seasons" :key="season.id" avatar)
                v-list-tile-avatar
                    v-icon schedule
                v-list-tile-content
                    v-list-tile-title
                        strong {{ season.default }}
                    v-list-tile-sub-title
                        span.mr-3(v-for="key in Object.keys(season.name)") {{ season.name[key] }}
                v-list-tile-action
                    v-layout(row)
                        v-btn(icon)
                            v-icon(color="green") edit
                        v-spacer
                        v-btn(icon)
                            v-icon(color="red" @click="remove(season.id)") close
</template>

<script>
import Season from '../services/Season'

export default {
    name: 'Seasons',
    data () {
        return {
            seasons: []
        }
    },
    methods: {
        load () {
            Season.getAll().then(seasons => (this.seasons = seasons))
        },
        remove (id) {
            Season.remove(id).then(() => this.load())
        }
    },
    created () {
        this.load()
    }
}
</script>

<style scoped>
</style>
