import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    schema: "http://localhost:4000/graphql",
    documents: ["./src/api/*.graphql"],
    generates: {
        "src/api/types/graphql.d.ts": {
            plugins: ["typescript-graphql-files-modules"],
        },
        "src/api/types/types.ts": {
            plugins: [
                "typescript",
                "typescript-operations",
                "typescript-vue-apollo",
            ],
        },
    },
    config: {
        avoidOptionals: false,
        withCompositionFunctions: true,
        addDocBlocks: true,
        vueCompositionApiImportFrom: "vue",
    },
};

export default config;
