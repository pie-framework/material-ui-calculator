import React from 'react';
import Calculator from '../index';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { calculate } from '@pie-framework/expression-parser';

jest.mock('@pie-framework/expression-parser', () => {
  return {
    calculate: jest.fn().mockReturnValue({ value: '1', error: undefined }),
    AngleMode: { DEGREES: 'deg', RADIANS: 'rad' }
  }
});

Enzyme.configure({ adapter: new Adapter() })

describe('Calculator', () => {

  let wrapper, props;

  beforeEach(() => {
    props = {
      onEvaluationComplete: jest.fn(),
      mode: 'basic'
    }
    wrapper = shallow(<Calculator {...props} />);
  });

  describe('onEvaluate', () => {

    beforeEach(() => {
      calculate.mockReset();
      calculate.mockReturnValue({ value: '1', error: undefined });
      wrapper.instance().onEvaluate('1 + 1', 'rad');
    });

    it('calls calculate', () => {
      expect(calculate.mock.calls[0][0]).toEqual('1 + 1');
    });

    it('call onEvaluationComplete', () => {
      expect(props.onEvaluationComplete.mock.calls[0][0]).toEqual('1 + 1', '1')
    });

    it('sets the state', () => {
      expect(wrapper.state().expr).toEqual('1');
    });

    it('uses the angle mode', () => {

      wrapper.setState({ angleMode: 'deg' });
      calculate.mockReset();
      calculate.mockReturnValue({ value: '1', error: undefined });
      wrapper.instance().onEvaluate('1 + 1');

      expect(calculate.mock.calls.length).toEqual(1);
      expect(calculate.mock.calls[0][1]).toEqual({ angleMode: 'deg' });
    });

    describe('with error', () => {
      let error;

      beforeEach(() => {
        error = {
          e: new Error('foo')
        }

        calculate.mockReturnValue({ value: undefined, error });
        wrapper.instance().onEvaluate('1 + 1', 'rad');
      });

      it('sets the error', () => {
        expect(wrapper.state().error).toEqual(error);
      });
    });
  });
});
