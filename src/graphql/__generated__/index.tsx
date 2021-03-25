import { GraphQLResolveInfo } from "graphql";
import { ApolloClientContext } from "src/graphql/types";
import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} &
  { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Address = {
  __typename?: "Address";
  county: Scalars["String"];
  state: Scalars["String"];
};

export type Node = {
  id: Scalars["ID"];
};

export type Company = Node & {
  __typename?: "Company";
  id: Scalars["ID"];
  address: Address;
  logo: Scalars["String"];
  name: Scalars["String"];
  purpose: Scalars["String"];
  url: Scalars["String"];
};

export type Displayed = {
  title: Scalars["String"];
};

export type Use = Displayed &
  Node & {
    __typename?: "Use";
    id: Scalars["ID"];
    title: Scalars["String"];
  };

export type Language = Displayed &
  Node & {
    __typename?: "Language";
    id: Scalars["ID"];
    title: Scalars["String"];
    url: Scalars["String"];
    logo: Scalars["String"];
  };

export type Tool = Displayed &
  Node & {
    __typename?: "Tool";
    id: Scalars["ID"];
    languages?: Maybe<Array<Language>>;
    logo: Scalars["String"];
    title: Scalars["String"];
    url: Scalars["String"];
    use: Use;
  };

export type History = Node & {
  __typename?: "History";
  id: Scalars["ID"];
  children?: Maybe<Array<History>>;
  utilization?: Maybe<Scalars["Int"]>;
  title: Scalars["String"];
  values: Array<Displayed>;
};

export type Experience = Node & {
  __typename?: "Experience";
  id: Scalars["ID"];
  accomplishments: Array<Scalars["String"]>;
  company: Company;
  days: Scalars["Int"];
  endDate?: Maybe<Scalars["String"]>;
  hidden: Scalars["Boolean"];
  histories: Array<History>;
  jobType: Scalars["String"];
  index: Scalars["Int"];
  role: Scalars["String"];
  startDate: Scalars["String"];
  sampleWorks: Array<SampleWork>;
};

export type SampleWork = Node & {
  __typename?: "SampleWork";
  id: Scalars["ID"];
  image: Scalars["String"];
  caption: Scalars["String"];
  thumbnail: Scalars["Boolean"];
};

export type Skill = Node & {
  __typename?: "Skill";
  id: Scalars["ID"];
  experience: Experience;
  languages?: Maybe<Array<Language>>;
  title: Scalars["String"];
  utilization: Scalars["Int"];
  value: Displayed;
  values: Array<Displayed>;
};

export type DisplayedNode = Tool | Language | Use;

export type Query = {
  __typename?: "Query";
  experiences: Array<Experience>;
  experience?: Maybe<Experience>;
  skills: Array<Skill>;
  skill?: Maybe<Skill>;
};

export type QueryExperienceArgs = {
  id: Scalars["ID"];
};

export type QuerySkillArgs = {
  id: Scalars["ID"];
};

export type HistoryFieldsFragment = { __typename?: "History" } & Pick<
  History,
  "id" | "title" | "utilization"
> & {
    values: Array<
      | ({ __typename?: "Use" } & Pick<Use, "id" | "title">)
      | ({ __typename?: "Language" } & Pick<Language, "id" | "title" | "url">)
      | ({ __typename?: "Tool" } & Pick<Tool, "id" | "title" | "url"> & {
            languages?: Maybe<
              Array<{ __typename?: "Language" } & Pick<Language, "id">>
            >;
            use: { __typename?: "Use" } & Pick<Use, "id">;
          })
    >;
  };

export type ExperienceFieldsFragment = { __typename?: "Experience" } & Pick<
  Experience,
  | "id"
  | "accomplishments"
  | "days"
  | "endDate"
  | "hidden"
  | "index"
  | "role"
  | "startDate"
> & {
    company: { __typename?: "Company" } & Pick<
      Company,
      "id" | "name" | "purpose" | "url"
    > & {
        address: { __typename?: "Address" } & Pick<Address, "county" | "state">;
      };
    histories: Array<
      { __typename?: "History" } & {
        children?: Maybe<
          Array<
            { __typename?: "History" } & {
              children?: Maybe<
                Array<
                  { __typename?: "History" } & {
                    children?: Maybe<
                      Array<{ __typename?: "History" } & HistoryFieldsFragment>
                    >;
                  } & HistoryFieldsFragment
                >
              >;
            } & HistoryFieldsFragment
          >
        >;
      } & HistoryFieldsFragment
    >;
    sampleWorks: Array<
      { __typename?: "SampleWork" } & Pick<
        SampleWork,
        "id" | "caption" | "image" | "thumbnail"
      >
    >;
  };

export type ExperiencesGetQueryVariables = Exact<{ [key: string]: never }>;

export type ExperiencesGetQuery = { __typename?: "Query" } & {
  experiences: Array<{ __typename?: "Experience" } & ExperienceFieldsFragment>;
};

export type ExperienceGetQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type ExperienceGetQuery = { __typename?: "Query" } & {
  experience?: Maybe<{ __typename?: "Experience" } & ExperienceFieldsFragment>;
};

type SkillValueFields_Tool_Fragment = { __typename?: "Tool" } & Pick<
  Tool,
  "id" | "logo" | "title" | "url"
> & { use: { __typename?: "Use" } & Pick<Use, "id"> };

type SkillValueFields_Language_Fragment = { __typename?: "Language" } & Pick<
  Language,
  "id" | "title" | "logo" | "url"
>;

type SkillValueFields_Use_Fragment = { __typename?: "Use" } & Pick<
  Use,
  "id" | "title"
>;

export type SkillValueFieldsFragment =
  | SkillValueFields_Tool_Fragment
  | SkillValueFields_Language_Fragment
  | SkillValueFields_Use_Fragment;

export type SkillFieldsFragment = { __typename?: "Skill" } & Pick<
  Skill,
  "id" | "title" | "utilization"
> & {
    experience: { __typename?: "Experience" } & Pick<Experience, "id"> & {
        company: { __typename?: "Company" } & Pick<Company, "id" | "name">;
      };
    languages?: Maybe<
      Array<
        { __typename?: "Language" } & Pick<Language, "id" | "title" | "logo">
      >
    >;
    value:
      | ({ __typename?: "Use" } & SkillValueFields_Use_Fragment)
      | ({ __typename?: "Language" } & SkillValueFields_Language_Fragment)
      | ({ __typename?: "Tool" } & SkillValueFields_Tool_Fragment);
    values: Array<
      | ({ __typename?: "Use" } & SkillValueFields_Use_Fragment)
      | ({ __typename?: "Language" } & SkillValueFields_Language_Fragment)
      | ({ __typename?: "Tool" } & SkillValueFields_Tool_Fragment)
    >;
  };

export type SkillsGetQueryVariables = Exact<{ [key: string]: never }>;

export type SkillsGetQuery = { __typename?: "Query" } & {
  skills: Array<{ __typename?: "Skill" } & SkillFieldsFragment>;
};

export type SkillGetQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type SkillGetQuery = { __typename?: "Query" } & {
  skill?: Maybe<{ __typename?: "Skill" } & SkillFieldsFragment>;
};

export type WriteQueryQueryVariables = Exact<{ [key: string]: never }>;

export type WriteQueryQuery = { __typename?: "Query" } & {
  experiences: Array<{ __typename?: "Experience" } & ExperienceFieldsFragment>;
  skills: Array<{ __typename?: "Skill" } & SkillFieldsFragment>;
};

export const HistoryFieldsFragmentDoc = gql`
  fragment HistoryFields on History {
    id
    title
    utilization
    values {
      ... on Tool {
        id
        languages {
          id
        }
        title
        url
        use {
          id
        }
      }
      ... on Language {
        id
        title
        url
      }
      ... on Use {
        id
        title
      }
    }
  }
`;
export const ExperienceFieldsFragmentDoc = gql`
  fragment ExperienceFields on Experience {
    id
    accomplishments
    company {
      id
      address {
        county
        state
      }
      name
      purpose
      url
    }
    days
    histories {
      ...HistoryFields
      children {
        ...HistoryFields
        children {
          ...HistoryFields
          children {
            ...HistoryFields
          }
        }
      }
    }
    endDate
    hidden
    index
    role
    startDate
    sampleWorks {
      id
      caption
      image
      thumbnail
    }
  }
  ${HistoryFieldsFragmentDoc}
`;
export const SkillValueFieldsFragmentDoc = gql`
  fragment SkillValueFields on DisplayedNode {
    ... on Tool {
      id
      logo
      title
      url
      use {
        id
      }
    }
    ... on Language {
      id
      title
      logo
      url
    }
    ... on Use {
      id
      title
    }
  }
`;
export const SkillFieldsFragmentDoc = gql`
  fragment SkillFields on Skill {
    id
    title
    experience {
      id
      company {
        id
        name
      }
    }
    languages {
      id
      title
      logo
    }
    utilization
    value {
      ...SkillValueFields
    }
    values {
      ...SkillValueFields
    }
  }
  ${SkillValueFieldsFragmentDoc}
`;
export const ExperiencesGetDocument = gql`
  query ExperiencesGet {
    experiences {
      ...ExperienceFields
    }
  }
  ${ExperienceFieldsFragmentDoc}
`;

/**
 * __useExperiencesGetQuery__
 *
 * To run a query within a React component, call `useExperiencesGetQuery` and pass it any options that fit your needs.
 * When your component renders, `useExperiencesGetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExperiencesGetQuery({
 *   variables: {
 *   },
 * });
 */
export function useExperiencesGetQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ExperiencesGetQuery,
    ExperiencesGetQueryVariables
  >,
) {
  return Apollo.useQuery<ExperiencesGetQuery, ExperiencesGetQueryVariables>(
    ExperiencesGetDocument,
    baseOptions,
  );
}
export function useExperiencesGetLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ExperiencesGetQuery,
    ExperiencesGetQueryVariables
  >,
) {
  return Apollo.useLazyQuery<ExperiencesGetQuery, ExperiencesGetQueryVariables>(
    ExperiencesGetDocument,
    baseOptions,
  );
}
export type ExperiencesGetQueryHookResult = ReturnType<
  typeof useExperiencesGetQuery
