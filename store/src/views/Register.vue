<template>
    <div class="flex flex-col items-center mt-36">
        <h1 class="mb-6 text-2xl">Register</h1>
        <UserRegister />
    </div>
</template>
<script lang="ts">
import UserRegister from "../components/UserRegister.vue";
export default {
    name: "Register",
    components: { UserRegister },
};
</script>
