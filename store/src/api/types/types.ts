import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from 'vue';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type ReactiveFunction<TParam> = () => TParam;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  token: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  googleLogin: LoginResponse;
  login: LoginResponse;
  register: RegisterResponse;
};


export type MutationGoogleLoginArgs = {
  googleToken: Scalars['String'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};

export type Product = {
  __typename?: 'Product';
  category: Scalars['String'];
  colour?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  id: Scalars['ID'];
  imgUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  price: Scalars['Float'];
  qty: Scalars['Float'];
};

export type ProductResponse = {
  __typename?: 'ProductResponse';
  products: Array<Product>;
};

export type Query = {
  __typename?: 'Query';
  listProducts: ProductResponse;
  whoAmI?: Maybe<User>;
};


export type QueryListProductsArgs = {
  category?: InputMaybe<Scalars['String']>;
};

export type RegisterInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  token: Scalars['String'];
  user: User;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
};

export type GoogleLoginMutationVariables = Exact<{
  googleToken: Scalars['String'];
}>;


export type GoogleLoginMutation = { __typename?: 'Mutation', googleLogin: { __typename?: 'LoginResponse', token: string, user: { __typename?: 'User', email: string, firstName: string, id: string, lastName: string } } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', token: string, user: { __typename?: 'User', email: string, firstName: string, id: string, lastName: string } } };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'RegisterResponse', token: string, user: { __typename?: 'User', email: string, firstName: string, id: string, lastName: string } } };

export type ListProductsQueryVariables = Exact<{
  category?: InputMaybe<Scalars['String']>;
}>;


export type ListProductsQuery = { __typename?: 'Query', listProducts: { __typename?: 'ProductResponse', products: Array<{ __typename?: 'Product', category: string, colour?: string | null, description: string, id: string, imgUrl?: string | null, name: string, price: number, qty: number }> } };

export type WhoAmIQueryVariables = Exact<{ [key: string]: never; }>;


export type WhoAmIQuery = { __typename?: 'Query', whoAmI?: { __typename?: 'User', email: string, firstName: string, id: string, lastName: string } | null };


export const GoogleLoginDocument = gql`
    mutation GoogleLogin($googleToken: String!) {
  googleLogin(googleToken: $googleToken) {
    token
    user {
      email
      firstName
      id
      lastName
    }
  }
}
    `;

/**
 * __useGoogleLoginMutation__
 *
 * To run a mutation, you first call `useGoogleLoginMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useGoogleLoginMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useGoogleLoginMutation({
 *   variables: {
 *     googleToken: // value for 'googleToken'
 *   },
 * });
 */
export function useGoogleLoginMutation(options: VueApolloComposable.UseMutationOptions<GoogleLoginMutation, GoogleLoginMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<GoogleLoginMutation, GoogleLoginMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<GoogleLoginMutation, GoogleLoginMutationVariables>(GoogleLoginDocument, options);
}
export type GoogleLoginMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<GoogleLoginMutation, GoogleLoginMutationVariables>;
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    token
    user {
      email
      firstName
      id
      lastName
    }
  }
}
    `;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLoginMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(options: VueApolloComposable.UseMutationOptions<LoginMutation, LoginMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<LoginMutation, LoginMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
}
export type LoginMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($input: RegisterInput!) {
  register(input: $input) {
    token
    user {
      email
      firstName
      id
      lastName
    }
  }
}
    `;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useRegisterMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(options: VueApolloComposable.UseMutationOptions<RegisterMutation, RegisterMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<RegisterMutation, RegisterMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
}
export type RegisterMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<RegisterMutation, RegisterMutationVariables>;
export const ListProductsDocument = gql`
    query ListProducts($category: String) {
  listProducts(category: $category) {
    products {
      category
      colour
      description
      id
      imgUrl
      name
      price
      qty
    }
  }
}
    `;

/**
 * __useListProductsQuery__
 *
 * To run a query within a Vue component, call `useListProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListProductsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useListProductsQuery({
 *   category: // value for 'category'
 * });
 */
export function useListProductsQuery(variables: ListProductsQueryVariables | VueCompositionApi.Ref<ListProductsQueryVariables> | ReactiveFunction<ListProductsQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<ListProductsQuery, ListProductsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<ListProductsQuery, ListProductsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<ListProductsQuery, ListProductsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<ListProductsQuery, ListProductsQueryVariables>(ListProductsDocument, variables, options);
}
export function useListProductsLazyQuery(variables: ListProductsQueryVariables | VueCompositionApi.Ref<ListProductsQueryVariables> | ReactiveFunction<ListProductsQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<ListProductsQuery, ListProductsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<ListProductsQuery, ListProductsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<ListProductsQuery, ListProductsQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<ListProductsQuery, ListProductsQueryVariables>(ListProductsDocument, variables, options);
}
export type ListProductsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<ListProductsQuery, ListProductsQueryVariables>;
export const WhoAmIDocument = gql`
    query WhoAmI {
  whoAmI {
    email
    firstName
    id
    lastName
  }
}
    `;

/**
 * __useWhoAmIQuery__
 *
 * To run a query within a Vue component, call `useWhoAmIQuery` and pass it any options that fit your needs.
 * When your component renders, `useWhoAmIQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useWhoAmIQuery();
 */
export function useWhoAmIQuery(options: VueApolloComposable.UseQueryOptions<WhoAmIQuery, WhoAmIQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<WhoAmIQuery, WhoAmIQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<WhoAmIQuery, WhoAmIQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<WhoAmIQuery, WhoAmIQueryVariables>(WhoAmIDocument, {}, options);
}
export function useWhoAmILazyQuery(options: VueApolloComposable.UseQueryOptions<WhoAmIQuery, WhoAmIQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<WhoAmIQuery, WhoAmIQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<WhoAmIQuery, WhoAmIQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<WhoAmIQuery, WhoAmIQueryVariables>(WhoAmIDocument, {}, options);
}
export type WhoAmIQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<WhoAmIQuery, WhoAmIQueryVariables>;