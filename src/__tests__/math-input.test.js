import { handleInput } from '../math-input';
import { select } from '../selector';
import debug from 'debug';

const log = debug('@pie-framework:material-ui-calculator:test');

describe('handleInput', () => {

  const assert = (input, current, expected, superscript) => {

    it(`'${input}' -> '${current}' = '${expected}'`, () => {
      const v = select(current);
      const e = select(expected);
      const result = handleInput(input, v.value, v.start, v.end, superscript);
      log('result: ', result);
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

  describe('pi', () => {
    assert('π', '1 * |', '1 * π|');
  });

  describe('^', () => {
    assert('^', '1|', '1[ʸ]');
    assert('1', '1[ʸ]', '1¹|', /1/);
    assert('2', '1¹|', '1¹²|', /[0-9]/);
  });

  describe('clear', () => {
    assert('clear', '[f00]000', '|');
  });

  describe('plus-minus', () => {
    assert('plus-minus', '1', '-1');
    assert('plus-minus', '-1', '1');
    assert('plus-minus', '1[00]', '-1[00]');
    assert('plus-minus', '-1[00]', '1[00]');
  })

});