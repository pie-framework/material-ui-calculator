import renderer from 'react-test-renderer';
import React from 'react';
import Scientific from '../scientific';

it('renders correctly', () => {
  const tree = renderer.create(<Scientific onInput={jest.fn()} />).toJSON();
  expect(tree).toMatchSnapshot();
});
