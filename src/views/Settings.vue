<template lang="pug">
    v-layout(row wrap)
        v-flex(xs12)
            languages
        v-flex(xs12)
            seasons
</template>

<script>
import Languages from '../components/Languages'
import Seasons from '../components/Seasons'

export default {
    name: 'Settings',
    components: {
        languages: Languages,
        seasons: Seasons
    }
}
</script>

<style scoped>
</style>
