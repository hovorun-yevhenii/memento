export const state = {
  notes: [],
  noteToUpdate: null,
  isModalFormOpen: false
};

export const getters = {
  getAllNotes: state => state.notes,
  getNoteToUpdate: state => state.noteToUpdate,
  modalFormIsOpen: state => state.isModalFormOpen
};

export const mutations = {
  SET_NOTES_FROM_LS(state, notes) {
    state.notes = notes;
  },
  SET_NOTE_TO_UPDATE(state, note) {
    state.noteToUpdate = note;
  },
  OPEN_FORM(state) {
    state.isModalFormOpen = true;
  },
  CLOSE_FORM(state) {
    state.isModalFormOpen = false;
  },
  UPDATE_NOTE_PROPERTY(state, {noteId, prop, value}) {
    const currentDate = new Date();
    const noteIndex = state.notes.findIndex(e => e.id === noteId);

    Object.assign(state.notes[noteIndex], {
      updated: currentDate.toISOString(),
      [prop]: value
    })
  },
  CREATE_NOTE(state, note) {
    const currentDate = new Date();
    let availableId = 1;

    while (state.notes.some(item => item.id === availableId)) availableId++;

    Object.assign(note, {
      updated: currentDate.toISOString(),
      id: availableId
    });

    state.notes.unshift(note);
  }
};

export const actions = {
  getNotesFromLS({commit}) {
    const savedNotes = localStorage.getItem('mementoNotes');
    const notes = JSON.parse(savedNotes) || [];

    commit('SET_NOTES_FROM_LS', notes);
  },
  openForm({commit}, note) {
    commit('SET_NOTE_TO_UPDATE', note);
    commit('OPEN_FORM');
  },
  closeForm({commit}) {
    commit('SET_NOTE_TO_UPDATE', null);
    commit('CLOSE_FORM');
  },
  updateNoteProperty({commit}, change) {
    commit('UPDATE_NOTE_PROPERTY', change);
  },
  createNote({commit}, note) {
    commit('CREATE_NOTE', note);
  },
};
