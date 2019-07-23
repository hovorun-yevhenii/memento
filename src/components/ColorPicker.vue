<template>
  <transition name="picker">
    <div class="picker">
      <div class="color"
           v-for="(hex, name) in colors"
           :style="'background-color: var(--' + name + ')'"
           @click="$emit('change', name)">
      </div>
    </div>
  </transition>
</template>

<script>
    import colors from '../colorConfig'

    export default {
        name: "ColorPicker",
        data() {
            return {
                colors
            }
        }
    }
</script>

<style lang="scss" scoped>
  @import "../style/variables";

  .picker {
    position: absolute;
    width: 128px;
    padding: 4px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background-color: $main-dark;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    cursor: default;
    transition: .2s;
    transform: translateY(calc(-100% - 24px));
    transform-origin: 0 100%;
    z-index: 2;

    .color {
      width: 22px;
      height: 22px;
      margin: 2px;
      border-radius: 50%;
      border: 1px solid $border-color;
      cursor: pointer;
      transition: .2s;

      &:hover {
        border: 1px solid lighten($border-color, 20%);
      }
    }
  }

  .picker-enter-active,
  .picker-leave-active {
    opacity: 1;
  }

  .picker-enter,
  .picker-leave-to {
    opacity: 0;
  }
</style>
