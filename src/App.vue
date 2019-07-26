<template>
    <div id="app">
        <app-header/>
        <notes-list @click.native="uncheckNotes"/>
    </div>
</template>

<script>
    import AppHeader from './components/AppHeader'
    import NotesList from './components/NotesList'
    import colors from './colorConfig'

    export default {
        name: 'app',
        components: {
            AppHeader,
            NotesList
        },
        mounted() {
            Object.entries(colors).forEach(([name, hex]) => {
                this.$el.style.setProperty(`--${name}`, hex)
            });
        },
        methods: {
            uncheckNotes({target}) {
                const thereAreChecked = this.$store.getters.thereAreCheckedNotes;
                const targetClick = ['notes', 'layout'].includes(target.className);

                if (thereAreChecked && targetClick) this.$store.commit('uncheckNotes');
            }
        }
    }
</script>

<style lang="scss">
    @import 'style/global';

    [id='app'] {
        min-height: 100vh;
        background-color: $main-dark;
        color: $main-text;

        &, & * {
            font-family: $roboto;
            color: $main-text;
        }
    }
</style>
