// import { useTheme } from "vuetify";
// const currentTheme = useTheme();

export const state = () => ({
    isDarkMode: false,
});

export const mutations = {
    setThemeMode(state, payload) {
        state.isDarkMode = payload;
    }
};

export const actions = {
    setThemeMode({ commit }, payload) {
        commit('setThemeMode', payload);
    }
};

export const getters = {
    getThemeMode(state) {
        const getLocalThemeMode = localStorage.getItem('isDarkMode');
        if (getLocalThemeMode) {
            return getLocalThemeMode;
        } else {
            return state.isDarkMode;
        }
    }
}

