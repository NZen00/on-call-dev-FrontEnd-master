import { gql } from "@apollo/client";

export const SERVICES = gql`
  query Services {
    services {
      _id
      title
      description
      imageUrl
      price
      creator {
        _id
        firstName
        lastName
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_SERVICE = gql`
  query GET_SERVICE($serviceId: ID!) {
    getService(serviceId: $serviceId) {
      _id
      title
      description
      price
      imageUrl
      createdAt
      location {
        _id
        name
      }
      creator {
        _id
        firstName
        lastName
        avatar
        username
        email
      }
    }
  }
`;

//add service
export const ADD_SERVICE = gql`
  mutation AddService(
    $title: String!
    $description: String!
    $category: String!
    $price: Float!
    $location: String!
    $imageUrl: String!
  ) {
    createService(
      serviceInput: {
        title: $title
        description: $description
        category: $category
        price: $price
        location: $location
        imageUrl: $imageUrl
      }
    ) {
      _id
      title
      category {
        _id
        name
      }
      price
      location {
        _id
        name
      }
      imageUrl
      creator {
        _id
      }
      createdAt
      description
    }
  }
`;

export const CATEGORIES = gql`
  query Categories {
    categories {
      _id
      name
    }
  }
`;

export const GET_CATEGORY = gql`
  query getCategory($categoryId: ID!) {
    getCategory(categoryId: $categoryId) {
      _id
      name
    }
  }
`;

export const GET_SERVICE_BY_CATEGORY_ID = gql`
  query GET_SERVICE_BY_CATEGORY_ID($categoryId: ID!) {
    getServicesByCategory(categoryId: $categoryId) {
      _id
      title
      description
      imageUrl
      price
      category {
        _id
        name
      }
      createdAt
    }
  }
`;

export const LOCATIONS = gql`
  query Locations {
    locations {
      _id
      name
    }
  }
`;

export const GET_LOCATION = gql`
  query Get_Location($locationId: ID!) {
    getLocation(locationId: $locationId) {
      _id
      name
      services {
        _id
        title
        description
        imageUrl
        creator {
          _id
          username
        }
        createdAt
        price
      }
    }
  }
`;
