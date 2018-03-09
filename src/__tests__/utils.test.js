import { insertAt } from '../utils';
import { select } from '../selector';

describe('insertAt', () => {

  const assert = (content, src, expected) => {

    it(`${content} -> ${src} = ${expected}`, () => {
      const { value, start, end } = select(src);
      const result = insertAt(value, { start, end }, content);
      expect(result).toEqual(expected);
    });
  }

  assert('foo', '|', 'foo');
  assert('foo', 'bar|', 'barfoo');
  assert('foo', '|bar', 'foobar');
  assert('foo', 'b[ar]', 'bfoo');

});