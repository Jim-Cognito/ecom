<template>
    <p class="text-green-500">{{ user }}</p>
    <p class="text-red-500">{{ error }}</p>
</template>

<script lang="ts">
import { ApolloError } from "@apollo/client/errors";
import { ref, computed } from "vue";
import { useWhoAmIQuery } from "../api/types/types";

export default {
    name: "AuthTest",
    setup() {
        const { result, loading, onError } = useWhoAmIQuery({
            fetchPolicy: "no-cache",
        });
        const error = ref<ApolloError | null>(null);
        onError((e) => {
            error.value = e;
        });
        const user = computed(() => result.value?.whoAmI ?? null);
        return {
            user,
            loading,
            error,
        };
    },
};
</script>
