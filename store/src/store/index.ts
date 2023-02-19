import { createStore } from "vuex";

export default createStore({
    state: {
        user: null,
        token: null,
    },
    mutations: {
        setUser(state, { user, token }) {
            state.user = user;
            state.token = token;
        },
        clearUser(state) {
            state.user = null;
        },
    },
});
