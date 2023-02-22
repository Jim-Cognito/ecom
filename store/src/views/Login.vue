<template>
    <div class="flex flex-col items-center mt-36">
        <h1 class="mb-6 text-2xl font-serif">Log In</h1>
        <UserLogin />
    </div>
</template>
<script lang="ts">
import UserLogin from "../components/UserLogin.vue";
export default {
    name: "Login",
    components: { UserLogin },
};
</script>
