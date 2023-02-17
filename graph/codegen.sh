set -e
RED='\033[0;31m'
GREEN='\033[1;32m'
BLUE='\033[0;36m'
LIGHT_BLUE='\033[0;34m'
PURPLE='\033[1;35m'

NO_COLOR='\033[1m'

echo "${LIGHT_BLUE}Generating Schema ⏳"

npm run start &

sleep 7


echo "${GREEN}Done: Generating Schema ✅"

echo "${RED}Generating Queries and Mutations 🛠"

npx amplify-graphql-docs-generator --schema src/schema.graphql --output src --language graphql --separateFiles true --maxDepth 6

rsync src/schema.graphql ../store/src/api/

rsync src/queries.graphql ../store/src/api/
rsync src/mutations.graphql ../store/src/api/

echo "${GREEN}Done: Generating Queries and Mutations ✅"

cd ..

echo "${BLUE}Generating Types 📝"

cd store

npx graphql-codegen 32402 --trace-warnings ...

echo "${GREEN}Done: Generating Types ✅"

cd ..

cd graph

echo "${GREEN}Code generation completed ⭐️"

echo "${PURPLE} 🚀 Apollo GraphQL Server ready at http://localhost:4000/graphql 🪐"

tail -f /dev/null