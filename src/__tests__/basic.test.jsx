import renderer from 'react-test-renderer';
import React from 'react';
import Basic from '../basic';

it('renders correctly', () => {
  const tree = renderer.create(<Basic onInput={jest.fn()} />).toJSON();
  expect(tree).toMatchSnapshot();
});
