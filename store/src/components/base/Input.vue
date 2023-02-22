<style scoped>
input:focus {
    outline: none !important;
}
</style>
<template>
    <label for="name" class="self-start block font-serif">{{ name }}</label>
    <input
        :value="modelValue"
        @input="updateValue"
        :name="name"
        :type="type"
        class="border block focus:border-black mb-3 w-full px-2 text-md py-1 font-serif"
    />
</template>

<script lang="ts">
export default {
    name: "Input",
    props: {
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        showLabel: {
            type: Boolean,
            default: true,
        },
        modelValue: {
            type: String,
            default: "",
        },
    },
    setup(props, { emit }) {
        const updateValue = ({ target }: any) => {
            emit("update:modelValue", target!.value as any);
        };

        return { updateValue };
    },
};
</script>
