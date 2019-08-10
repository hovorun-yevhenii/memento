<template>
    <div class="notes">
        <template v-if="showPinnedNotes">
            <div v-if="showUnPinnedNotes"
                 class="notes__heading">
                Pinned notes
            </div>
            <masonry-layout :notes="pinnedNotes"/>
        </template>

        <template v-if="showUnPinnedNotes">
            <div v-if="showPinnedNotes"
                 class="notes__heading">
                Unpinned notes
            </div>
            <masonry-layout :notes="unpinnedNotes"/>
        </template>

        <template v-if="searchText">
            <div v-if="matchedNotes.length"
                 class="notes__heading">
                Matched notes
            </div>
            <div v-if="!matchedNotes.length"
                 class="notes__heading">
                No matches
            </div>
            <masonry-layout :notes="matchedNotes"/>
        </template>

        <div v-if="!allNotes.length"
             class="notes__placeholder">
            <p class="text">You haven't notes</p>
            <p class="heading">start using <span class="app-name">Memento</span></p>
            <p class="text">click the button above</p>
        </div>

        <modal-form>
            <note-item :fullViewMode="true"
                       :note="noteToUpdate"/>
        </modal-form>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import NoteItem from './NoteItem.vue';
import ModalForm from './ModalForm.vue';
import MasonryLayout from './MasonryLayout.vue';

export default {
  name: 'NotesList',
  components: {
    MasonryLayout,
    NoteItem,
    ModalForm,
  },
  computed: {
    ...mapGetters({
      allNotes: 'getAllNotes',
      noteToUpdate: 'getNoteToUpdate',
      searchText: 'getSearchText',
    }),
    pinnedNotes() {
      return this.allNotes.filter(note => note.pinned);
    },
    unpinnedNotes() {
      return this.allNotes.filter(note => !note.pinned);
    },
    matchedNotes() {
      const query = this.searchText;
      const matches = ({ title, text }) => title.includes(query) || text.includes(query);

      return this.allNotes.filter(matches);
    },
    showPinnedNotes() {
      return this.pinnedNotes.length && !this.searchText;
    },
    showUnPinnedNotes() {
      return this.unpinnedNotes.length && !this.searchText;
    },
  },

  created() {
    this.$store.commit('getNotesFromLS');
  },
};
</script>

<style lang="scss" scoped>
    @import '../style/variables';

    .notes {
        max-width: 1200px;
        min-height: calc(100vh - 150px);
        margin: 0 auto;
        padding: 16px;

        &__heading {
            margin-bottom: 16px;
        }

        &__placeholder {
            margin-top: 64px;
            text-align: center;

            .app-name {
                color: #ffd600;
            }
        }
    }
</style>
