import renderer from 'react-test-renderer';
import React from 'react';
import SelectableInput from '../selectable-input';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

Enzyme.configure({ adapter: new Adapter() });

describe('selectable-input', () => {
  it('focus', () => {

    const props = {
      inputRef: jest.fn(),
      onSelectionChange: jest.fn(),
      onChange: jest.fn(),
      value: 'test'
    }

    const wrapper = shallow(<SelectableInput {...props} />);
    const mockInput = { focus: jest.fn() }
    wrapper.instance().input = mockInput;
    wrapper.instance().focus();
    expect(mockInput.focus.mock.calls.length).toEqual(1);

  })
});
