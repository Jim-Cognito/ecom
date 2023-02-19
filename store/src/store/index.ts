import { createStore } from "vuex";

export default createStore({
    state: {
        user: null,
    },
    mutations: {
        setUser(state, { user, refreshToken }) {
            state.user = user;
        },
        clearUser(state) {
            state.user = null;
        },
    },
});
