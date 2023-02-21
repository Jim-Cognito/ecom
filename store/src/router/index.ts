import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Listing from "../components/Listing.vue";
import AuthTest from "../components/AuthTest.vue";
const routes = [
    // Define your routes here
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
    },
    {
        path: "/products",
        name: "Products",
        component: Listing,
    },
    {
        path: "/auth",
        name: "AuthTest",
        component: AuthTest,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
