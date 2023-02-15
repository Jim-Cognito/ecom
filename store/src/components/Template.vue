<template>
    <h1>template</h1>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
    name: "Template",
    props: {
        msg: {
            type: String,
            required: true,
        },
    },
    setup() {
        const count = ref(0);
        return {
            count,
        };
    },
};
</script>
