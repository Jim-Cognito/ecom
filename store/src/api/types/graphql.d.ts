
declare module '*/mutations.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const Login: DocumentNode;
export const Register: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/queries.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const ListProducts: DocumentNode;
export const WhoAmI: DocumentNode;

  export default defaultDocument;
}
    