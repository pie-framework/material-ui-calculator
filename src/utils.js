
export const insertAt = (src, position, value) => {

  console.log(typeof position);
  const p = (typeof position) === 'number' ? { start: position, end: position } : position;
  console.log(position, p);
  const { start, end } = p;
  console.log('start: ', start, ' end: ', end);
  if (isNaN(start) || isNaN(end)) {
    throw new Error(`start and end must be defined derived: ${JSON.stringify(p)} from ${JSON.stringify(position)}`);
  }

  return [src.slice(0, start), value, src.slice(end)].join('');

}
