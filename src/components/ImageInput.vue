<template>
    <label>
        <app-button type="image"/>
        <input type="file" accept="image/*" @change="readImage">
    </label>
</template>

<script>
    import AppButton from './AppIcon'

    export default {
        name: "ImageInput",
        components: {
            AppButton
        },
        methods: {
            readImage({target: input}) {
                if (input.files && input.files[0]) {
                    const reader = new FileReader();

                    reader.onload = ({target}) => this.$emit('change', target.result);
                    reader.readAsDataURL(input.files[0]);
                }
            }
        }
    }
</script>

<style scoped>
    [type='file'] {
        display: none;
    }
</style>
