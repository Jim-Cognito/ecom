<template>
    <div id="gm-login" class="h-9"></div>
</template>

<script lang="ts">
import { onMounted } from "vue";

export default {
    name: "GoogleLogin",
    emits: ["response"],
    setup(props, { emit }) {
        onMounted(() => {
            // initialize google login button
            google.accounts.id.initialize({
                client_id:
                    "419283728745-4qal7spd25j03u4spd83k40mmvr19h6e.apps.googleusercontent.com",
                callback: (response) => {
                    emit("response", response.credential);
                },
            });
            const button = document.getElementById("gm-login");
            // get gm-login element
            google.accounts.id.renderButton(button, {
                theme: "outline",
                size: "large",
                width: 224,
                height: 36,
            });
            google.accounts.id.prompt();
        });
    },
};
</script>
