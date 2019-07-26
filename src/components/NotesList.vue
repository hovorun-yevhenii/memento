<template>
    <div class="notes">
        <template v-if="showPinnedNotes">
            <div v-if="showUnPinnedNotes" class="heading">Pinned notes</div>
            <masonry-layout :notes="pinnedNotes"/>
        </template>

        <template v-if="showUnPinnedNotes">
            <div v-if="showPinnedNotes" class="heading">Unpinned notes</div>
            <masonry-layout :notes="unpinnedNotes"/>
        </template>

        <template v-if="searchText">
            <div v-if="matchedNotes.length" class="heading">Matched notes</div>
            <div v-if="!matchedNotes.length" class="heading">No matches</div>
            <masonry-layout :notes="matchedNotes"/>
        </template>

        <modal-form>
            <note-item :fullViewMode="true"
                       :note="noteToUpdate"/>
        </modal-form>
    </div>
</template>

<script>
    import NoteItem from './NoteItem'
    import ModalForm from './ModalForm'
    import MasonryLayout from './MasonryLayout'
    import {mapGetters} from 'vuex'

    export default {
        name: 'NotesList',
        components: {
            MasonryLayout,
            NoteItem,
            ModalForm
        },
        computed: {
            ...mapGetters({
                allNotes: 'getAllNotes',
                noteToUpdate: 'getNoteToUpdate',
                searchText: 'getSearchText'
            }),
            pinnedNotes() {
                return this.allNotes.filter(note => note.pinned);
            },
            unpinnedNotes() {
                return this.allNotes.filter(note => !note.pinned);
            },
            matchedNotes() {
              return this.allNotes.filter(note => {
                return note.title.includes(this.searchText) || note.text.includes(this.searchText);
              })
            },
            showPinnedNotes() {
                return this.pinnedNotes.length && !this.searchText;
            },
            onlyPinnedNotes() {
                return this.pinnedNotes.length && !this.unpinnedNotes.length;
            },
            showUnPinnedNotes() {
                return this.unpinnedNotes.length && !this.searchText;
            },
            onlyUnPinnedNotes() {
                return this.unpinnedNotes.length && !this.pinnedNotes.length;
            }
        },

        created() {
            this.$store.commit('getNotesFromLS');
        }
    }
</script>

<style lang="scss" scoped>
    @import '../style/variables';

    .notes {
        max-width: 1000px;
        min-height: calc(100vh - 150px);
        margin: 0 auto;
        padding: 16px;

        .heading {
            margin-bottom: 16px;
        }
    }
</style>
