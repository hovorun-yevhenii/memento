import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import {state, getters, mutations} from './mutations'

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    key: 'mementoNotes',
    reducer: state => state.notes
});

export default new Vuex.Store({
    state,
    getters,
    mutations,
    plugins: [vuexLocal.plugin]
})
