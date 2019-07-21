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
  OPEN_MODAL_FORM(state) {
    state.isModalFormOpen = true;
  },
  CLOSE_MODAL_FORM(state) {
    state.isModalFormOpen = false;
  },
  UPDATE_NOTE(state, note) {
    const index = state.notes.findIndex(e => e.id === note.id);
    const updated = new Date();

    note.updated = updated.toISOString();
    state.notes.splice(index, 1, note);
  },
  CREATE_NOTE(state, note) {
    let id = 1;

    while (state.notes.some(item => item.id === id)) id++;

    console.log(id)

    note.id = id;
    state.notes.unshift(note);
  }
};

export const actions = {
  getNotesFromLS({commit}) {
    const savedNotes = localStorage.getItem('mementoNotes');
    const notes = JSON.parse(savedNotes) || [];

    commit('SET_NOTES_FROM_LS', notes);
  },
  setNoteToUpdate({commit}, note) {
    commit('SET_NOTE_TO_UPDATE', note);
    commit('OPEN_MODAL_FORM');
  },
  openModalForm({commit}) {
    commit('OPEN_MODAL_FORM');
  },
  closeModalForm({commit}) {
    commit('CLOSE_MODAL_FORM');
    commit('SET_NOTE_TO_UPDATE');
  },
  updateNote({commit}, note) {
    commit('UPDATE_NOTE', note);
  },
  createNote({commit}, note) {
    commit('CREATE_NOTE', note);
  },
};
