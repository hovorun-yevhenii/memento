<template>
    <div class="notes">
        <div class="list" ref="notes">
            <note-item v-for="(note, index) in notes"
                       :key="note.id"
                       :note="note"
                       :data-packery-id="index"
                       @calculateLayout="calculateLayout"/>
        </div>

        <modal-form>
            <note-item :fullViewMode="true" :note="noteToUpdate"></note-item>
        </modal-form>
    </div>
</template>

<script>
    import NoteItem from './NoteItem'
    import ModalForm from './ModalForm'
    import Packery from 'packery'
    import Draggabilly from 'draggabilly'
    import {mapGetters, mapMutations} from 'vuex'

    export default {
        name: 'NotesList',
        components: {
            NoteItem,
            ModalForm
        },
        data() {
            return {
                packery: null
            }
        },
        computed: {
            ...mapGetters({
                allNotes: 'getAllNotes',
                noteToUpdate: 'getNoteToUpdate',
                searchText: 'getSearchText'
            }),
            notes() {
              const match = this.searchText;

              if (!match) return this.allNotes;
              else return this.allNotes.filter(note => {
                return note.title.includes(match) || note.text.includes(match);
              })
            }
        },
        watch: {
            notes(list) {
                const mountedNotes = this.$refs.notes.children.length;
                const actualNotes = list.length;

                if (mountedNotes !== actualNotes) this.$nextTick(() => this.updateLayout());
            }
        },
        created() {
            this.getNotesFromLS();
            this.updateLayout();
        },

        methods: {
            ...mapMutations([
                'getNotesFromLS',
                'swapNotes'
            ]),
            updateLayout() {
                this.$nextTick(() => {
                    if (this.packery) this.packery.destroy();

                    this.packery = new Packery(this.$refs.notes, {
                        itemSelector: '.note',
                        columnWidth: 288,
                        gutter: 16,
                        transitionDuration: '0.25s'
                    });

                    this.packery.getItemElements().forEach(note => {
                        this.packery.bindDraggabillyEvents(new Draggabilly(note, {handle: '.drag'}));
                    });

                    this.packery.on('dragItemPositioned', note => this.onDragEnd(note));
                });
            },
            onDragEnd(note) {
                const from = note.element.dataset.packeryId;
                const to = this.packery.items.indexOf(note);

                this.swapNotes({from, to});
                this.$nextTick(() => this.packery.layout());
            },
            calculateLayout() {
                if (this.packery) this.packery.layout();
            }
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
    }
</style>
