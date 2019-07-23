<template>
  <div class="note" :class="{'full-view': fullViewMode}" :style="'background-color: var(--' + form.color +')'">

    <div v-if="form.image" class="note__image">
      <div class="note__image-close"></div>
      <img :src="form.image" alt="note image">
    </div>

    <input class="note__title"
           :value="form.title"
           @input="textChangeHandler($event, 'title')"
           @keypress.enter="focusTextarea"
           placeholder="Введите заголовок"/>

    <textarea v-if="form.type === 'text'"
              class="note__text"
              :value="form.text"
              @input="textChangeHandler($event, 'text')"
              ref="textarea"
              placeholder="Текст заметки">
    </textarea>

    <template v-if="form.type === 'list'">
      <div v-for="item in form.listItems">
        <label>
          <input type="checkbox" v-model="item.checked">
          {{item.text}}
        </label>
      </div>
    </template>

    <div v-if="form.updated" class="note__updated text--small">
      updated: {{getFormattedTime(form.updated)}}
    </div>

    <div class="note__controls">
      <app-button v-if="!fullViewMode" type="drag" class="drag"/>
      <color-input @change="colorChangeHandler"></color-input>
      <image-input @change="imageChangeHandler"/>
      <app-button type="delete" @click="deleteNote(form.id)"/>
      <app-button v-if="fullViewMode" type="save" @click="closeForm"/>
      <app-button v-if="!fullViewMode" type="edit" @click="openForm(form)"/>
    </div>
  </div>
</template>

<script>
    import AppButton from './AppButton'
    import ColorInput from './ColorInput'
    import ImageInput from './ImageInput'
    import {mapMutations} from 'vuex'

    export default {
        name: 'NoteItem',
        components: {
            AppButton,
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
                emptyNote: {
                    id: '',
                    type: 'text',
                    title: '',
                    text: '',
                    listItems: [],
                    color: 'default',
                    image: '',
                    isPinned: '',
                    updated: ''
                }
            }
        },
        computed: {
            form() {
                return this.note || this.emptyNote;
            }
        },
        mounted() {
            this.fitTextareaHeight();
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
            textChangeHandler(event, prop) {
                if (prop === 'text') this.fitTextareaHeight();
                this.updateProperty(prop, event.target.value);
            },
            colorChangeHandler(colorName) {
                this.updateProperty('color', colorName);
            },
            imageChangeHandler(image) {
                this.updateProperty('image', image);
            },
            updateProperty(prop, value) {
                if (this.form.id) this.updateNoteProperty({noteId: this.form.id, prop, value});
                else this.form[prop] = value;
            },
            focusTextarea() {
                const textarea = this.$refs.textarea;

                if (textarea) textarea.focus();
            },
            fitTextareaHeight() {
                const textarea = this.$refs.textarea;

                if (textarea && textarea.scrollHeight > textarea.offsetHeight) {
                    this.$emit('calculateLayout');
                    textarea.style.height = `${textarea.scrollHeight}px`;
                }
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
    width: 238px;
    padding: 12px;
    border-radius: 8px;
    background-color: #2D2E30;
    color: #e8eaed;
    box-sizing: border-box;

    &.full-view {
      width: 100%;
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

    &__title,
    &__text {
      font-size: 18px;
      line-height: 24px;
      margin-bottom: 8px;
      background-color: transparent;

      &, &:focus {
        outline: none;
        border: none;
      }
    }

    &__text {
      display: block;
      width: 100%;
      resize: none;
    }

    &__text {
      font-size: 14px;
      line-height: 18px;
      cursor: default;
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

</style>
