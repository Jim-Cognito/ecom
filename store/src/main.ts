import { createApp } from "vue";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { createUploadLink } from "apollo-upload-client";
import { WhoAmIDocument } from "./api/types/types";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./index.css";

// HTTP connection to the API
const httpLink = createUploadLink({
    uri: "http://localhost:4000/graphql",
});

const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

// use apollo client to call whoAmI query, if authorized, set user in store
apolloClient
    .query({
        query: WhoAmIDocument,
    })
    .then((result) => {
        if (result.data.whoAmI) {
            store.commit("setUser", {
                user: result.data.whoAmI,
                token: localStorage.getItem("token"),
            });
        }
    })
    .catch((error) => {
        store.commit("clearUser");
    });

const app = createApp(App)
    .use(store)
    .use(router)
    .provide(DefaultApolloClient, apolloClient);

app.mount("#app");
