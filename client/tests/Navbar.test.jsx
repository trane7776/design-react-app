// App.test.jsx
import { render } from '@testing-library/react';
import NavBar from '../src/components/Navbar';

describe('App Component', () => {
  test('renders Navbar', () => {
    render(<NavBar />);
  });
});
