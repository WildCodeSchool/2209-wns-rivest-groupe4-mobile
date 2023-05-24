import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import BottomNav from './BottomNav';
import { NavigationContainer } from '@react-navigation/native';
import { render, screen } from '@testing-library/react-native';
import { GET_SHARED_PROJECTS } from 'apollo/queries';

const mocks: Array<MockedResponse> = [
  {
    request: { query: GET_SHARED_PROJECTS },
    result: {
      data: {
        getSharedProjects: {
          id: '',
          name: '',
          description: '',
          updatedAt: '',
          isPublic: null,
          comments: {
            id: null,
          },
          user: {
            id: null,
            pseudo: '',
            premium: null,
          },
          likes: {
            user: {
              id: null,
              pseudo: '',
            },
          },
        },
      },
    },
  },
];

describe('BottomNav feature', () => {
  const setup = () =>
    render(
      <MockedProvider mocks={mocks}>
        <NavigationContainer>
          <BottomNav />
        </NavigationContainer>
      </MockedProvider>,
    );

  it('should render components by default', async () => {
    setup();
    expect(await screen.findAllByRole('button')).toHaveLength(3);
  });
});
