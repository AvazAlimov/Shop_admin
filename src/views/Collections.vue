<template lang="pug">
    v-layout(row wrap)
        v-flex(xs12)
            v-card
                v-card-title.pl-4.mb-0.pb-0
                    .title Коллекции: {{ collections.length }}
                    v-spacer
                    v-btn(icon to="/collection")
                        v-icon add
                v-card-text.pt-0.mt-0
                    v-list
                        v-list-tile(avatar v-for="collection in collections")
                            v-list-tile-avatar
                                img(:src="collection.photo[0]" v-if="collection.photo && collection.photo.length")
                                img(src="../assets/favicon.ico" v-if="!(collection.photo && collection.photo.length)")
                            v-list-tile-content
                                v-list-tile-title(v-html="collection.default")
                            v-list-tile-action
                                v-layout(row wrap justify-end)
                                    v-btn.mr-2(icon flat color="green" :to="'/collection/' + collection.id")
                                        v-icon edit
                                    v-btn(icon flat color="red" @click="remove(collection.id)")
                                        v-icon close
</template>

<script>
import Collection from '../services/Collection'

export default {
    name: 'Collections',
    data () {
        return {
            collections: []
        }
    },
    created () {
        this.load()
    },
    methods: {
        load () {
            Collection.getAll().then(collections => {
                this.collections = collections
            })
        },

        remove (id) {
            if (confirm('Вы уверены, что хотите удалить это?')) {
                Collection.remove(id).then(() => this.load())
            }
        }
    }
}
</script>

<style scoped>

</style>
