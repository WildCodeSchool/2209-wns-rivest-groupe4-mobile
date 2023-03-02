import ContactForm from './ContactForm';
import renderer from 'react-test-renderer';

describe('ContactForm feature', () => {
  const setup = renderer.create(<ContactForm />);
  it('should render components by default', async () => {
    expect(
      setup.root.findByProps({ placeholder: 'Enter your name' }),
    ).toBeTruthy();
    expect(
      setup.root.findByProps({ placeholder: 'Enter your mail' }),
    ).toBeTruthy();
    expect(
      setup.root.findByProps({ placeholder: 'Explain your problem' }),
    ).toBeTruthy();
  });
});
