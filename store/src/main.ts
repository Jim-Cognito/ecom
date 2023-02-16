import { createApp } from "vue";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { DefaultApolloClient } from "@vue/apollo-composable";
import App from "./App.vue";
import router from "./router";

const apolloClient = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
});

const app = createApp(App);
app.provide(DefaultApolloClient, apolloClient);
app.use(router);
app.mount("#app");
