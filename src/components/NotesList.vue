<template>
    <div class="list">
        <note-item v-for="note in notes"
                   :key="note.title"
                   :note="note"
                    @openModalDialog="openModalDialog"/>

        <modal-dialog v-if="modalDialogIsOpen" @closeModalDialog="closeModalDialog">
            <note-item :editing="true" :note="notes[0]"/>
        </modal-dialog>
    </div>
</template>

<script>
    import NoteItem from './NoteItem'
    import ModalDialog from './ModalDialog'

    // const packery = new Packery(document.querySelector('.notes'), {
    //     itemSelector: '.note',
    //     columnWidth: 238,
    //     gutter: 16,
    //     transitionDuration: '0.25s'
    // });
    //
    // packery.getItemElements().forEach(el => {
    //     const draggie = new Draggabilly(el);
    //     packery.bindDraggabillyEvents(draggie);
    // });

    export default {
        name: 'NotesList',
        components: {
            NoteItem,
            ModalDialog
        },
        data() {
            return {
                notes: [],
                modalDialogIsOpen: false
            }
        },
        created() {
            const savedNotes = localStorage.getItem('mementoNotes');
            this.notes = JSON.parse(savedNotes) || [];
        },
        methods: {
            openModalDialog() {
                this.modalDialogIsOpen = true
            },
            closeModalDialog() {
                this.modalDialogIsOpen = false
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../style/variables';
</style>
