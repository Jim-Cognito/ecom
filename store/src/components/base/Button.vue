<template>
    <button
        class="bg-black text-white h-9 mb-2 w-full"
        @click="!loading ? $emit('click') : ''"
    >
        <slot />
    </button>
</template>

<script lang="ts">
export default {
    name: "Template",
    props: {
        loading: {
            type: Boolean,
            default: false,
        },
    },
    emits: ["click"],
};
</script>
