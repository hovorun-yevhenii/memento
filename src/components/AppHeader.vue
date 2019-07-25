<template>
  <div class="header">
    <app-icon big type="add" @click="openForm"/>

    <div class="header__search">
      <input type="text">
    </div>

    <div v-if="checkedNotes" class="header__controls">
      <color-input @change="changeNotesColor"/>
      <app-icon type="delete" @click="deleteSelectedNotes"/>
    </div>
  </div>
</template>

<script>
    import AppIcon from './AppIcon'
    import ColorInput from './ColorInput'

    export default {
        name: "AppHeader",
        components: {
            AppIcon,
            ColorInput
        },
        computed: {
            checkedNotes() {
                return this.$store.getters.checkedNotes
            }
        },
        methods: {
            openForm() {
                this.$store.commit('openForm')
            },
            changeNotesColor(color) {
                this.$store.commit('changeNotesColor', color)
            },
            deleteSelectedNotes() {
                this.$store.commit('deleteSelectedNotes')
            }
        }
    }
</script>

<style lang="scss" scoped>
  @import '../style/variables';

  .header {
    display: flex;
    align-items: center;
    border-bottom: 1px solid $border-color;
    padding: 32px;

    &__controls {
      display: flex;
    }
  }
</style>