>;
export type ExperiencesGetLazyQueryHookResult = ReturnType<
  typeof useExperiencesGetLazyQuery
>;
export type ExperiencesGetQueryResult = Apollo.QueryResult<
  ExperiencesGetQuery,
  ExperiencesGetQueryVariables
>;
export const ExperienceGetDocument = gql`
  query ExperienceGet($id: ID!) {
    experience(id: $id) @client {
      ...ExperienceFields
    }
  }
  ${ExperienceFieldsFragmentDoc}
`;

/**
 * __useExperienceGetQuery__
 *
 * To run a query within a React component, call `useExperienceGetQuery` and pass it any options that fit your needs.
 * When your component renders, `useExperienceGetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExperienceGetQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useExperienceGetQuery(
  baseOptions: Apollo.QueryHookOptions<
    ExperienceGetQuery,
    ExperienceGetQueryVariables
  >,
) {
  return Apollo.useQuery<ExperienceGetQuery, ExperienceGetQueryVariables>(
    ExperienceGetDocument,
    baseOptions,
  );
}
export function useExperienceGetLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ExperienceGetQuery,
    ExperienceGetQueryVariables
  >,
) {
  return Apollo.useLazyQuery<ExperienceGetQuery, ExperienceGetQueryVariables>(
    ExperienceGetDocument,
    baseOptions,
  );
}
export type ExperienceGetQueryHookResult = ReturnType<
  typeof useExperienceGetQuery
>;
export type ExperienceGetLazyQueryHookResult = ReturnType<
  typeof useExperienceGetLazyQuery
>;
export type ExperienceGetQueryResult = Apollo.QueryResult<
  ExperienceGetQuery,
  ExperienceGetQueryVariables
>;
export const SkillsGetDocument = gql`
  query SkillsGet {
    skills {
      ...SkillFields
    }
  }
  ${SkillFieldsFragmentDoc}
`;

/**
 * __useSkillsGetQuery__
 *
 * To run a query within a React component, call `useSkillsGetQuery` and pass it any options that fit your needs.
 * When your component renders, `useSkillsGetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSkillsGetQuery({
 *   variables: {
 *   },
 * });
 */
