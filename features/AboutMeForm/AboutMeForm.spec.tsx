import AboutMeForm from './AboutMeForm';
import { Image } from 'react-native';
import { render, screen } from '@testing-library/react-native';

describe('AboutMeForm feature', () => {
  const setup = () => render(<AboutMeForm />);
  it('should render components by default', () => {
    setup();
    expect(screen.getByPlaceholderText('John')).toBeDefined();
    expect(screen.getByPlaceholderText('JohnDoe123')).toBeDefined();
    expect(screen.getByPlaceholderText('*************')).toBeDefined();
  });
});
