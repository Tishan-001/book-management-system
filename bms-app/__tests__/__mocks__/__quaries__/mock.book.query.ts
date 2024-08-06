import { MockedResponse } from "@apollo/client/testing";
import { ApolloError } from "@apollo/client";
import { GraphQLError } from "graphql";
import { GET_ALL_BOOKS, GET_BOOK_DETAILS } from "@/lib";
import { allBooksData, bookDetailsData } from "../__data__/mock.book.data";

export const successfulAllBooksMock: MockedResponse[] = [
  {
    request: {
      query: GET_ALL_BOOKS,
    },
    result: {
      data: allBooksData,
    },
  },
];

export const successfulBookDetailsMock: MockedResponse[] = [
  {
    request: {
      query: GET_BOOK_DETAILS,
      variables: { id: "book1" },
    },
    result: {
      data: bookDetailsData,
    },
  },
];

export const erroredAllBooksMock: MockedResponse[] = [
  {
    request: {
      query: GET_ALL_BOOKS,
    },
    error: new ApolloError({
      graphQLErrors: [new GraphQLError("Oops the fetch was unsuccessful!")],
    }),
  },
];

export const erroredBookDetailsMock: MockedResponse[] = [
  {
    request: {
      query: GET_BOOK_DETAILS,
      variables: { id: "book1" },
    },
    error: new ApolloError({
      graphQLErrors: [new GraphQLError("Oops the fetch was unsuccessful!")],
    }),
  },
];
