<template>
    <div class="border w-96 flex justify-center bg-white pt-3 py-6 font-serif">
        <div class="flex flex-col items-center w-56">
            <Input name="Email" type="email" />
            <Input name="Password" type="password" />
            <Button :loading="loading" @click="login">{{
                loading ? "Logging In..." : "Login"
            }}</Button>
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
import Button from "./base/Button.vue";
import Input from "./base/Input.vue";

interface Error {
    message: string;
    fieldValue: string;
    field: string;
}
export default {
    name: "UserLogin",
    components: {
        GoogleLogin,
        Button,
        Input,
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
