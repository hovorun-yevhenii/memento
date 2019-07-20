<template>
    <transition name="modal">
        <div class="modal" @click.self="$emit('closeModalDialog')">
            <div class="modal__body">
                <button class="modal__close-button button" @click="$emit('closeModalDialog')">close</button>
                <slot/>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'ModalDialog'
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
        background-color: #20212475;
        transition: 0.2s;
        overflow-y: auto;

        &__body {
            position: relative;
            max-width: 645px;
            margin: auto;
            /*padding: 64px 80px 76px;*/
            box-sizing: border-box;
            border-radius: 8px;
            box-shadow: 0 4px 16px rgba(0,0,0,.2);

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
        opacity: 1;
    }

    .modal-enter,
    .modal-leave-to {
        opacity: 0;
    }
</style>
