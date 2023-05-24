import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import AboutMeForm from './AboutMeForm';
import { render, screen } from '@testing-library/react-native';
import { MODIFY_USER } from 'apollo/mutations';
import { UserContext } from 'contexts/UserContext';
import { useContext } from 'react';
import { mockContextUser } from 'contexts/fixtures';

const { user, token } = mockContextUser;
const setUser = jest.fn();
const setToken = jest.fn();

const mocks: Array<MockedResponse> = [
  { request: { query: MODIFY_USER }, result: { data: { user: {} } } },
];

describe('AboutMeForm feature', () => {
  const setup = () =>
    render(
      <UserContext.Provider value={{ user, setUser, token, setToken }}>
        <MockedProvider mocks={mocks}>
          <AboutMeForm />
        </MockedProvider>
      </UserContext.Provider>,
    );
  it('should render components by default', async () => {
    setup();
    expect(await screen.getByDisplayValue('John')).toBeDefined();
    expect(await screen.getByDisplayValue('John.Doe@test.com')).toBeDefined();
    expect(await screen.getByDisplayValue('*************')).toBeDefined();
  });
});
