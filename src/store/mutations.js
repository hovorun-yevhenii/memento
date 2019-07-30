export const state = {
  notes: [],
  noteToUpdate: null,
  isModalFormOpen: false,
  searchText: ''
};

export const getters = {
  getAllNotes: state => state.notes,
  getNoteToUpdate: state => state.noteToUpdate,
  modalFormIsOpen: state => state.isModalFormOpen,
  thereAreCheckedNotes: state => state.notes.some(note => note.checked),
  getSearchText: state => state.searchText
};

export const mutations = {
  getNotesFromLS(state) {
    const savedNotes = localStorage.getItem('mementoNotes');

    try {
      state.notes = JSON.parse(savedNotes) || [];
    } catch (error) {
      console.dir(error)
    }
  },

  openForm(state, note) {
    state.noteToUpdate = note;
    state.isModalFormOpen = true;
  },

  closeForm(state) {
    state.isModalFormOpen = false;
  },

  updateNoteProperty(state, {noteId, prop, value}) {
    const currentDate = new Date();
    const noteIndex = state.notes.findIndex(e => e.id === noteId);

    Object.assign(state.notes[noteIndex], {
      updated: currentDate.toISOString(),
      [prop]: value
    })
  },

  createNote(state, note) {
    const currentDate = new Date();
    let availableId = 1;

    while (state.notes.some(item => item.id === availableId)) availableId++;

    Object.assign(note, {
      updated: currentDate.toISOString(),
      id: availableId
    });

    state.notes.unshift(note);
  },

  deleteNote(state, noteId) {
    const noteIndex = state.notes.findIndex(e => e.id === noteId);

    state.notes.splice(noteIndex, 1);
    state.isModalFormOpen = false;
  },

  swapNotes(state, {from, to}) {
    const tempNote = state.notes[from];

    state.notes[from] = state.notes[to];
    state.notes.splice(to, 1, tempNote);
  },

  changeNotesColor(state, color) {
    state.notes.forEach(note => {
      if (note.checked) note.color = color;
    })
  },

  deleteSelectedNotes(state) {
    const checked = state.notes.filter(note => note.checked);
    checked.forEach(({id}) => this.commit('deleteNote', id));
  },

  uncheckNotes(state) {
    state.notes.forEach(note => Object.assign(note, {checked: false}));
  },

  setSearchText(state, text) {
    state.searchText = text;
  }
};
