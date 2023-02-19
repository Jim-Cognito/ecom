import { createApp } from "vue";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client/core";
import { DefaultApolloClient } from "@vue/apollo-composable";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./index.css";
import { setContext } from "@apollo/client/link/context";

// HTTP connection to the API
export const httpLink = new HttpLink({
    uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = store.state.token;
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

export const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    credentials: "include",
    link: authLink.concat(httpLink),
});

const app = createApp(App)
    .use(store)
    .use(router)
    .provide(DefaultApolloClient, apolloClient);

app.mount("#app");
