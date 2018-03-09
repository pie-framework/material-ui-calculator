
export const select = (value) => {

  const pipeIndex = value.indexOf('|');

  if (pipeIndex !== -1) {
    const cleaned = value.substring(0, pipeIndex) + value.substring(pipeIndex + 1);
    return {
      value: cleaned,
      start: pipeIndex,
      end: pipeIndex
    }
  }

  const leftBracketIndex = value.indexOf('[');
  const rightBracketIndex = value.indexOf(']');

  if (leftBracketIndex === -1 && rightBracketIndex === -1) {
    return { value, start: value.length, end: value.length }
  }

  if (
    (leftBracketIndex === -1 && rightBracketIndex !== -1) ||
    (leftBracketIndex !== -1 && rightBracketIndex === -1)
  ) {
    throw new Error('missing open or closing bracket');
  }

  if (leftBracketIndex > rightBracketIndex) {
    throw new Error('left bracket must be before right bracket');
  }

  const cleaned = value.substring(0, leftBracketIndex)
    + value.substring(leftBracketIndex + 1, rightBracketIndex)
    + value.substring(rightBracketIndex + 1);

  return {
    value: cleaned,
    start: leftBracketIndex,
    end: rightBracketIndex - 1
  }
}