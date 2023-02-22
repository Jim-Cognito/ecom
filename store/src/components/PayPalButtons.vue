<template>
    <div class="absolute mt-16" v-if="loading">Loading PayPal...</div>
    <div id="paypal-buttons" class="w-56"></div>
</template>

<script lang="ts">
import { loadScript } from "@paypal/paypal-js";
import { ref } from "vue";

export default {
    name: "PayPalButtons",
    setup() {
        const loading = ref(true);
        loadScript({
            "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID!,
            components: "buttons",
        })
            .then((paypal) => {
                // start to use the PayPal JS SDK script paypal
                paypal!.Buttons!({
                    style: {
                        label: "pay",
                    },
                })
                    .render("#paypal-buttons")
                    .finally(() => {
                        loading.value = false;
                    });
            })
            .catch((err) => {
                console.error("Failed to load the PayPal JS SDK script", err);
            });
        return {
            loading,
        };
    },
};
</script>
