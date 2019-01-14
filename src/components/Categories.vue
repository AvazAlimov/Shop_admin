<template lang="pug">
    v-card
        v-card-title.pl-4.mb-0.pb-0
            .title Категории
            v-spacer
            v-btn(icon to="/category")
                v-icon add
        v-card-text.pt-0.mt-0
            v-treeview(
                :items="items"
                transition
                item-text="default"
                selected-color="primary"
                on-icon="bookmark"
                off-icon="bookmark_border")
                template(slot="append" slot-scope="{ item, open, leaf }" v-if="leaf")
                    v-btn.mr-0(flat icon color="green" small :to="'/category/' + item.id")
                        v-icon(small) edit
                    v-btn.ml-0(flat icon color="red" small @click="remove(item.id)")
                        v-icon(small) close
</template>

<script>
import Category from '../services/Category'

export default {
    name: 'Categories',
    data () {
        return {
            categories: [],
            items: []
        }
    },
    methods: {
        load () {
            Category.getAll().then(categories => {
                this.categories = categories
                this.items = this.construct(categories)
            })
        },
        construct (categories) {
            // bind children to parents
            categories.forEach(category => {
                if (category.parent) {
                    const parentId = category.parent
                    const parentCategory = categories.find((parent) => parent.id === parentId)
                    if (parentCategory) {
                        if (!parentCategory.children) {
                            parentCategory.children = []
                        }
                        parentCategory.children.push(category)
                    }
                }
            })

            // normalize for tree view items
            const result = categories.filter(category => {
                return category.parent === null
            })
            return result
        },
        remove (id) {
            if (confirm('Вы уверены, что хотите удалить это?')) {
                Category.remove(id).then(() => this.load())
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
