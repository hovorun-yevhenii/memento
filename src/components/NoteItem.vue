<template>
    <div class="note" :class="{'editing': editing}">
        <p class="note__title" @click="$emit('openModalDialog')">{{note.title}}</p>

        <p v-if="note.text" class="note__text">{{note.text}}</p>
        <template v-if="note.isList">
            <label v-for="item in note.listItems">
                <input type="checkbox" v-model="item.checked">
                {{item.label}}
                <br>
            </label>
        </template>

        <div class="note__controls">
            <button class="button">1</button>
            <button class="button">2</button>
            <button class="button">3</button>
            <button class="button">4</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'NoteItem',
        props: {
            note: {
                type: Object,
                required: false
            },
            editing: {
                type: Boolean,
                required: false
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../style/variables';

    .note {
        width: 238px;
        max-width: 238px;
        padding: 12px;
        border-radius: 8px;
        border: 1px solid #5F6368;
        background-color: #2D2E30;
        color: #e8eaed;
        box-sizing: border-box;

        &.editing {
            width: 100%;
        }

        &__title {
            font-size: 18px;
            line-height: 24px;
            margin-bottom: 8px;
            cursor: default;
        }

        &__text {
            font-size: 14px;
            line-height: 18px;
            cursor: default;
        }

        &__controls {
            outline: 1px solid;
        }
    }

</style>
