<template>
  <textarea ref="textarea"
            :value="value"
            @input="changeHandler"
            :placeholder="placeholder">
  </textarea>
</template>

<script>
    export default {
        name: "AppTextarea",
        props: {
            value: {
                placeholder: {
                    type: String,
                    default: ''
                }
            },
            placeholder: {
                type: String,
                default: 'Введите текст'
            }
        },
        mounted() {
            this.fitHeight();
        },
        methods: {
            fitHeight() {
                const area = this.$refs.textarea;

                if (area.scrollHeight > area.offsetHeight) area.style.height = `${area.scrollHeight}px`;
            },
            changeHandler(event) {
                this.fitHeight();
                this.$emit('change', event.target.value);
            }
        }
    }
</script>

<style lang="scss" scoped>
  @import "../style/variables";

  textarea {
    display: block;
    width: 100%;
    margin-bottom: 8px;
    background-color: transparent;
    resize: none;
    cursor: default;

    &, &:focus {
      outline: none;
      border: none;
    }
  }
</style>
