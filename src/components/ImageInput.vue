<template>
    <label>
        <app-button type="image"/>

        <input type="file"
               accept="image/*"
               @change="readImage">
    </label>
</template>

<script>
import AppButton from './AppIcon.vue';

export default {
  name: 'ImageInput',
  components: {
    AppButton,
  },
  methods: {
    /* eslint no-param-reassign: ["error", { "props": false }] */
    readImage({ target: input }) {
      if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.readAsDataURL(input.files[0]);

        reader.onload = ({ target }) => {
          this.$emit('change', target.result);
          input.value = null;
        };
      }
    },
  },
};
</script>

<style scoped>
    [type='file'] {
        display: none;
    }
</style>
