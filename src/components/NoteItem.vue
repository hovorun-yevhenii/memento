<template>
    <div class="note"
         @mouseover="hover = true"
         @mouseleave="hover = false"
         :class="{'full-view': fullViewMode, 'checked': form.checked}"
         :style="'background-color: var(--' + form.color +')'">

        <div class="note__controls">
            <label v-if="showCheckControls"
                   class="check-controls"
                   :title="form.checked ? 'Uncheck note' : 'Check note'">
                <input type="checkbox"
                       v-model="form.checked">
                <app-icon v-if="!form.checked"
                          type="check"/>
                <app-icon v-if="form.checked"
                          type="checked"/>
            </label>

            <label v-if="showPinControls"
                   class="pin-controls"
                   :title="form.pinned ? 'Unpin note' : 'Pin note'">
                <input type="checkbox"
                       v-model="form.pinned"
                       @change="$event => changeNote($event.target.checked, 'pinned')">
                <app-icon v-if="!form.pinned"
                          type="pin"/>
                <app-icon v-if="form.pinned"
                          type="pined"/>
            </label>
        </div>

        <div v-if="form.image" class="note__image">
            <div class="note__image-close"
                 @click="changeNote('', 'image')"
                 title="Delete image">
                <app-icon type="delete"/>
            </div>
            <img :src="form.image"
                 alt="note image">
        </div>

        <app-textarea :value="form.title"
                      class="heading"
                      :placeholder="fullViewMode ? 'Type note\'s title' : ''"
                      @change="value => changeNote(value, 'title')"/>

        <app-textarea v-if="!isList"
                      class="text"
                      :value="form.text"
                      :placeholder="fullViewMode ? 'Note\'s text' : ''"
                      @change="value => changeNote(value, 'text')"/>

        <template v-if="isList">
            <div v-for="(item, index) in form.listItems"
                 :key="index"
                 class="note-list text">
                <input v-model="item.checked"
                       type="checkbox"
                       class="note-list__checkbox">
                <input v-model="item.text"
                       :class="{'checked': item.checked}"
                       type="text" class="note-list__text"
                       spellcheck="false"
                       placeholder="Введите текст">
            </div>
            <app-icon type="add"
                      class="note-list__add"
                      v-if="showAddListItemButton"
                      title="Add list item"
                      @click="addListItem"/>
        </template>

        <div v-if="form.updated"
             class="note__updated text--small">
            updated: {{getFormattedTime(form.updated)}}
        </div>

        <div class="note__controls">
            <app-icon v-if="!fullViewMode && !searchText"
                      type="drag"
                      class="drag"/>

            <color-input @change="value => changeNote(value, 'color')"/>
            <image-input @change="value => changeNote(value, 'image')"
                         title="Add image"/>

            <app-icon v-if="isList"
                      type="text"
                      @click="transformToText"
                      title="Transform to text"/>
            <app-icon v-if="!isList"
                      type="list"
                      @click="transformToList"
                      title="Transform to list"/>

            <app-icon type="delete"
                      @click="deleteNote(form.id)"
                      title="Delete note"/>

            <app-icon v-if="fullViewMode"
                      :disabled="!withContent"
                      type="save"
                      @click="closeForm"
                      class="save-button"/>
            <app-icon v-if="!fullViewMode"
                      type="edit"
                      @click="openForm(form)"
                      title="Edit note"/>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import AppIcon from './AppIcon.vue';
import ColorInput from './ColorInput.vue';
import ImageInput from './ImageInput.vue';
import AppTextarea from './AppTextarea.vue';

export default {
  name: 'NoteItem',
  components: {
    AppIcon,
    AppTextarea,
    ColorInput,
    ImageInput,
  },
  props: {
    note: {
      type: Object,
      required: false,
    },
    fullViewMode: {
      type: Boolean,
      required: false,
    },
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
        checked: false,
      },
    };
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
    },
    showAddListItemButton() {
      const itemsQty = this.form.listItems.length;

      return itemsQty && this.form.listItems[itemsQty - 1].text;
    },
    withContent() {
      const note = this.form;

      return note.title || note.text || note.image || note.listItems.length;
    },
  },
  watch: {
    'form.listItems': {
      handler(items) {
        this.changeNote(items, 'listItems');
      },
      deep: true,
    },
    hover() {
      if (this.form.listItems.length) {
        this.form.listItems = this.form.listItems.filter(item => item.text);
      }
    },
  },
  beforeDestroy() {
    if (!this.form.id && this.withContent) this.createNote(this.form);
  },
  methods: {
    ...mapMutations([
      'updateNoteProperty',
      'createNote',
      'openForm',
      'closeForm',
      'deleteNote',
    ]),

    transformToText() {
      this.form.text = this.form.listItems.reduce((allText, { text }) => (text ? `${allText}${text}\n` : allText), '');

      this.changeNote('text', 'type');
    },

    transformToList() {
      const textItems = this.form.text.split(/\n/).filter(text => text);

      this.form.listItems = textItems.map(text => ({ checked: false, text }));

      if (!this.form.listItems.length) this.addListItem();

      this.changeNote('list', 'type');
    },

    addListItem() {
      this.$emit('calculateLayout');
      this.form.listItems.push({
        checked: false,
        text: '',
      });
    },

    changeNote(value, prop) {
      if (this.form.id) this.updateNoteProperty({ noteId: this.form.id, prop, value });
      else this.form[prop] = value;

      if (['title', 'text', 'image', 'type'].includes(prop)) this.$emit('calculateLayout');
    },

    getFormattedTime(iso) {
      const date = new Date(iso);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const day = date.getDate();
      const month = date.toLocaleString('en-us', { month: 'long' });

      return `${month} ${day} ${hours}:${minutes}`;
    },
  },
};
</script>


<style lang="scss" scoped>
    @import '../style/variables';

    .note {
        width: 288px;
        padding: 12px 12px 36px;
        box-sizing: border-box;
        border: 1px solid transparent;
        border-radius: 8px;
        color: $main-text;

        &.checked {
            border: 1px solid rgba($main-text, .8);
        }

        &__image {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            max-height: 120px;
            margin-bottom: 12px;
            background-color: inherit;

            &-close {
                position: absolute;
                right: 2px;
                top: 2px;
                background-color: inherit;
                border-radius: 100%;
                opacity: 0;
            }

            &:hover &-close {
                opacity: .7;
            }

            img {
                max-width: 100%;
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

            & ~ & {
                margin-top: 24px;
            }

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

        &.full-view {
            width: 100%;
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
