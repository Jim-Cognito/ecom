<template>
    <Nav />
    <router-view />
</template>
<script lang="ts">
import Nav from "./components/Nav.vue";
export default {
    name: "App",
    components: { Nav },
};
</script>
