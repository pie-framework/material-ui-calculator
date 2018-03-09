import { select } from '../selector';

describe('selector', () => {

  const assert = (input, value, start, end) => {

    end = end === undefined ? start : end;

    it(`'${input}' -> '${value}',${start},${end}`, () => {
      expect(select(input)).toEqual({ value, start, end });
    });
  }

  assert('hi', 'hi', 2);
  assert('|', '', 0);
  assert('hi th|ere', 'hi there', 5);
  assert('hi|', 'hi', 2);
  assert('[hi]', 'hi', 0, 2);

  assert('[hello]', 'hello', 0, 5);
  assert('[]hello', 'hello', 0);
  assert('[he]llo', 'hello', 0, 2);
  assert('h[e]llo', 'hello', 1, 2);
  assert('hel[lo]', 'hello', 3, 5);

  assert('hel[]lo', 'hello', 3);

  it('throws an error', () => {
    expect(() => select('[test')).toThrowError();
  });

  it('throws an error', () => {
    expect(() => select('test]')).toThrowError();
  });

  it('throws an error', () => {
    expect(() => select('tes][t')).toThrowError();
  });
});