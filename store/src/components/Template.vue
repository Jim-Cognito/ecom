<template>
    <h1>{{ msg }}</h1>
    <button @click="count++">{{ count }}</button>
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
