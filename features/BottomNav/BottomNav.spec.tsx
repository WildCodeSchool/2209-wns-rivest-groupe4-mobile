import BottomNav from './BottomNav';
import { NavigationContainer } from '@react-navigation/native';
import { render, screen } from '@testing-library/react-native';

describe('BottomNav feature', () => {
  const setup = () =>
    render(
      <NavigationContainer>
        <BottomNav />
      </NavigationContainer>,
    );

  it('should render components by default', async () => {
    setup();
    expect(await screen.findAllByRole('button')).toHaveLength(3);
  });
});
