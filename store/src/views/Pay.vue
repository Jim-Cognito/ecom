<template>
    <div class="flex flex-col items-center mt-36">
        <PayPalButtons />
    </div>
</template>

<script lang="ts">
import PayPalButtons from "../components/PayPalButtons.vue";

export default {
    name: "Pay",
    components: { PayPalButtons },
};
</script>
