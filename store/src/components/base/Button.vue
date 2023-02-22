<template>
    <button
        class="bg-black text-white h-9 mb-2 w-full font-sans"
        @click="!loading ? $emit('click') : ''"
    >
        <slot />
    </button>
</template>

<script lang="ts">
export default {
    name: "Button",
    props: {
        loading: {
            type: Boolean,
            default: false,
        },
    },
    emits: ["click"],
};
</script>
