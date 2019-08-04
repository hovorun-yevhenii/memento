import Vue from 'vue';
import Vuex from 'vuex';
import { mount } from '@vue/test-utils';
import { getters } from '@/store/mutations';
import AppHeader from '@/components/AppHeader.vue';

Vue.use(Vuex);

describe('AppHeader', () => {
  const mutations = {
    openForm: jest.fn(),
  };

  const state = {
    notes: [{
      checked: true,
    }],
  };

  const store = new Vuex.Store({
    state,
    getters,
    mutations,
  });

  const wrapper = mount(AppHeader, { store });

  it('renders add button', () => {
    expect(wrapper.contains('.header__add')).toBe(true);
  });

  it('commits an openForm mutation', () => {
    wrapper.find('.header__add').trigger('click');
    expect(mutations.openForm).toHaveBeenCalled();
  });

  it('renders actions block if thereAreCheckedNotes', () => {
    expect(wrapper.contains('.picker')).toBe(true);
  });
});
