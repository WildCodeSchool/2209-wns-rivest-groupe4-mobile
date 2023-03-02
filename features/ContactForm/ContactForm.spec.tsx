import ContactForm from './ContactForm';
import { render, screen } from '@testing-library/react-native';

describe('ContactForm feature', () => {
  const setup = () => render(<ContactForm />);
  it('should render components by default', async () => {
    setup();
    expect(screen.getByPlaceholderText('Enter your name')).toBeDefined();
    expect(screen.getByPlaceholderText('Enter your mail')).toBeDefined();
    expect(screen.getByPlaceholderText('Explain your problem')).toBeDefined();
  });
});
