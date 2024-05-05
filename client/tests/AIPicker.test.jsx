// App.test.jsx
import { render } from '@testing-library/react';
import AIPicker from '../src/components/AIPicker';

describe('App Component', () => {
  test('renders Aipicker', () => {
    render(<AIPicker />);
  });
});
