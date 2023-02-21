<template>
    <div class="flex space-x-5">
        <router-link class="block" to="/">Home</router-link>
        <router-link class="block" to="/login">Log In</router-link>
        <router-link class="block" to="/register">Register</router-link>
        <router-link class="block" to="/products">Products</router-link>
        <router-link class="block" to="/auth">Auth Test</router-link>
    </div>
</template>

<script lang="ts">
export default {
    name: "Nav",
};
</script>
