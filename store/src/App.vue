<template>
    <div v-if="loading">Loading...</div>
    <div v-else>
        <Nav />
        <router-view />
    </div>
</template>
<script lang="ts">
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import Nav from "./components/Nav.vue";
import { apolloClient } from "./main";
import { WhoAmIDocument } from "./api/types/types";
export default {
    name: "App",
    components: { Nav },
    setup() {
        const loading = ref<boolean>(true);
        const store = useStore();
        onMounted(() => {
            fetch("http://localhost:4000/refresh_token", {
                method: "POST",
                credentials: "include",
            })
                .then((response) => response.json())
                .then((data) => {
                    store.commit("setToken", data.accessToken);
                    //useWhoAmI query to get user data and set it in the store
                    apolloClient
                        .query({
                            query: WhoAmIDocument,
                        })
                        .then((result) => {
                            store.commit("setUser", result.data.whoAmI);
                            loading.value = false;
                        })
                        .catch((err) => {
                            console.log(err);
                            loading.value = false;
                        });
                })
                .catch((err) => {
                    console.log(err);
                    loading.value = false;
                });
        });

        return {
            loading,
        };
    },
};
</script>
