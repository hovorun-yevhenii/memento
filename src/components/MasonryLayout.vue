<template>
    <div class="layout" ref="notes">
        <note-item v-for="(note, index) in notes"
                   :key="note.id"
                   :note="note"
                   :data-packery-index="index"
                   @calculateLayout="calculateLayout"/>
    </div>
</template>

<script>
    import Masonry from 'packery'
    import Draggable from 'draggabilly'
    import NoteItem from './NoteItem'

    export default {
        name: 'MasonryLayout',
        components: {
            NoteItem
        },
        props: {
          notes: {
              type: Array,
              default: []
          }
        },
        data() {
            return {
                masonry: null
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
            this.updateLayout();
        },
        methods: {
            updateLayout() {
                this.$nextTick(() => {
                    if (this.masonry) this.masonry.destroy();

                    this.masonry = new Masonry(this.$refs.notes, {
                        itemSelector: '.note',
                        columnWidth: 288,
                        gutter: 16,
                        transitionDuration: '0.25s'
                    });

                    this.masonry.getItemElements().forEach(note => {
                        this.masonry.bindDraggabillyEvents(new Draggable(note, {handle: '.drag'}));
                    });

                    this.masonry.on('dragItemPositioned', note => this.onDragEnd(note));
                });
            },
            onDragEnd(note) {
                const from = note.element.dataset.packeryIndex;
                const to = this.masonry.items.indexOf(note);

                this.$store.commit('swapNotes', {from, to});

                this.calculateLayout();
            },
            calculateLayout() {
                if (this.masonry) this.$nextTick(() => this.masonry.layout());
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../style/variables";

    .layout {
        margin-bottom: 64px;
    }
</style>
