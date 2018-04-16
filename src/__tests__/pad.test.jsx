import renderer from 'react-test-renderer';
import React from 'react';
import Pad from '../pad';

it('renders correctly', () => {
  const tree = renderer
    .create(<Pad onClick={jest.fn()} label={'1'} value={'1'} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
