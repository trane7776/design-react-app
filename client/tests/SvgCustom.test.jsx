// App.test.jsx
import { render } from '@testing-library/react';
import Svg from '../src/components/SvgCustom';

describe('App Component', () => {
  test('renders Svg editor', () => {
    render(<Svg />);
  });
});
