import renderer from 'react-test-renderer';
import React from 'react';
import Basic from '../basic';


it('renders correctly', () => {
  const tree = renderer
    .create(<Basic />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
