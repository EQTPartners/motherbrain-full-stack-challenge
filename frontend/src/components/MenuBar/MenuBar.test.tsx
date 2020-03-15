import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MenuBar } from './MenuBar';

describe('MenuBar', () => {
  it('should render', () => {
    const { container } = render(
      <MenuBar isBackArrowVisible={true} handleBackButtonClick={() => {}} title="test title" />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should have the correct title', () => {
    const { getByLabelText } = render(
      <MenuBar isBackArrowVisible={true} handleBackButtonClick={() => {}} title="test title" />,
    );
    const element = getByLabelText('title');
    expect(element.innerHTML).toEqual('test title');
  });

  it('should not have an arrow when prop is set to false', () => {
    const { queryByLabelText } = render(
      <MenuBar isBackArrowVisible={false} handleBackButtonClick={() => {}} title="test title" />,
    );
    expect(queryByLabelText('back-icon')).not.toBeInTheDocument();
  });

  it('should have an arrow when prop is set to true', () => {
    const { getByLabelText } = render(
      <MenuBar isBackArrowVisible={true} handleBackButtonClick={() => {}} title="test title" />,
    );
    expect(getByLabelText('back-icon')).toBeInTheDocument();
  });

  it('should fire a click event when clicked', () => {
    const mockClickHandler = jest.fn();
    const { getByLabelText } = render(
      <MenuBar
        isBackArrowVisible={true}
        handleBackButtonClick={mockClickHandler}
        title="test title"
      />,
    );
    const button = getByLabelText('back-icon');
    fireEvent.click(button);
    expect(mockClickHandler).toHaveBeenCalledTimes(1);
  });
});
