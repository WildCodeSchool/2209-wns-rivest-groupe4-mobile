import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import ContactForm, { SEND_MAIL } from './ContactForm';
import { render, screen } from '@testing-library/react-native';

const mocks: Array<MockedResponse> = [
  { request: { query: SEND_MAIL }, result: { data: {} } },
];

describe('ContactForm feature', () => {
  const setup = () =>
    render(
      <MockedProvider mocks={mocks}>
        <ContactForm />
      </MockedProvider>,
    );

  it('should render components by default', async () => {
    setup();
    expect(await screen.getByPlaceholderText('Enter your name')).toBeDefined();
    expect(await screen.getByPlaceholderText('Enter your mail')).toBeDefined();
    expect(
      await screen.getByPlaceholderText('Explain your problem'),
    ).toBeDefined();
  });
});
