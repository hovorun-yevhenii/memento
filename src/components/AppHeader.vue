<template>
    <div class="header">
        <app-icon type="add"
                  big
                  @click="openForm"
                  class="header__add"/>

        <search-input v-if="getAllNotes.length"/>

        <div v-if="getAllNotes.length"
             class="header__controls">
            <template v-if="thereAreCheckedNotes">
                <color-input big
                             @change="changeNotesColor"/>
                <app-icon type="delete"
                          big
                          @click="deleteCheckedNotes"/>
            </template>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import AppIcon from './AppIcon.vue';
import ColorInput from './ColorInput.vue';
import SearchInput from './SearchInput.vue';

export default {
  name: 'AppHeader',
  components: {
    AppIcon,
    ColorInput,
    SearchInput,
  },
  computed: {
    ...mapGetters([
      'thereAreCheckedNotes',
      'getAllNotes',
    ]),
  },
  methods: {
    ...mapMutations([
      'openForm',
      'changeNotesColor',
      'deleteCheckedNotes',
    ]),
  },
};
</script>

<style lang="scss" scoped>
    @import '../style/variables';

    .header {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        padding: 16px;
        border-bottom: 1px solid $border-color;

        &__add {
            width: 48px;
        }

        &__controls {
            display: flex;
            justify-content: space-between;
            width: 120px;
            padding: 0 8px;
            z-index: 1;
        }
    }
</style>
