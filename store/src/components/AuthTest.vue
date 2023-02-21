<template>
    <div>
        <p class="text-green-500">{{ user }}</p>
        <p class="text-red-500">{{ error }}</p>
        <button
            v-if="!loading"
            @click="logout({})"
            class="bg-black text-white h-9 mb-2 w-full"
        >
            Log Out
        </button>
        <button v-else class="bg-black text-white h-9 mb-2 w-full">
            Logging out...
        </button>
    </div>
</template>

<script lang="ts">
import { ApolloError } from "@apollo/client/errors";
import { ref, computed } from "vue";
import { useWhoAmIQuery, useLogoutMutation } from "../api/types/types";
import { useStore } from "vuex";

export default {
    name: "AuthTest",
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
