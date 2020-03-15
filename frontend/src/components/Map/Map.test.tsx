import React from 'react';
import { render } from '@testing-library/react';

import { Map } from './Map';
import { MOCK_INVESTMENTS_RESPONSE } from '../../_mocks_';
import { MapTypes } from '../../types';

describe('Map', () => {
  // Rendering the Deck.GL components isn't working because GL only exists in the browser.
  it.skip('should render', () => {
    const { container } = render(
      <Map
        data={MOCK_INVESTMENTS_RESPONSE}
        handleInvestorClick={() => {}}
        type={MapTypes.Investments}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
