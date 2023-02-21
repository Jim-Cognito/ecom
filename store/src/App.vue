<template>
    <div v-if="loading">Loading...</div>
    <div v-else>
        <Nav />
        <router-view />
    </div>
</template>
<script lang="ts">
import Nav from "./components/Nav.vue";
import { apolloClient } from "./main";
import { WhoAmIDocument } from "./api/types/types";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
export default {
    name: "App",
    components: { Nav },
    setup() {
        const loading = ref<boolean>(true);
        const store = useStore();

        onMounted(() => {
            refreshToken();
        });

        function refreshToken() {
            fetch("http://localhost:4000/refresh_token", {
                method: "POST",
                credentials: "include",
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    store.commit("setToken", data.accessToken);
                    apolloClient
                        .query({
                            query: WhoAmIDocument,
                        })
                        .then((result) => {
                            store.commit("setUser", result.data.whoAmI);
                            loading.value = false;
                        })
                        .catch((err) => {
                            console.warn(err);
                            store.commit("clearUser");
                            loading.value = false;
                        });
                })
                .catch((err) => {
                    console.warn(err);
                    store.commit("clearUser");
                    loading.value = false;
                });
        }

        return {
            loading,
        };
    },
};
</script>
