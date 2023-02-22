<template>
    <select class="mt-16" v-model="categoryFilter">
        <option :value="null" selected disabled hidden>Choose category</option>
        <option v-for="category in categories" :key="category">
            {{ category }}
        </option>
    </select>
    <p @click="categoryFilter = null" class="inline">Clear</p>
    <div v-if="loading">Loading...</div>
    <div class="flex flex-wrap justify-around px-6 py-3" v-else>
        <div
            class="border shadow w-48 h-72 mb-3 flex px-3 py-2 hover:shadow-lg font-serif"
            v-for="(product, index) in products"
            :key="index"
        >
            <div class="self-end">
                <p>{{ product.name }}</p>
                <p>{{ product.description }}</p>
                <p>{{ product.price }}</p>
                <Button>Add To Cart</Button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { useListProductsQuery } from "../api/types/types";
import { computed, ref } from "vue";
import Button from "./base/Button.vue";

export default {
    name: "Listing",
    components: { Button },
    setup() {
        const categories = ["Glitter", "Foils", "Sequins", "Stickers", "Tools"];
        const categoryFilter = ref<string | null>(null);
        const { result, loading, onError } = useListProductsQuery(() => ({
            category: categoryFilter.value,
        }));
        const products = computed(
            () => result.value?.listProducts.products ?? [],
        );
        return {
            categories,
            categoryFilter,
            products,
            loading,
        };
    },
};
</script>
