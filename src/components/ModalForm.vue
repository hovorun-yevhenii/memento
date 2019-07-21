<template>
  <transition name="modal">
    <div v-if="isOpen" class="modal" @click.self="closeForm">
      <div class="modal__body">
        <slot/>
      </div>
    </div>
  </transition>
</template>

<script>
  import NoteItem from './NoteItem'
    import {mapGetters} from 'vuex'

    export default {
        name: 'ModalForm',
        components: {
            NoteItem
        },
        computed: {
            ...mapGetters({
                isOpen: 'modalFormIsOpen'
            })
        },
        methods: {
            closeForm() {
                this.$store.dispatch('closeModalForm');
            }
        }
    }
</script>

<style lang="scss" scoped>
  @import '../style/variables';

  .modal {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    padding: 16px;
    background-color: rgba($main-dark, .7);
    transition: 0.2s;
    overflow-y: auto;

    &__body {
      position: relative;
      max-width: 520px;
      width: 100%;
      margin: auto;
      box-sizing: border-box;
      border-radius: 8px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, .2);

      .btn {
        margin-top: 50px;
      }
    }

    &__close-button {
      position: absolute;
      top: -46px;
      right: -46px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 46px;
      height: 46px;
      border-radius: 50%;
      cursor: pointer;
    }
  }

  .modal-enter-active,
  .modal-leave-active {
    transform: scale(1);
    opacity: 1;
  }

  .modal-enter,
  .modal-leave-to {
    transform: scale(.5);
    opacity: 0;
  }
</style>
