<template>
    <div id="gm-login" class="h-9"></div>
</template>

<script lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useGoogleLoginMutation } from "../api/types/types";
export default {
    name: "GoogleLogin",
    setup() {
        const store = useStore();
        const router = useRouter();
        const {
            mutate: googleLogin,
            onDone,
            onError,
        } = useGoogleLoginMutation();
        onMounted(() => {
            // initialize google login button
            google.accounts.id.initialize({
                client_id: import.meta.env.VITE_GM_CLIENT_ID!,
                callback: (response) => {
                    googleLogin({
                        googleToken: response.credential,
                    });
                },
            });

            google.accounts.id.prompt();
            const button = document.getElementById("gm-login");
            // get gm-login element
            google.accounts.id.renderButton(button!, {
                theme: "outline",
                size: "large",
                width: "224",
                type: "standard",
            });
        });

        onError((error) => {
            console.log(error);
        });

        onDone((result) => {
            store.commit("setUser", result!.data!.googleLogin.user);
            store.commit("setToken", result.data!.googleLogin!.token);
            router.push("/");
        });
    },
};
</script>
