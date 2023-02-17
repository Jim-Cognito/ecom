<template>
    <select v-model="categoryFilter">
        <option :value="null" selected disabled hidden>Choose category</option>
        <option v-for="category in categories" :key="category">
            {{ category }}
        </option>
    </select>
    <p @click="categoryFilter = null">Clear</p>
    <div v-if="loading">Loading...</div>
    <div style="display: flex; flex-wrap: wrap" v-else>
        <div
            style="
                color: blue;
                text-align: center;
                border: solid black 1px;
                width: 360px;
            "
            v-for="(product, index) in products"
            :key="index"
        >
            <p>{{ product.name }}</p>
            <p>{{ product.description }}</p>
            <p>{{ product.price }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import { useListProductsQuery } from "../api/types/types";
import { computed, ref } from "vue";

export default {
    name: "Listing",
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
