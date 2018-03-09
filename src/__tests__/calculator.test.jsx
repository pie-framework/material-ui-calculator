import React from 'react';
import { Calculator } from '../calculator';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import TextField from 'material-ui/TextField';
import { handleInput } from '../math-input';

jest.mock('../math-input', () => {
  return {
    handleInput: jest.fn().mockReturnValue({ value: '', selectionStart: 0, selectionEnd: 0 })
  }
});

const mockEvent = (d) => ({
  stopPropagation: jest.fn(),
  preventDefault: jest.fn(),
  ...d
})

Enzyme.configure({ adapter: new Adapter() })

describe('calculator', () => {

  let wrapper, props, mockInput;

  beforeEach(() => {
    props = {
      angleMode: 'rad',
      onAngleModeChange: jest.fn(),
      expr: '1 + 1',
      onEvaluate: jest.fn(),
      classes: {}
    }

    mockInput = {
      focus: jest.fn()
    }

    wrapper = shallow(<Calculator {...props} />);
    wrapper.instance().input = mockInput;
  });

  describe('onInput', () => {

    beforeEach(() => {
      handleInput.mockReset();
    });

    it('calls onEvaluate for equals', () => {
      wrapper.instance().onInput('equals');
      expect(props.onEvaluate.mock.calls[0][0]).toEqual('1 + 1');
    });

    describe('handleInput', () => {
      beforeEach(() => {
        handleInput.mockReturnValue({ value: 'a', selectionStart: 1, selectionEnd: 1 });
        wrapper.instance().onInput('a');
      });

      it('calls handleInput', () => {
        expect(handleInput.mock.calls[0][0]).toEqual('a');
      });

      it('updates the state', () => {
        expect(wrapper.state().expr).toEqual('a');
      });

    });
  });

  describe('onKeyDown', () => {


    let e;

    const assertEnter = key => {
      describe(key, () => {
        beforeEach(() => {
          e = mockEvent({ key });
          wrapper.instance().onKeyDown(e);
        });

        it('calls onEvaluate on enter', () => {
          expect(props.onEvaluate.mock.calls.length).toEqual(1);
        });

        it('calls preventDefault', () => {
          expect(e.preventDefault.mock.calls.length).toEqual(1);
        });

        it('calls stopPropagation', () => {
          expect(e.stopPropagation.mock.calls.length).toEqual(1);
        });

      });
    }

    assertEnter('Enter');
    assertEnter('=');

    describe('other keys', () => {
      describe('handleInput', () => {
        beforeEach(() => {
          handleInput.mockReset();
          handleInput.mockReturnValue({ value: 'a', selectionStart: 0, selectionEnd: 0 })
          wrapper.instance().onKeyDown(mockEvent({ key: 'a' }));
        });

        it('calls handleInput', () => {
          expect(handleInput.mock.calls[0][0]).toEqual('a');
        });

        it('sets expr', () => {
          expect(wrapper.state().expr).toEqual('a');
        });
      });

      describe('handleInput passthrough', () => {
        beforeEach(() => {
          handleInput.mockReset();
          handleInput.mockReturnValue({ passthrough: true });
          wrapper.instance().onKeyDown(mockEvent({ key: 'b' }));
        });

        it('calls handleInput', () => {
          expect(handleInput.mock.calls[0][0]).toEqual('b');
        });

        it('does not update the state', () => {
          expect(wrapper.state().expr).toEqual('1 + 1');
        });

      });
    });

  });

  describe('onBlur', () => {
    it('sets focused to false ', () => {
      wrapper.instance().onBlur();
      expect(wrapper.state().focused).toBe(false);
    });
  });

  describe('onFocus', () => {
    it('sets focused to true', () => {
      wrapper.instance().onFocus();
      expect(wrapper.state().focused).toBe(true);
    });
  });
});