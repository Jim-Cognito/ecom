set -e
RED='\033[1;31m'
GREEN='\033[1;32m'
BLUE='\034[1;44m'
LIGHT_BLUE='\033[1;34m'
PURPLE='\033[2;35m'

NO_COLOR='\033[2m'

echo "${LIGHT_BLUE}Generating Schema ⏳${NO_COLOR}"

npm run start &

sleep 10


echo "${GREEN}Done: Generating Schema ✅${NO_COLOR}"

echo "${RED}Generating Queries and Mutations 🛠${NO_COLOR}"

npx amplify-graphql-docs-generator --schema src/schema.graphql --output src --language graphql --separateFiles true --maxDepth 6

rsync src/schema.graphql ../store/src/api/

rsync src/queries.graphql ../store/src/api/
rsync src/mutations.graphql ../store/src/api/

echo "${GREEN}Done: Generating Queries and Mutations ✅${NO_COLOR}"

cd ..

echo "${BLUE}Generating Types 📝${NO_COLOR}"

cd store

pwd

npx graphql-codegen

echo "${GREEN}Done: Generating Types ✅${NO_COLOR}"

cd ..

cd graph

echo "${PURPLE}Code generation completed. 🚀 Server ready at http://localhost:4000/graphql 🪐 Press Ctrl+C to exit.${NO_COLOR}"
tail -f /dev/null