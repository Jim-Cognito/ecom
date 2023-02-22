<template>
    <p class="text-green-500">{{ user }}</p>
    <div class="text-2xl text-center mt-36 font-serif">Home</div>
</template>
<script lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";

export default {
    name: "Home",
    setup() {
        const store = useStore();
        const user = computed(() => store.state.user);
        return {
            user,
        };
    },
};
</script>
