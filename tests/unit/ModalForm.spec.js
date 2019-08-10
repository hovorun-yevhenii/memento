import Vue from 'vue';
import Vuex from 'vuex';
import { mount } from '@vue/test-utils';
import { getters } from '@/store/mutations';
import ModalForm from '@/components/ModalForm.vue';

Vue.use(Vuex);

describe('ModalForm', () => {
  const mutations = {
    closeForm: jest.fn(),
  };

  const store = new Vuex.Store({
    state: {
      isModalFormOpen: true,
    },
    getters,
    mutations,
  });

  const wrapper = mount(ModalForm, { store });

  it('Emits closeForm event', () => {
    wrapper.find('.dialog').trigger('mousedown');
    expect(mutations.closeForm).toHaveBeenCalled();
  });
});
