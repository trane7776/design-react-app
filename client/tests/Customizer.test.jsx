// App.test.jsx
import { render } from '@testing-library/react';
import Custom from '../src/components/Customizer';

describe('App Component', () => {
  test('renders Customizer of design', () => {
    render(<Custom />);
  });
});