export function useSkillsGetQuery(
  baseOptions?: Apollo.QueryHookOptions<
    SkillsGetQuery,
    SkillsGetQueryVariables
  >,
) {
  return Apollo.useQuery<SkillsGetQuery, SkillsGetQueryVariables>(
    SkillsGetDocument,
    baseOptions,
  );
}
export function useSkillsGetLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SkillsGetQuery,
    SkillsGetQueryVariables
  >,
) {
  return Apollo.useLazyQuery<SkillsGetQuery, SkillsGetQueryVariables>(
    SkillsGetDocument,
    baseOptions,
  );
}
export type SkillsGetQueryHookResult = ReturnType<typeof useSkillsGetQuery>;
export type SkillsGetLazyQueryHookResult = ReturnType<
  typeof useSkillsGetLazyQuery
>;
export type SkillsGetQueryResult = Apollo.QueryResult<
  SkillsGetQuery,
  SkillsGetQueryVariables
>;
export const SkillGetDocument = gql`
  query SkillGet($id: ID!) {
    skill(id: $id) @client {
      ...SkillFields
    }
  }
  ${SkillFieldsFragmentDoc}
`;

/**
 * __useSkillGetQuery__
 *
 * To run a query within a React component, call `useSkillGetQuery` and pass it any options that fit your needs.
 * When your component renders, `useSkillGetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSkillGetQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSkillGetQuery(
  baseOptions: Apollo.QueryHookOptions<SkillGetQuery, SkillGetQueryVariables>,
) {
  return Apollo.useQuery<SkillGetQuery, SkillGetQueryVariables>(
    SkillGetDocument,
    baseOptions,
  );
}
export function useSkillGetLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SkillGetQuery,
    SkillGetQueryVariables
  >,
) {
  return Apollo.useLazyQuery<SkillGetQuery, SkillGetQueryVariables>(
    SkillGetDocument,
    baseOptions,
  );
}
export type SkillGetQueryHookResult = ReturnType<typeof useSkillGetQuery>;
export type SkillGetLazyQueryHookResult = ReturnType<
  typeof useSkillGetLazyQuery
>;
export type SkillGetQueryResult = Apollo.QueryResult<
  SkillGetQuery,
  SkillGetQueryVariables
>;
export const WriteQueryDocument = gql`
  query WriteQuery {
    experiences {
      ...ExperienceFields
    }
    skills {
      ...SkillFields
    }
  }
  ${ExperienceFieldsFragmentDoc}
  ${SkillFieldsFragmentDoc}
`;

/**
 * __useWriteQueryQuery__
 *
 * To run a query within a React component, call `useWriteQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useWriteQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWriteQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useWriteQueryQuery(
  baseOptions?: Apollo.QueryHookOptions<
    WriteQueryQuery,
    WriteQueryQueryVariables
  >,
) {
  return Apollo.useQuery<WriteQueryQuery, WriteQueryQueryVariables>(
    WriteQueryDocument,
    baseOptions,
  );
}
export function useWriteQueryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    WriteQueryQuery,
    WriteQueryQueryVariables
  >,
) {
  return Apollo.useLazyQuery<WriteQueryQuery, WriteQueryQueryVariables>(
    WriteQueryDocument,
    baseOptions,
  );
}
export type WriteQueryQueryHookResult = ReturnType<typeof useWriteQueryQuery>;
export type WriteQueryLazyQueryHookResult = ReturnType<
  typeof useWriteQueryLazyQuery
>;
export type WriteQueryQueryResult = Apollo.QueryResult<
  WriteQueryQuery,
  WriteQueryQueryVariables
>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Address: ResolverTypeWrapper<Address>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Node:
    | ResolversTypes["Company"]
    | ResolversTypes["Use"]
    | ResolversTypes["Language"]
    | ResolversTypes["Tool"]
    | ResolversTypes["History"]
    | ResolversTypes["Experience"]
    | ResolversTypes["SampleWork"]
    | ResolversTypes["Skill"];
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  Company: ResolverTypeWrapper<Company>;
  Displayed:
    | ResolversTypes["Use"]
    | ResolversTypes["Language"]
    | ResolversTypes["Tool"];
  Use: ResolverTypeWrapper<Use>;
  Language: ResolverTypeWrapper<Language>;
  Tool: ResolverTypeWrapper<Tool>;
  History: ResolverTypeWrapper<History>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  Experience: ResolverTypeWrapper<Experience>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  SampleWork: ResolverTypeWrapper<SampleWork>;
  Skill: ResolverTypeWrapper<Skill>;
  DisplayedNode:
    | ResolversTypes["Tool"]
    | ResolversTypes["Language"]
    | ResolversTypes["Use"];
  Query: ResolverTypeWrapper<{}>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Address: Address;
  String: Scalars["String"];
  Node:
    | ResolversParentTypes["Company"]
    | ResolversParentTypes["Use"]
    | ResolversParentTypes["Language"]
    | ResolversParentTypes["Tool"]
    | ResolversParentTypes["History"]
    | ResolversParentTypes["Experience"]
    | ResolversParentTypes["SampleWork"]
    | ResolversParentTypes["Skill"];
  ID: Scalars["ID"];
  Company: Company;
  Displayed:
    | ResolversParentTypes["Use"]
    | ResolversParentTypes["Language"]
    | ResolversParentTypes["Tool"];
  Use: Use;
  Language: Language;
  Tool: Tool;
  History: History;
  Int: Scalars["Int"];
  Experience: Experience;
  Boolean: Scalars["Boolean"];
  SampleWork: SampleWork;
  Skill: Skill;
  DisplayedNode:
    | ResolversParentTypes["Tool"]
    | ResolversParentTypes["Language"]
    | ResolversParentTypes["Use"];
  Query: {};
};

export type AddressResolvers<
  ContextType = ApolloClientContext,
  ParentType extends ResolversParentTypes["Address"] = ResolversParentTypes["Address"]
> = {
  county: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  state: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NodeResolvers<
  ContextType = ApolloClientContext,
  ParentType extends ResolversParentTypes["Node"] = ResolversParentTypes["Node"]
> = {
  __resolveType: TypeResolveFn<
    | "Company"
    | "Use"
    | "Language"
    | "Tool"
    | "History"
    | "Experience"
    | "SampleWork"
    | "Skill",
    ParentType,
    ContextType
  >;
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
};

export type CompanyResolvers<
  ContextType = ApolloClientContext,
  ParentType extends ResolversParentTypes["Company"] = ResolversParentTypes["Company"]
> = {
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  address: Resolver<ResolversTypes["Address"], ParentType, ContextType>;
  logo: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  purpose: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  url: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DisplayedResolvers<
  ContextType = ApolloClientContext,
  ParentType extends ResolversParentTypes["Displayed"] = ResolversParentTypes["Displayed"]
> = {
  __resolveType: TypeResolveFn<
    "Use" | "Language" | "Tool",
    ParentType,
    ContextType
  >;
  title: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type UseResolvers<
  ContextType = ApolloClientContext,
  ParentType extends ResolversParentTypes["Use"] = ResolversParentTypes["Use"]
> = {
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  title: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LanguageResolvers<
  ContextType = ApolloClientContext,
  ParentType extends ResolversParentTypes["Language"] = ResolversParentTypes["Language"]
> = {
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  title: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  url: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  logo: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ToolResolvers<
  ContextType = ApolloClientContext,
  ParentType extends ResolversParentTypes["Tool"] = ResolversParentTypes["Tool"]
> = {
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  languages: Resolver<
    Maybe<Array<ResolversTypes["Language"]>>,
    ParentType,
    ContextType
  >;
  logo: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  title: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  url: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  use: Resolver<ResolversTypes["Use"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HistoryResolvers<
  ContextType = ApolloClientContext,
  ParentType extends ResolversParentTypes["History"] = ResolversParentTypes["History"]
> = {
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  children: Resolver<
    Maybe<Array<ResolversTypes["History"]>>,
    ParentType,
    ContextType
  >;
  utilization: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  title: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  values: Resolver<Array<ResolversTypes["Displayed"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExperienceResolvers<
  ContextType = ApolloClientContext,
  ParentType extends ResolversParentTypes["Experience"] = ResolversParentTypes["Experience"]
> = {
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  accomplishments: Resolver<
    Array<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  company: Resolver<ResolversTypes["Company"], ParentType, ContextType>;
  days: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  endDate: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  hidden: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  histories: Resolver<
    Array<ResolversTypes["History"]>,
    ParentType,
    ContextType
  >;
  jobType: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  index: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  role: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  startDate: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  sampleWorks: Resolver<
    Array<ResolversTypes["SampleWork"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SampleWorkResolvers<
  ContextType = ApolloClientContext,
  ParentType extends ResolversParentTypes["SampleWork"] = ResolversParentTypes["SampleWork"]
> = {
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  image: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  caption: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  thumbnail: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SkillResolvers<
  ContextType = ApolloClientContext,
  ParentType extends ResolversParentTypes["Skill"] = ResolversParentTypes["Skill"]
> = {
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  experience: Resolver<ResolversTypes["Experience"], ParentType, ContextType>;
  languages: Resolver<
    Maybe<Array<ResolversTypes["Language"]>>,
    ParentType,
    ContextType
  >;
  title: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  utilization: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  value: Resolver<ResolversTypes["Displayed"], ParentType, ContextType>;
  values: Resolver<Array<ResolversTypes["Displayed"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DisplayedNodeResolvers<
  ContextType = ApolloClientContext,
  ParentType extends ResolversParentTypes["DisplayedNode"] = ResolversParentTypes["DisplayedNode"]
> = {
  __resolveType: TypeResolveFn<
    "Tool" | "Language" | "Use",
    ParentType,
    ContextType
  >;
};

export type QueryResolvers<
  ContextType = ApolloClientContext,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  experiences: Resolver<
    Array<ResolversTypes["Experience"]>,
    ParentType,
    ContextType
  >;
  experience: Resolver<
    Maybe<ResolversTypes["Experience"]>,
    ParentType,
    ContextType,
    RequireFields<QueryExperienceArgs, "id">
  >;
  skills: Resolver<Array<ResolversTypes["Skill"]>, ParentType, ContextType>;
  skill: Resolver<
    Maybe<ResolversTypes["Skill"]>,
    ParentType,
    ContextType,
    RequireFields<QuerySkillArgs, "id">
  >;
};

export type Resolvers<ContextType = ApolloClientContext> = {
  Address: AddressResolvers<ContextType>;
  Node: NodeResolvers<ContextType>;
  Company: CompanyResolvers<ContextType>;
  Displayed: DisplayedResolvers<ContextType>;
  Use: UseResolvers<ContextType>;
  Language: LanguageResolvers<ContextType>;
  Tool: ToolResolvers<ContextType>;
  History: HistoryResolvers<ContextType>;
  Experience: ExperienceResolvers<ContextType>;
  SampleWork: SampleWorkResolvers<ContextType>;
  Skill: SkillResolvers<ContextType>;
  DisplayedNode: DisplayedNodeResolvers<ContextType>;
  Query: QueryResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<
  ContextType = ApolloClientContext
> = Resolvers<ContextType>;
