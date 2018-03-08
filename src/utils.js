import debug from 'debug';

const log = debug('@pie-framework:material-ui-calculator:utils');

export const insertAt = (src, position, value) => {

  const p = (typeof position) === 'number' ? { start: position, end: position } : position;
  log(position, p);
  const { start, end } = p;
  log('start: ', start, ' end: ', end);
  if (isNaN(start) || isNaN(end)) {
    throw new Error(`start and end must be defined derived: ${JSON.stringify(p)} from ${JSON.stringify(position)}`);
  }

  return [src.slice(0, start), value, src.slice(end)].join('');

}
