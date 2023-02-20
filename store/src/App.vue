<template>
    <div v-if="loading">Loading...</div>
    <div v-else>
        <Nav />
        <router-view />
    </div>
</template>
<script lang="ts">
import { onMounted, ref } from "vue";
import Nav from "./components/Nav.vue";
import axios from "axios";
export default {
    name: "App",
    components: { Nav },
    setup() {
        const loading = ref<boolean>(true);

        onMounted(() => {
            fetch("http://localhost:4000/refresh_token", {
                method: "POST",
                credentials: "include",
            })
                .then(async (x) => {
                    const data = await x;
                    console.log(data);
                    loading.value = false;
                })
                .catch((err) => {
                    console.log(err);
                });
        });

        return {
            loading,
        };
    },
};
</script>
