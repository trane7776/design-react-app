// App.test.jsx
import { render } from '@testing-library/react';
import Home from '../src/components/Home';

describe('App Component', () => {
  test('renders Home page', () => {
    render(<Home />);
  });
});
