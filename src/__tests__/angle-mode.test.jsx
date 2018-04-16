import renderer from 'react-test-renderer';
import AngleMode from '../angle-mode';
import React from 'react';

it('renders correctly', () => {
  const tree = renderer
    .create(<AngleMode angleMode="deg" onChange={jest.fn()} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
