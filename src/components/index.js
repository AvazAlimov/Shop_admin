import Vue from 'vue'
import Categories from './Categories.vue'
import Languages from './Languages.vue'
import Seasons from './Seasons.vue'

const Components = {
    Categories,
    Languages,
    Seasons
}

Object.keys(Components).forEach((name) => {
    Vue.component(name, Components[name])
})

export default Components
