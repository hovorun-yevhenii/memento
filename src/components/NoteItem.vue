<template>
    <div class="note"
         @mouseover="hover = true"
         @mouseleave="hover = false"
         :class="{'full-view': fullViewMode, 'checked': form.checked}"
         :style="'background-color: var(--' + form.color +')'">

        <div class="note__controls">
            <label v-if="showCheckControls" class="check-controls">
                <input type="checkbox" v-model="form.checked">
                <app-icon v-if="!form.checked" type="check"/>
                <app-icon v-if="form.checked" type="checked"/>
            </label>

            <label v-if="showPinControls" class="pin-controls">
                <input type="checkbox"
                       v-model="form.pinned"
                       @change="$event => changeNote($event.target.checked, 'pinned')">
                <app-icon v-if="!form.pinned" type="pin"/>
                <app-icon v-if="form.pinned" type="pined"/>
            </label>
        </div>

        <div v-if="form.image" class="note__image">
            <div class="note__image-close"></div>
            <img :src="form.image" alt="note image">
        </div>

        <app-textarea :value="form.title"
                      class="heading"
                      placeholder="Введите заголовок"
                      @change="value => changeNote(value, 'title')"/>

        <app-textarea v-if="!isList"
                      class="text"
                      :value="form.text"
                      placeholder="Текст заметки"
                      @change="value => changeNote(value, 'text')"/>

        <template v-if="isList">
            <div v-for="item in form.listItems"
                 class="note-list text">
                <input v-model="item.checked"
                       type="checkbox"
                       class="note-list__checkbox">
                <input v-model="item.text"
                       type="text" class="note-list__text"
                       :class="{'checked': item.checked}"
                       placeholder="Введите текст">
            </div>
            <app-icon type="add"
                      class="note-list__add"
                      @click="addListItem"/>
        </template>

        <div v-if="form.updated" class="note__updated text--small">
            updated: {{getFormattedTime(form.updated)}}
        </div>

        <div class="note__controls">
            <app-icon v-if="!fullViewMode && !searchText" type="drag" class="drag"/>

            <color-input @change="value => changeNote(value, 'color')"/>
            <image-input @change="value => changeNote(value, 'image')"/>

            <app-icon v-if="isList" type="text" @click="transformToText"/>
            <app-icon v-if="!isList" type="list" @click="transformToList"/>

            <app-icon type="delete" @click="deleteNote(form.id)"/>

            <app-icon v-if="fullViewMode" type="save" @click="closeForm"/>
            <app-icon v-if="!fullViewMode" type="edit" @click="openForm(form)"/>
        </div>
    </div>
</template>

<script>
    import AppIcon from './AppIcon'
    import ColorInput from './ColorInput'
    import ImageInput from './ImageInput'
    import AppTextarea from './AppTextarea'
    import {mapMutations} from 'vuex'

    export default {
        name: 'NoteItem',
        components: {
            AppIcon,
            AppTextarea,
            ColorInput,
            ImageInput
        },
        props: {
            note: {
                type: Object,
                required: false
            },
            fullViewMode: {
                type: Boolean,
                required: false
            }
        },
        data() {
            return {
                hover: false,
                emptyNote: {
                    id: '',
                    type: 'text',
                    title: '',
                    text: '',
                    listItems: [],
                    color: 'default',
                    image: '',
                    updated: '',
                    pinned: false,
                    checked: false
                }
            }
        },
        computed: {
            form() {
                return this.note || this.emptyNote;
            },
            isList() {
                return this.form.type === 'list';
            },
            showCheckControls() {
              return !this.fullViewMode && (this.hover || this.form.checked);
            },
            showPinControls() {
                return this.hover || this.form.pinned;
            },
            searchText() {
                return this.$store.getters.getSearchText;
            }
        },
        watch: {
            'form.listItems': {
                handler(items) {
                    this.changeNote(items, 'listItems');
                },
                deep: true
            }
        },
        beforeDestroy() {
            const note = this.form;
            const shouldCreateNote = !note.id && (note.title || note.text || note.image || note.listItems.length);

            if (shouldCreateNote) this.createNote(note);
        },
        methods: {
            ...mapMutations([
                'updateNoteProperty',
                'createNote',
                'openForm',
                'closeForm',
                'deleteNote'
            ]),

            transformToText() {
                this.form.text = this.form.listItems.reduce((allText, {text}) => {
                    return allText + `${text}\n`;
                }, '');

                this.changeNote('text', 'type');
            },

            transformToList() {
                const textItems = this.form.text.split(/\n/).filter(t => t);
                const listItems = [];

                textItems.forEach(text => listItems.push({checked: false, text}));

                this.form.listItems = listItems;
                this.changeNote('list', 'type');
            },

            addListItem() {
                this.$emit('calculateLayout');
                this.form.listItems.push({
                    checked: false,
                    text: ''
                });
            },

            changeNote(value, prop) {
                if (this.form.id) this.updateNoteProperty({noteId: this.form.id, prop, value});
                else this.form[prop] = value;

                if (['title', 'text', 'image', 'type'].includes(prop)) this.$emit('calculateLayout');
            },

            getFormattedTime(iso) {
                const date = new Date(iso);
                const hours = date.getHours();
                const minutes = date.getMinutes();
                const day = date.getDate();
                const month = date.toLocaleString('en-us', {month: 'long'});

                return `${month} ${day} ${hours}:${minutes}`;
            }
        }
    }
</script>


<style lang="scss" scoped>
    @import '../style/variables';

    .note {
        width: 288px;
        padding: 12px 12px 36px;
        border-radius: 8px;
        background-color: #2D2E30;
        color: #e8eaed;
        box-sizing: border-box;

        &.full-view {
            width: 100%;
        }

        &.checked {
            box-shadow: 0 1px 4px $main-text;
        }

        &__image {
            display: flex;
            justify-content: center;
            align-items: center;
            max-height: 120px;
            margin-bottom: 12px;

            img {
                max-width: inherit;
                max-height: inherit;
                border-radius: 8px;
            }
        }

        &__updated {
            margin: 16px 0;
            color: $dark-text;
            text-align: right;
        }

        &__controls {
            display: flex;
            justify-content: space-around;
            width: 266px;
            height: 24px;

            .check-controls,
            .pin-controls {
                input {
                    display: none;
                }
            }

            .check-controls {
                margin-right: auto;
            }

            .pin-controls {
                margin-left: auto;
            }
        }
    }

    .note-list {
        display: flex;

        &__text {
            margin-bottom: 8px;
            background-color: transparent;
            width: 100%;
            resize: none;
            cursor: default;

            &, &:focus {
                outline: none;
                border: none;
            }

            &.checked {
                text-decoration: line-through;
            }
        }

        &__checkbox {
            margin: 4px 8px 4px 4px;
            transform: scale(1.4);
            cursor: pointer;
            opacity: .7;
        }

        &__add {
            margin: 8px auto auto -2px;
        }
    }
</style>
