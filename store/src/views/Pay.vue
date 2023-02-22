<template>
    <div class="flex flex-col items-center mt-36">
        <h1 class="mb-6 text-2xl font-serif">Pay</h1>
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
