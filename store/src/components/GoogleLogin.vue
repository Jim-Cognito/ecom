<template>
    <div id="gm-login" class="h-9"></div>
</template>

<script lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useGoogleLoginMutation } from "../api/types/types";
declare class google {
    static accounts: {
        id: {
            initialize: (options: {
                client_id: string;
                callback: (response: { credential: string }) => void;
            }) => void;
            prompt: () => void;
            renderButton: (
                button: HTMLElement,
                options: {
                    theme: string;
                    size: string;
                    width: number;
                    height: number;
                },
            ) => void;
        };
    };
}
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
                client_id:
                    "419283728745-4qal7spd25j03u4spd83k40mmvr19h6e.apps.googleusercontent.com",
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
                width: 224,
                height: 36,
            });
        });

        onError((error) => {
            console.log(error);
        });

        onDone((result) => {
            store.commit("setUser", result!.data!.googleLogin);
            router.push("/");
        });
    },
};
</script>
