import { createApp } from "vue";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client/core";
import { DefaultApolloClient } from "@vue/apollo-composable";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./index.css";
import { setContext } from "@apollo/client/link/context";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";

// HTTP connection to the API
export const httpLink = new HttpLink({
    uri: "http://localhost:4000/graphql",
    credentials: "include",
});

const refreshLink = new TokenRefreshLink({
    accessTokenField: "accessToken",
    isTokenValidOrUndefined: () => {
        // return boolean
        const token = store.state.token;
        if (!token) {
            return true;
        }
        try {
            const { exp }: any = jwtDecode(token);
            if (Date.now() >= exp * 1000) {
                return false;
            } else {
                return true;
            }
        } catch {
            return false;
        }
    },
    fetchAccessToken: () => {
        // fetch
        return fetch("http://localhost:4000/refresh_token", {
            method: "POST",
            credentials: "include",
        });
    },
    handleFetch: (accessToken: string) => {
        // handle fetch
        store.commit("setToken", accessToken);
    },
    handleError: (err: Error) => {
        store.commit("clearUser");
    },
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = store.state.token;
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
            withCredentials: true,
        },
        xhrFields: {
            withCredentials: true,
        },
    };
});

export const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    credentials: "include",
    link: refreshLink.concat(authLink.concat(httpLink)),
});

const app = createApp(App)
    .use(store)
    .use(router)
    .provide(DefaultApolloClient, apolloClient);

app.mount("#app");
