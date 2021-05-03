import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
      token
      type
      tokenExpiration
    }
  }
`;

export const SIGNUP = gql`
  mutation SignUp(
    $username: String!
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
    $phone: String!
    $avatar: String!
    $address: String!
    $type: String!
  ) {
    createUser(
      userInput: {
        username: $username
        email: $email
        firstName: $firstName
        lastName: $lastName
        password: $password
        phone: $phone
        type: $type
        avatar: $avatar
        address: $address
      }
    ) {
      _id
      firstName
      lastName
      username
      email
      avatar
      phone
      address
    }
  }
`;

export const GET_USER = gql`
  query GetUser {
    getUser {
      _id
      firstName
      lastName
      username
      email
      password
      type
      avatar
      phone
      address
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $userId: ID!
    $username: String
    $email: String
    $phone: String
    $firstName: String
    $lastName: String
    $address: String
  ) {
    updateUserById(
      userId: $userId
      updateUserInput: {
        username: $username
        email: $email
        phone: $phone
        firstName: $firstName
        lastName: $lastName
        address: $address
      }
    ) {
      _id
      firstName
      lastName
      username
      email
      password
      type
      avatar
      phone
      address
    }
  }
`;
