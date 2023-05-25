import { gql } from '@apollo/client';

// USER MUTATIONS
export const MODIFY_USER = gql`
  mutation ModifyUser($pseudo: String, $password: String, $email: String) {
    modifyUser(pseudo: $pseudo, password: $password, email: $email) {
      token
      user {
        id
        email
        pseudo
      }
    }
  }
`;

// PROJECT MUTATIONS
export const CREATE_PROJECT = gql`
  mutation CreateProject(
    $description: String!
    $name: String!
    $public: Boolean!
  ) {
    createProject(description: $description, name: $name, isPublic: $public) {
      id
    }
  }
`;

export const UPDATE_PUBLIC_STATE = gql`
  mutation Mutation($modifyProjectId: Float!, $isPublic: Boolean) {
    modifyProject(id: $modifyProjectId, isPublic: $isPublic) {
      id
      isPublic
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation DeleteProject($deleteProjectId: Float!) {
    deleteProject(id: $deleteProjectId)
  }
`;

// COMMENT MUTATIONS

export const DELETE_COMMENT = gql`
  mutation Mutation($idComment: Float!) {
    deleteComment(idComment: $idComment)
  }
`;

export const MODIFY_COMMENT = gql`
  mutation Mutation($content: String!, $idComment: Float!) {
    modifyComment(content: $content, idComment: $idComment) {
      comment
      project {
        id
        comments {
          id
          comment
          updatedAt
        }
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation Mutation($idProject: Float!, $comment: String!) {
    addComment(idProject: $idProject, comment: $comment) {
      comment
      createdAt
      id
      updatedAt
      user {
        premium
        id
        pseudo
      }
      project {
        id
        comments {
          id
        }
      }
    }
  }
`;

// LIKE MUTATIONS

export const ADD_LIKE = gql`
  mutation Mutation($idProject: Float!) {
    addLike(idProject: $idProject) {
      project {
        id
        likes {
          id
        }
      }
    }
  }
`;

export const DELETE_LIKE = gql`
  mutation DeleteLike($idProject: Float!) {
    deleteLike(idProject: $idProject)
  }
`;
