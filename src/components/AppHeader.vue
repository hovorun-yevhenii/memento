<template>
    <div class="header">
        <app-icon big type="add" @click="openForm" class="header__add"/>

        <search-input/>

        <div class="header__controls">
            <template v-if="thereIsCheckedNotes">
                <color-input big @change="changeNotesColor"/>
                <app-icon big type="delete" @click="deleteSelectedNotes"/>
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
                'thereIsCheckedNotes'
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
        align-items: center;
        justify-content: center;

        border-bottom: 1px solid $border-color;
        padding: 32px;

        &__add {
            min-width: 48px;
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
