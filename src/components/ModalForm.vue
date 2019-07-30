<template>
    <transition name="modal">
        <div v-if="isOpen"
             class="dialog"
             @mousedown.self="closeForm">
            <div class="dialog__body">
                <slot/>
            </div>
        </div>
    </transition>
</template>

<script>
    import NoteItem from './NoteItem'

    export default {
        name: 'ModalForm',
        components: {
            NoteItem
        },
        computed: {
            isOpen() {
                return this.$store.getters.modalFormIsOpen;
            }
        },
        methods: {
            closeForm() {
                this.$store.commit('closeForm');
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../style/variables';

    .dialog {
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
        }
    }

    .modal-enter-active,
    .modal-leave-active {
        transform: scale(1);
        opacity: 1;
    }

    .modal-enter,
    .modal-leave-to {
        transform: scale(1.2);
        opacity: 0;
    }
</style>
