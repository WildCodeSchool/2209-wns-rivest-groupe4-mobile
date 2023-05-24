import LoginForm from './LoginForm';
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react-native';
import React from 'react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { gql } from '@apollo/client';
import { AuthContext } from 'contexts/AuthContext';

const GET_TOKEN_DOCUMENT = gql`
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

const VARIABLES = {
  email: 'foo.bar@gmail.com',
  password: 'FooBar123!',
};

const QUERY_REQUEST = {
  request: { query: GET_TOKEN_DOCUMENT, variables: VARIABLES },
  result: {
    data: {
      getTokenWithUser: {
        token: 'token',
        user: {
          id: '1',
          email: 'foo.bar@gmail.com',
          pseudo: 'fooBar',
          premium: false,
        },
      },
    },
  },
};

const MOCKS: Array<MockedResponse> = [QUERY_REQUEST];

describe('LoginForm feature', () => {
  it('should render components by default', async () => {
    render(
      <MockedProvider mocks={MOCKS} addTypename={false}>
        <LoginForm />
      </MockedProvider>,
    );
    expect(await screen.findByPlaceholderText('Password')).toBeDefined();
    expect(screen.getByPlaceholderText('Email')).toBeDefined();
    expect(screen.getByText('Login')).toBeDefined();
    expect(screen.getByText('Stay connected')).toBeDefined();
    expect(screen.getByText("You don't have an account yet ?")).toBeDefined();
    expect(screen.getByText('Register now')).toBeDefined();
  });

  it("should show validation errors if form isn't filled out properly", async () => {
    render(
      <MockedProvider mocks={MOCKS} addTypename={false}>
        <LoginForm />
      </MockedProvider>,
    );
    await act(() => {
      fireEvent.changeText(screen.getByPlaceholderText('Email'), 'foo');
    });
    await act(() => {
      fireEvent.press(screen.getByPlaceholderText('Password'));
    });
    expect(screen.queryByText('Email is invalid')).toBeDefined();
    await act(() => {
      fireEvent.changeText(screen.getByPlaceholderText('Password'), 'bar');
    });
    await act(() => {
      fireEvent.press(screen.getByText('Stay connected'));
    });
    expect(screen.queryByText('Password is too short')).toBeDefined();
  });

  it('displays ActivityIndicator when query is executing', async () => {
    render(
      <MockedProvider mocks={MOCKS} addTypename={false}>
        <LoginForm />
      </MockedProvider>,
    );
    await waitFor(() => {
      fireEvent.changeText(
        screen.getByPlaceholderText('Email'),
        'foo.bar@gmail.com',
      );
    });

    await waitFor(() => {
      fireEvent.changeText(
        screen.getByPlaceholderText('Password'),
        'FooBar123!',
      );
    });

    await waitFor(() => {
      fireEvent.press(screen.getByText('LOGIN'));
    });

    expect(screen.queryByTestId('loader')).not.toBeNull();
  });
});
