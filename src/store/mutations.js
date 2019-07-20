export const state = {
    count: 0
};

export const getters = {};

export const mutations = {
    increment(state) {
        state.count++
    }
};

export const actions = {
    incrementAsync({commit}) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                commit('increment');
                resolve()
            }, 1000)
        })
    }
};
