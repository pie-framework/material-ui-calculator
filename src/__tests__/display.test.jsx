import renderer from 'react-test-renderer';
import React from 'react';
import Display from '../display';


it('renders correctly', () => {
  const tree = renderer
    .create(<Display showAngleMode={true} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
