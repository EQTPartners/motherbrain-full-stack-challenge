import React from 'react';
import { render } from '@testing-library/react';

import { App } from './App';

describe('App', () => {
  // Rendering the Deck.GL components isn't working because GL only exists in the browser.
  it.skip('should render', () => {
    const { container } = render(<App />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
