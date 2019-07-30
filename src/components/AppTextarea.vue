<template>
  <textarea ref="textarea"
            @input="onInput"
            spellcheck="false"
            :value="value"
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
                default: 'Type text here'
            }
        },
        mounted() {
            this.fitHeight();
        },
        methods: {
            fitHeight() {
                const area = this.$refs.textarea;

                area.style.height = 'auto';
                area.style.height = `${area.scrollHeight}px`;
            },
            onInput(event) {
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
