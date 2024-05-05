// App.test.jsx
import { render } from '@testing-library/react';
import ColorPicker from '../src/components/ColorPicker';

describe('App Component', () => {
  test('renders Color picker', () => {
    render(<ColorPicker />);
  });
});
