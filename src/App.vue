<template>
    <div id="app">
        <app-header></app-header>
        <notes-list></notes-list>
    </div>
</template>

<script>
    import AppHeader from './components/AppHeader'
    import NotesList from './components/NotesList'

    export default {
        name: 'app',
        components: {
            AppHeader,
            NotesList
        },
        data() {
            return {}
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
