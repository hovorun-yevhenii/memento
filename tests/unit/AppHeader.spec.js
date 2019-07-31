import {shallowMount, createLocalVue} from '@vue/test-utils'
import Vuex from 'vuex'
import AppHeader from '@/components/AppHeader.vue'
import {getters} from '@/store/mutations.js'

const localVue = createLocalVue();

localVue.use(Vuex);

describe('AppHeader', () => {
    const mutations = {
        openForm: jest.fn()
    };

    const store = new Vuex.Store({
        getters,
        mutations,
        state: {
            notes: [],
            noteToUpdate: null,
            isModalFormOpen: false,
            searchText: '',
        }
    });

    const wrapper = shallowMount(AppHeader, {store, localVue});

    it('renders add button', () => {
        expect(wrapper.contains('.header__add')).toBe(true);
    });

    // it('calls "openForm" mutation', () => {
    //     wrapper.find('.header__add').trigger('click');
    //
    //     expect(mutations.openForm).toHaveBeenCalled();
    // })
});
