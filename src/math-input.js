import debug from 'debug';
import { insertAt } from './utils';
import { select } from './selector';
import isRegExp from 'lodash/isRegExp';
import isFunction from 'lodash/isFunction';

import invariant from 'invariant';
const log = debug('@pie-framework:material-ui-calculator:math-input');
const map = {
  0: '⁰',
  1: '¹',
  2: '²',
  3: '³',
  4: '⁴',
  5: '⁵',
  6: '⁶',
  7: '⁷',
  8: '⁸',
  9: '⁹'
};

const fn = n => ({
  match: n,
  emit: `${n}(|)`
});

const INPUTS = [
  {
    match: /^[\+\-\(\)]$/, //eslint-disable-line
    passthrough: true
  },
  {
    match: /^e$/,
    passthrough: true
  },
  {
    match: /\./,
    passthrough: true
  },
  {
    match: '1/x',
    emit: '1/[x]'
  },
  {
    match: /[0-9]/,
    passthrough: true
  },
  {
    match: 'π',
    emit: 'π'
  },
  {
    match: '*',
    emit: '×'
  },
  {
    match: ['sqrt', '√'],
    emit: '√(|)'
  },
  {
    match: '^',
    emit: '[ʸ]',
    superscript: /[0-9]/
  },
  {
    match: 'square',
    emit: map[2]
  },
  {
    match: 'cube',
    emit: map[3]
  },
  fn('sin'),
  fn('cos'),
  fn('tan'),
  fn('asin'),
  fn('acos'),
  fn('atan'),
  fn('log'),
  fn('ln'),
  fn('abs'),
  {
    match: '%',
    emit: '%'
  },
  {
    match: '!',
    emit: '!'
  },
  {
    match: 'ʸ√x',
    emit: '[ʸ]√',
    superscript: /[0-9]/
  },
  {
    match: '/',
    emit: '÷'
  },
  {
    match: 'clear',
    emit: () => ({
      expr: '',
      position: {
        start: 0,
        end: 0
      }
    })
  },
  {
    match: 'plus-minus',
    emit: (expr, position) => {
      const update = expr.indexOf('-') === 0 ? expr.substring(1) : `-${expr}`;
      const added = update.length > expr.length;
      return {
        expr: update,
        position: {
          start: position.start + (added ? 1 : -1),
          end: position.end + (added ? 1 : -1)
        }
      };
    }
  }
];

const getSuperscript = char => map[char];

const buildUpdate = (value, start, end, emit) => {
  const result = select(emit);

  log('[buildUpdate] result: ', result);
  const valueUpdate = insertAt(value, { start, end }, result.value);
  log('[buildUpdate] emitValue: ', valueUpdate);
  return {
    update: valueUpdate,
    start: start + result.start,
    end: start + result.end
  };
};

const isMatch = (match, input) => {
  const m = Array.isArray(match) ? match : [match];

  const matches = m => {
    if (m instanceof RegExp) {
      log('test input: ', input, ' with regex:', m.toString());
      return m.test(input);
    } else {
      return m === input;
    }
  };
  return m.some(matches);
};

export const handleInput = (
  input,
  value,
  selectionStart,
  selectionEnd,
  superscript
) => {
  invariant(
    superscript ? isRegExp(superscript) : true,
    `superscript must be RegExp if defined but got: ${superscript}`
  );

  if (superscript && superscript.test(input)) {
    const sv = getSuperscript(input);
    log('[handleInput] sv: ', sv);
    if (sv) {
      const { update, start, end } = buildUpdate(
        value,
        selectionStart,
        selectionEnd,
        sv
      );
      log('[handleInput] superscript: update: ', update, start, end);
      return {
        value: update,
        selectionStart: update.length,
        selectionEnd: update.length,
        superscript
      };
    }
  }

  const handler = INPUTS.find(v => isMatch(v.match, input));

  if (handler) {
    log('[handleInput] handler: ', handler);

    if (handler.passthrough) {
      return {
        passthrough: true
      };
    } else {
      if (isFunction(handler.emit)) {
        const o = handler.emit(value, {
          start: selectionStart,
          end: selectionEnd
        });
        return {
          value: o.expr,
          selectionStart: o.position.start,
          selectionEnd: o.position.end,
          superscript: o.superscript || superscript
        };
      } else {
        const { update, start, end } = buildUpdate(
          value,
          selectionStart,
          selectionEnd,
          handler.emit
        );
        return {
          value: update,
          selectionStart: start,
          selectionEnd: end,
          superscript: handler.superscript
        };
      }
    }
  }
};
