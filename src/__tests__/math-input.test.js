import { handleInput } from '../math-input';
import { select } from '../selector';
import debug from 'debug';

const log = debug('@pie-framework:material-ui-calculator:test');

describe('handleInput', () => {

  const assert = (input, current, expected) => {

    it(`'${input}' -> '${current}' = '${expected}'`, () => {
      const v = select(current);
      const e = select(expected);
      const result = handleInput(input, v.value, v.start, v.end);
      expect(result.value).toEqual(e.value);
      expect(result.selectionStart).toEqual(e.start);
      expect(result.selectionEnd).toEqual(e.end);
    });
  }

  describe('1/x', () => {
    assert('1/x', '0 + |', '0 + 1/[x]');
    assert('1/x', '[0 + ]', '1/[x]');
    assert('1/x', '[0] +', '1/[x] +');
  });

  describe('sin', () => {
    assert('sin', '1 * |', '1 * sin(|)');
  });

  describe('sqrt', () => {
    assert('sqrt', '1 + [2]', '1 + √(|)');
  });

});