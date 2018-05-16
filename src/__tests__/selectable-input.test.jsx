import renderer from 'react-test-renderer';
import React from 'react';
import SelectableInput from '../selectable-input';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TextField from '@material-ui/core/TextField';

Enzyme.configure({ adapter: new Adapter() });

let mockInput, props;

describe('selectable-input', () => {
  const mkWrapper = () => {
    props = {
      inputRef: jest.fn(),
      onSelectionChange: jest.fn(),
      onChange: jest.fn(),
      value: 'test',
      inputRef: jest.fn(),
      onKeyDown: jest.fn()
    };

    const out = shallow(<SelectableInput {...props} />);

    mockInput = {
      focus: jest.fn(),
      selectionStart: 1,
      selectionEnd: 2
    };

    out.instance().inputRef(mockInput);
    return out;
  };

  describe('TextField', () => {
    it('disabledUnderline: true', () => {
      const wrapper = mkWrapper();
      expect(wrapper.find(TextField).prop('InputProps')).toMatchObject({
        disableUnderline: true
      });
    });
  });

  describe('focus', () => {
    it('calls input.focus', () => {
      const wrapper = mkWrapper();
      wrapper.instance().focus();
      expect(mockInput.focus.mock.calls.length).toEqual(1);
    });
  });

  describe('onKeyUp', () => {
    it('calls onSelectionChange', () => {
      const wrapper = mkWrapper();
      wrapper.find(TextField).prop('onKeyUp')();
      expect(props.onSelectionChange.mock.calls[0][0]).toEqual({
        selectionStart: 1,
        selectionEnd: 2
      });
    });
  });

  describe('onChange', () => {
    it('calls onChange', () => {
      const wrapper = mkWrapper();
      wrapper.find(TextField).prop('onChange')({
        target: { value: 'v', selectionStart: 0, selectionEnd: 1 }
      });

      expect(props.onChange.mock.calls[0][0]).toEqual({
        target: {
          value: 'v',
          selectionStart: 0,
          selectionEnd: 1
        }
      });
    });
  });

  describe('onClick', () => {
    it('calls selectionChange', () => {
      const wrapper = mkWrapper();
      wrapper.find(TextField).prop('onClick')();
      expect(props.onSelectionChange.mock.calls[0][0]).toEqual({
        selectionStart: 1,
        selectionEnd: 2
      });
    });
  });

  describe('inputRef', () => {
    it('calls props.inputRef', () => {
      expect(props.inputRef.mock.calls.length).toEqual(1);
    });
  });

  describe('onKeyDown', () => {
    it('calls props.onKeyDown', () => {
      const wrapper = mkWrapper();
      const e = {
        target: { value: 'target' }
      };

      wrapper.find(TextField).prop('onKeyDown')(e);
      expect(props.onKeyDown.mock.calls[0][0]).toEqual(e);
    });
  });
});
