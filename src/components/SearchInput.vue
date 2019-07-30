<template>
    <div class="search">
        <input v-model="searchText"
               placeholder="search by note content"
               spellcheck="false"
               class="search__input text">

        <app-icon v-if="searchText"
                  @click="clearText"
                  type="clear"
                  class="search__clear"/>
    </div>
</template>

<script>
    import AppIcon from './AppIcon'

    export default {
        name: 'SearchInput',
        components: {
            AppIcon
        },
        data() {
            return {
                searchText: ''
            }
        },
        watch: {
            searchText(text) {
                this.$store.commit('setSearchText', text);
            }
        },
        methods: {
            clearText() {
                this.searchText = '';
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../style/variables";

    .search {
        position: relative;
        margin: 16px 32px;
        width: 236px;

        &__input {
            width: 100%;
            padding: 8px;
            margin-right: 8px;
            border: 1px solid $default-bg;
            border-radius: 4px;
            background-color: transparent;
            transition: .2s;
            box-sizing: border-box;

            &:focus {
                outline: none;
                border: 1px solid $border-color;
            }
        }

        &__clear {
            position: absolute;
            right: 8px;
            top: 0;
            bottom: 0;
            margin: auto;
        }
    }
</style>
