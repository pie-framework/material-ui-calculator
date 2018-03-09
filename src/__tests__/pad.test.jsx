import renderer from 'react-test-renderer';
import React from 'react';
import Pad from '../pad';


it('renders correctly', () => {
  const tree = renderer
    .create(<Pad>1</Pad>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
