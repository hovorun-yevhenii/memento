<template>
    <div class="icon"
         :class="{'big': big, 'drag': type === 'drag', 'disabled': disabled}"
         @click="$emit('click')">
        <svg xmlns="http://www.w3.org/2000/svg"
             width="100%"
             viewBox="0 0 24 24">
            <path v-if="type === 'add'" d="M13 11h-2v3H8v2h3v3h2v-3h3v-2h-3zm1-9H6c-1.1 0-2 .9-2
              2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"></path>
            <path v-if="type === 'edit'" d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3
                  c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83
                  c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19
                  L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"></path>
            <path v-if="type === 'drag'" d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z
                  m-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2
                  s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z
                  m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2
                  s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
            <path v-if="type === 'color'" d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 c.83 0 1.5-.67
                  1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5
                  H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5
                  S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5
                  S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0 c-.83 0-1.5-.67-1.5-1.5S13.67
                  5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8z m3 4c-.83 0-1.5-.67-1.5-1.5S16.67
                  9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path>
            <path v-if="type === 'image'" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14
                  c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-1.96-2.36
                  L6.5 17h11l-3.54-4.71z"></path>
            <path v-if="type === 'save'" d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14
                  c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3
                  s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"></path>
            <path v-if="type === 'delete'" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2
                  V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"></path>
            <path v-if="type === 'list'" d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14
                  v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"></path>
            <path v-if="type === 'text'" d="M5 17v2h14v-2H5zm4.5-4.2h5l.9 2.2h2.1L12.75 4
                  h-1.5L6.5 15h2.1l.9-2.2zM12 5.98L13.87 11h-3.74L12 5.98z"></path>
            <path v-if="type === 'checked'" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10
                  S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
            <path v-if="type === 'check'" d="M16.59 7.58L10 14.17l-3.59-3.58L5 12l5 5 8-8z
                  M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z
                  m0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
            <path v-if="type === 'clear'" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59
                  12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
            <path v-if="type === 'pin'" d="M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18
                  V14L16,12M8.8,14L10,12.8V4H14V12.8L15.2,14H8.8Z"></path>
            <path v-if="type === 'pined'" d="M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22
                  H12.8V16H18V14L16,12Z"></path>
        </svg>
        <slot/>
    </div>
</template>

<script>
export default {
  props: {
    big: {
      type: Boolean,
      required: false,
    },
    type: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  name: 'AppIcon',
};
</script>

<style lang="scss" scoped>
    @import "../style/variables";

    .icon {
        width: 24px;
        height: 24px;
        cursor: pointer;
        transition: .2s;
        opacity: .5;
        user-select: none;

        &.big {
            min-width: 48px;
            min-height: 48px;
        }

        &.drag {
            cursor: move;
        }

        &.disabled {
            pointer-events: none;

            svg {
                fill: $main-dark;
            }
        }

        &:hover {
            opacity: 1;
        }
    }

    svg {
        fill: $main-text;
    }
</style>
