import { gql } from '@apollo/client';

// USER QUERIES
export const GET_TOKEN = gql`
  query GetTokenWithUser($password: String!, $email: String!) {
    getTokenWithUser(password: $password, email: $email) {
      token
      user {
        id
        email
        pseudo
        premium
      }
    }
  }
`;

export const GET_LOGGED_USER = gql`
  query GetLoggedUser {
    getLoggedUser {
      id
      email
      pseudo
      premium
    }
  }
`;

export const GET_ONE_USER = gql`
  query Query($getOneUserId: String!) {
    getOneUser(id: $getOneUserId) {
      email
      dailyRuns
      premium
      pseudo
    }
  }
`;

export const GET_DAILY_RUNS = gql`
  query GetDailyRunsUser {
    getDailyRunsUser
  }
`;

export const GET_USER_LIKES = gql`
  query GetMonthlyLikesByUser {
    getMonthlyLikesByUser {
      id
    }
  }
`;

export const GET_USER_COMMENTS = gql`
  query GetMonthlyCommentsByUser {
    getMonthlyCommentsByUser {
      id
    }
  }
`;

// PROJECT QUERIES
export const GET_PROJECTS_BY_USER_ID = gql`
  query Query($userId: String!) {
    getProjectsByUserId(userId: $userId) {
      comments {
        id
        comment
        createdAt
        updatedAt
        user {
          id
          pseudo
        }
      }
      likes {
        user {
          id
          pseudo
        }
      }
      createdAt
      description
      updatedAt
      name
      isPublic
      id
      user {
        id
        pseudo
      }
    }
  }
`;

export const GET_PROJECTS_SUPPORTED = gql`
  query Query($userId: String!) {
    getProjectsSupported(userId: $userId) {
      comments {
        id
        comment
        createdAt
        updatedAt
        user {
          id
          pseudo
        }
      }
      createdAt
      description
      updatedAt
      name
      isPublic
      id
      likes {
        user {
          id
          pseudo
        }
      }
      user {
        id
        pseudo
      }
    }
  }
`;

export const GET_SHARED_PROJECTS = gql`
  query GetSharedProjects(
    $offset: Float!
    $limit: Float!
    $query: String
    $order: String
    $orderBy: String
  ) {
    getSharedProjects(
      offset: $offset
      limit: $limit
      query: $query
      order: $order
      orderBy: $orderBy
    ) {
      id
      name
      description
      updatedAt
      isPublic
      user {
        id
        pseudo
        premium
      }
      likes {
        user {
          id
          pseudo
        }
      }
      comments {
        id
        comment
        createdAt
        updatedAt
        user {
          id
          pseudo
        }
      }
    }
  }
`;

export const GET_FOLDER_BY_IDPROJECT = gql`
  query GetAllFoldersByProjectId($idProject: Float!) {
    getAllFoldersByProjectId(idProject: $idProject) {
      id
      name
      files {
        id
        content
        extension
        name
      }
      parentFolder {
        id
      }
    }
  }
`;

export const GET_ALL_COMMENTS = gql`
  query Query {
    getAllComments {
      id
      comment
      createdAt
    }
  }
`;

export const GET_COMMENTS_BY_IDPROJECT = gql`
  query GetAllCommentsByProjectId($getAllCommentsByProjectIdIdProject: Float!) {
    getAllCommentsByProjectId(idProject: $getAllCommentsByProjectIdIdProject) {
      id
      comment
      createdAt
      updatedAt
      user {
        id
        pseudo
        premium
      }
    }
  }
`;

//Like queries

export const PROJECT_IS_LIKED = gql`
  query Query($idProject: Float!) {
    projectIsLiked(idProject: $idProject)
  }
`;
