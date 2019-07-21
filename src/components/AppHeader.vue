<template>
  <div class="header">
    <app-button big type="add" @click="openModalForm"/>
  </div>
</template>

<script>
    import AppButton from './AppButton'

    export default {
        name: "AppHeader",
        components: {
            AppButton
        },
        methods: {
            openModalForm() {
                this.$store.dispatch('openModalForm')
            }
        }
    }
</script>

<style lang="scss" scoped>
  @import '../style/variables';

  .header {
    border-bottom: 1px solid $border-color;
    padding: 32px;
  }
</style>
