<template>
  <div class="note" :class="{'full-view': fullViewMode}">

    <input class="note__title"
           v-model="form.title"
           @input="changeHandler($event, 'title')"
           @keypress.enter="focusTextarea"
           placeholder="Введите заголовок"/>

    <textarea v-if="form.type === 'text'"
              class="note__text"
              v-model="form.text"
              @input="changeHandler($event, 'text')"
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
      <app-button type="color"/>
      <app-button type="image"/>
      <app-button v-if="fullViewMode" type="save" @click="closeForm"/>
      <app-button v-if="!fullViewMode" type="edit" @click="openForm"/>
    </div>
  </div>
</template>

<script>
    import AppButton from './AppButton'

    export default {
        name: 'NoteItem',
        components: {
            AppButton
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
                    color: '',
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

            if (shouldCreateNote) this.$store.dispatch('createNote', note);
        },
        methods: {
            changeHandler(event, prop) {
                if (prop === 'text') this.fitTextareaHeight();
                if (!this.form.id) return;

                this.$store.dispatch('updateNoteProperty', {
                    noteId: this.form.id,
                    prop,
                    value: event.target.value
                });
            },
            openForm() {
                this.$store.dispatch('openForm', this.form)
            },
            closeForm() {
                this.$store.dispatch('closeForm', this.form)
            },
            focusTextarea() {
                const textarea = this.$refs.textarea;

                if (textarea) textarea.focus();
            },
            fitTextareaHeight() {
                const textarea = this.$refs.textarea;

                if (textarea && textarea.scrollHeight > textarea.offsetHeight) {
                    textarea.style.height = `${textarea.scrollHeight + 16}px`;
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
    border: 1px solid #5F6368;
    background-color: #2D2E30;
    color: #e8eaed;
    box-sizing: border-box;

    &.full-view {
      width: 100%;
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
        margin-right: 8px;
      }
    }
  }

</style>
