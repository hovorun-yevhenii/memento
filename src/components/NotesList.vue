<template>
  <div class="notes">
    <div class="list">
      <note-item v-for="note in notes"
                 :key="note.id"
                 :note="note"/>
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
    import {mapGetters} from 'vuex'
    import colors from '../colorConfig'

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
                notes: 'getAllNotes',
                noteToUpdate: 'getNoteToUpdate'
            })
        },
        watch: {
            notes(newNotes, oldNotes) {
                if (this.packery) this.updateLayout()
            }
        },
        created() {
            this.$store.dispatch('getNotesFromLS').then(() => this.initLayout())
        },
        mounted() {
            Object.entries(colors).forEach(([name, hex]) => this.$el.style.setProperty(`--${name}`, hex));
        },
        methods: {
            updateLayout() {
                console.log('update')
                this.packery.layout();
            },
            initLayout() {
                const list = document.querySelector('.list');

                this.packery = new Packery(list, {
                    itemSelector: '.note',
                    columnWidth: 238,
                    gutter: 16,
                    transitionDuration: '0.25s'
                });

                this.packery.getItemElements().forEach(item => {
                    const drag = new Draggabilly(item, {handle: '.drag'});

                    this.packery.bindDraggabillyEvents(drag);
                });

                this.packery.on('dragItemPositioned', draggedItem => {
                    const index = this.packery.items.indexOf(draggedItem);
                    const nextItem = this.packery.items[index + 1];

                    if (nextItem) list.insertBefore(draggedItem.element, nextItem.element);
                    else list.appendChild(draggedItem.element);
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
  @import '../style/variables';

  .notes {
    max-width: 1000px;
    margin: 0 auto;
    padding: 16px;
  }
</style>
