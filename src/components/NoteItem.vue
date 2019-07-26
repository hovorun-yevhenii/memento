<template>
  <div class="note"
       @mouseover="hover = true"
       @mouseleave="hover = false"
       :class="{'full-view': fullViewMode, 'checked': form.checked}"
       :style="'background-color: var(--' + form.color +')'">

    <label v-if="!fullViewMode && (hover || form.checked)" class="check-controls">
      <input type="checkbox" v-model="form.checked">
      <app-icon v-if="!form.checked" type="checkable"/>
      <app-icon v-if="form.checked" type="checked"/>
    </label>

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
      <div class="note-list text" v-for="item in form.listItems">
        <input type="checkbox" class="note-list__checkbox" v-model="item.checked">
        <input type="text" class="note-list__text" :class="{'checked': item.checked}" placeholder="Введите текст"
               v-model="item.text">
      </div>
      <app-icon type="add" class="note-list__add" @click="addListItem"/>
    </template>

    <div v-if="form.updated" class="note__updated text--small">
      updated: {{getFormattedTime(form.updated)}}
    </div>

    <div class="note__controls">
      <app-icon v-if="!fullViewMode" type="drag" class="drag"/>
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
                    isPinned: '',
                    updated: '',
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
                    return allText + `${text}\n`
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
                })
            },

            changeNote(value, prop) {
                if (this.form.id) this.updateNoteProperty({noteId: this.form.id, prop, value});
                else this.form[prop] = value;

                if (['title', 'text', 'image'].includes(prop)) this.$emit('calculateLayout');
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
    padding: 12px;
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

    .check-controls {
      position: absolute;
      top: -12px;
      left: -12px;
      input {
        display: none;
      }
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
      margin-top: 16px;
      color: $dark-text;
      text-align: right;
    }

    &__controls {
      margin-top: 16px;
      display: flex;

      & > * {
        margin-right: 12px;
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
