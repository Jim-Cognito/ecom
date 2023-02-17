<template>
    <h1>Home</h1>
    <div>
        <div>
            <router-link to="/register">register</router-link>
        </div>
        <div>
            <router-link to="/login">login</router-link>
        </div>
        <div>
            <router-link to="/products">products</router-link>
        </div>
    </div>
</template>
<script lang="ts">
export default {
    name: "Home",
};
</script>
