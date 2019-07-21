<template>
  <div class="note" :class="{'editing': editMode}">

    <input class="note__title"
           v-model="form.title"
           @keypress.enter="focusTextarea"
           placeholder="Введите заголовок"/>

    <textarea v-if="form.type === 'text'"
              class="note__text"
              v-model="form.text"
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

    <div v-if="form.updated" class="note__updated text--small">updated: {{getLocalTime(form.updated)}}</div>

    <div class="note__controls">
      <app-button v-if="!editMode" type="drag" class="drag"></app-button>
      <app-button type="color"></app-button>
      <app-button type="image"></app-button>
      <app-button v-if="editMode" type="save" @click="closeUpdateForm"></app-button>
      <app-button v-if="!editMode" type="edit" @click="openUpdateForm"></app-button>
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
            editMode: {
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
                return this.note || this.emptyNote
            }
        },
        watch: {
            form: {
                handler(form) {
                    if (form.text) this.fitTextareaHeight();
                    if (form.id) this.$store.dispatch('updateNote', form);
                },
                deep: true
            }
        },

        mounted() {
            this.fitTextareaHeight();
        },
        beforeDestroy() {
            const note = this.form;
            const shouldCreateNote = !note.id && note.title || note.text || note.image || note.listItems.length;

            console.log('beforeDestroy')

            if (shouldCreateNote) this.$store.dispatch('createNote', this.form);
        },
        methods: {
            openUpdateForm() {
                this.$store.dispatch('setNoteToUpdate', this.form)
            },
            closeUpdateForm() {
                this.$store.dispatch('closeModalForm', this.form)
            },
            focusTextarea() {
                const textarea = this.$refs.textarea;

                if (textarea) textarea.focus()
            },
            fitTextareaHeight() {
                const textarea = this.$refs.textarea;

                if (textarea && textarea.scrollHeight > textarea.offsetHeight) {
                    textarea.style.height = `${textarea.scrollHeight + 16}px`;
                }
            },
            getLocalTime(iso) {
                const date = new Date(iso);
                const hours = date.getHours();
                const minutes = date.getMinutes();
                const day = date.getDate();
                const month = date.toLocaleString('default', {month: 'long'});

                return `${hours}:${minutes} ${month} ${day}`;
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

    &.editing {
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
