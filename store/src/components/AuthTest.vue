<template>
    <div class="font-serif">
        <p class="text-green-500">{{ user }}</p>
        <p class="text-red-500">{{ error }}</p>
        <Button :loading="loading" @click="logout">{{
            loading ? "Loading..." : "Logout"
        }}</Button>
    </div>
</template>

<script lang="ts">
import { ApolloError } from "@apollo/client/errors";
import { ref, computed } from "vue";
import { useWhoAmIQuery, useLogoutMutation } from "../api/types/types";
import { useStore } from "vuex";
import Button from "./base/Button.vue";

export default {
    name: "AuthTest",
    components: { Button },
    setup() {
        const store = useStore();
        const { result, loading, onError } = useWhoAmIQuery({
            fetchPolicy: "no-cache",
        });
        const error = ref<ApolloError | null>(null);
        onError((e) => {
            error.value = e;
        });
        const user = computed(() => result.value?.whoAmI ?? null);
        const { mutate: logout, onDone } = useLogoutMutation();
        onDone(() => {
            store.commit("clearUser");
        });
        return {
            user,
            loading,
            error,
            logout,
        };
    },
};
</script>
