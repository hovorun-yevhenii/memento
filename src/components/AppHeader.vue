<template>
    <div class="header">
        <app-icon type="add"
                  big
                  @click="openForm"
                  class="header__add"/>

        <search-input v-if="getAllNotes.length"/>

        <div v-if="getAllNotes.length" class="header__controls">
            <template v-if="thereAreCheckedNotes">
                <color-input big
                             @change="changeNotesColor"/>
                <app-icon type="delete"
                          big
                          @click="deleteSelectedNotes"/>
            </template>
        </div>
    </div>
</template>

<script>
    import AppIcon from './AppIcon'
    import ColorInput from './ColorInput'
    import SearchInput from './SearchInput'
    import {mapGetters, mapMutations} from 'vuex'

    export default {
        name: "AppHeader",
        components: {
            AppIcon,
            ColorInput,
            SearchInput
        },
        computed: {
            ...mapGetters([
                'thereAreCheckedNotes',
                'getAllNotes'
            ])
        },
        methods: {
            ...mapMutations([
                'openForm',
                'changeNotesColor',
                'deleteSelectedNotes'
            ])
        }
    }
</script>

<style lang="scss" scoped>
    @import '../style/variables';

    .header {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid $border-color;
        padding: 16px;

        &__add {
            width: 48px;
        }

        &__controls {
            display: flex;
            justify-content: space-between;
            width: 120px;
            padding: 0 8px;
            z-index: 1;
        }
    }
</style>
