<template>
    <div class="border w-96 flex justify-center bg-white pt-3 py-6">
        <div class="flex flex-col items-center w-56">
            <label for="email" class="self-start block">Email</label>
            <input
                v-model="input.email"
                name="email"
                type="email"
                class="border block mb-3 w-full"
            />
            <label for="password" class="self-start block">Password</label>
            <input
                v-model="input.password"
                name="password"
                type="password"
                class="border block mb-3 w-full"
            />
            <button
                v-if="!loading"
                @click="login"
                class="bg-black text-white h-9 mb-2 w-full"
            >
                Log In
            </button>
            <button v-else class="bg-black text-white h-9 mb-2 w-full">
                Logging in...
            </button>
            <GoogleLogin />
            <ul v-if="errors" class="mt-2">
                <li
                    class="text-xs text-red-500"
                    v-for="(error, index) in errors"
                    :key="index"
                >
                    {{ error.message }}
                </li>
            </ul>
            <p>
                <router-link to="/register">Register new account</router-link>
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import { reactive, ref } from "vue";
import { useLoginMutation } from "../api/types/types";
import { LoginMutationVariables } from "../api/types/types";
import Schema from "async-validator";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import GoogleLogin from "./GoogleLogin.vue";

interface Error {
    message: string;
    fieldValue: string;
    field: string;
}
export default {
    name: "UserLogin",
    components: {
        GoogleLogin,
    },
    setup(props) {
        const store = useStore();
        const router = useRouter();
        const userInput = reactive<LoginMutationVariables>({
            input: {
                email: "",
                password: "",
            },
        });
        const { input } = userInput;
        const { mutate, loading, onError, onDone } = useLoginMutation();
        const errors = ref<Error[]>([]);
        const validator = new Schema({
            password: {
                type: "string",
                required: true,
                message: "Password is required",
            },
            email: {
                type: "string",
                required: true,
                message: "Email is required",
            },
        });
        const login = () => {
            validator
                .validate(input)
                .then(() => {
                    mutate({
                        input,
                    });
                })
                .catch((error) => {
                    errors.value = error.errors;
                    setTimeout(() => {
                        errors.value = [];
                    }, 5000);
                });
        };

        onDone((result) => {
            store.commit("setUser", result.data!.login!.user);
            store.commit("setToken", result.data!.login!.token);
            router.push("/");
        });

        onError((error) => {
            console.log(error);
        });

        return {
            input,
            login,
            loading,
            errors,
        };
    },
};
</script>
