<template>
    <div class="border w-96 flex justify-center bg-white pt-3 py-6">
        <div class="flex flex-col items-center w-56">
            <label for="first-name" class="self-start block">First Name</label>
            <input
                v-model="input.firstName"
                name="first-name"
                type="text"
                class="border block mb-3 w-full"
            />
            <label for="last-name" class="self-start block">Last Name</label>
            <input
                v-model="input.lastName"
                name="last-name"
                type="text"
                class="border block mb-3 w-full"
            />
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
                @click="register"
                class="bg-black text-white h-9 mb-2 w-full"
            >
                Register
            </button>
            <button v-else class="bg-black text-white h-9 mb-2 w-full">
                Loading...
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
                <router-link to="/login"
                    >Log in to existing account</router-link
                >
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import { reactive, ref } from "vue";
import { useRegisterMutation } from "../api/types/types";
import { RegisterMutationVariables } from "../api/types/types";
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
    name: "UserRegister",
    components: {
        GoogleLogin,
    },
    setup(props) {
        const store = useStore();
        const router = useRouter();
        const userInput = reactive<RegisterMutationVariables>({
            input: {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
            },
        });
        const { input } = userInput;
        const { mutate, loading, onError, onDone } = useRegisterMutation();
        const errors = ref<Error[]>([]);
        const validator = new Schema({
            firstName: {
                type: "string",
                required: true,
                message: "First Name is required",
            },
            lastName: {
                type: "string",
                required: true,
                message: "Last name is required",
            },
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
        const register = () => {
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
            store.commit("setUser", result.data!.register!.user);
            store.commit("setToken", result.data!.register!.token);
            router.push("/");
        });

        onError((error) => {
            console.log(error);
        });

        return {
            input,
            register,
            loading,
            errors,
        };
    },
};
</script>
