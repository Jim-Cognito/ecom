import { createStore } from "vuex";
import { setContext } from "@apollo/client/link/context";

export default createStore({
    state: {
        user: null,
    },
    mutations: {
        setUser(state, { user, token }) {
            state.user = user;
            localStorage.setItem("token", token);
            setContext((_, { headers }) => {
                // return the headers to the context so httpLink can read them
                return {
                    headers: {
                        ...headers,
                        authorization: token ? `Bearer ${token}` : "",
                    },
                };
            });
        },
        clearUser(state) {
            state.user = null;
            localStorage.removeItem("token");
        },
    },
});
