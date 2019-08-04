import { mutations } from '@/store/mutations';

test('mutations', () => {
  const state = {
    notes: [],
    noteToUpdate: null,
    isModalFormOpen: false,
    searchText: '',
  };

  const note1 = {
    text: '',
    color: 'default',
    checked: true,
  };

  const note2 = {
    text: '',
    color: 'default',
    checked: true,
  };

  mutations.getNotesFromLS(state);
  expect(state.notes).toEqual([]);

  mutations.openForm(state, note1);
  expect(state.isModalFormOpen).toBe(true);
  expect(state.noteToUpdate).toEqual(note1);

  mutations.closeForm(state);
  expect(state.isModalFormOpen).toBe(false);

  mutations.setSearchText(state, 'user query');
  expect(state.searchText).toMatch('user query');

  mutations.createNote(state, note1);
  expect(state.notes).toEqual([note1]);

  mutations.changeNotesColor(state, 'crimson');
  expect(state.notes[0].color).toMatch('crimson');

  mutations.updateNoteProperty(state, {
    noteId: 1,
    prop: 'color',
    value: 'darkgoldenrod',
  });
  expect(state.notes[0].color).toMatch('darkgoldenrod');

  mutations.createNote(state, note2);
  expect(state.notes[0].id).toBe(2);

  mutations.swapNotes(state, { from: 0, to: 1 });
  expect(state.notes[0].id).toBe(1);

  mutations.deleteNote(state, 2);
  expect(state.notes.length).toBe(1);

  mutations.uncheckNotes(state);
  expect(state.notes[0].checked).toBe(false);
});
