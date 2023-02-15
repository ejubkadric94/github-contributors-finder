import { render } from '@testing-library/react';
import App from './App';

describe('<App />', () => {
    it('renders App div', () => {
      const { container } = render(<App />);
      const appElement = container.getElementsByClassName('App')[0];
      expect(appElement).toBeInTheDocument();
    });
});
