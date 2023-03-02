import AboutMeForm from './AboutMeForm';
import { Image } from 'react-native';
import renderer from 'react-test-renderer';

describe('AboutMeForm feature', () => {
  const setup = renderer.create(<AboutMeForm />);
  it('should render components by default', () => {
    expect(setup.root.findByProps({ placeholder: 'John' })).toBeTruthy();
    expect(setup.root.findByProps({ placeholder: 'JohnDoe123' })).toBeTruthy();
    expect(
      setup.root.findByProps({ placeholder: 'john@doe.com' }),
    ).toBeTruthy();
    expect(
      setup.root.findByProps({ placeholder: '*************' }),
    ).toBeTruthy();
    expect(setup.root.findAllByType(Image)).toHaveLength(4);
  });
});
