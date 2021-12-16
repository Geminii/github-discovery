import { gql } from '@apollo/client/core';

const REPO_FRAGMENT = gql`
  fragment repo on Repository {
    id
    name
    nameWithOwner
    url
    stargazers {
      totalCount
    }
    viewerHasStarred
    description
    licenseInfo {
      name
    }
    updatedAt
    owner {
      login
      avatarUrl
    }
    primaryLanguage {
      color
      name
    }
    repositoryTopics(first: 10) {
      edges {
        node {
          topic {
            name
          }
        }
      }
    }
  }
`

export const SEARCH_REPOS = gql`
  ${REPO_FRAGMENT}

  query SearchRepoQuery($query: String!, $limit: Int!) {
    search(query: $query, type: REPOSITORY, first: $limit) {
      edges {
        node {
          ...repo
        }
      }
    }
  }
`

export const GET_REPO = gql`
  ${REPO_FRAGMENT}

  query GetRepoQuery($nodeId: ID!) {
    node(id: $nodeId) {
      ...repo
    }
  }
`