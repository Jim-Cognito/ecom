<template>
    <div id="paypal-buttons" class="w-56"></div>
</template>

<script lang="ts">
import { loadScript } from "@paypal/paypal-js";

export default {
    name: "PayPalButtons",
    setup() {
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
                }).render("#paypal-buttons");
            })
            .catch((err) => {
                console.error("Failed to load the PayPal JS SDK script", err);
            });
    },
};
</script>
