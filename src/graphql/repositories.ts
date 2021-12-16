import { gql } from '@apollo/client/core';

const RELEASES_FRAGMENT = gql`
  fragment releases on Repository {
    releases(last: 5, orderBy: { field: CREATED_AT, direction: DESC }) {
      edges {
        node {
          id
          url
          tagName        
          createdAt
        }
      }
      totalCount
    }
  }
`

const ISSUES_FRAGMENT = gql`
  fragment issues on Repository {
    issues(last: 5, orderBy: { field: UPDATED_AT, direction: ASC }, states: OPEN) {
      edges {
        node {
          id
          number
          url
          title
          createdAt
          author {
            avatarUrl
            login
            url
          }
          bodyText
        }
      }
      totalCount
    }
  }
`

const REPO_FRAGMENT = gql`
  ${ISSUES_FRAGMENT}
  ${RELEASES_FRAGMENT}

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
    ...issues
    ...releases
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