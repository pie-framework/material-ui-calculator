import React from 'react';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import classNames from 'classnames';

const input = value => ({ label: value, value });

const items = [
  { label: 'C', value: 'clear' },
  { label: '±', value: 'plus-minus' },
  { label: '%', value: 'percent' },
  { label: '&#247;', value: '/', style: 'operator' },
  input('7'),
  input('8'),
  input('9'),
  { label: '&#215;', value: '*', style: 'operator' },
  input('4'),
  input('5'),
  input('6'),
  { label: '-', value: '-', style: 'operator' },
  input('1'),
  input('2'),
  input('3'),
  { label: '+', value: '+', style: 'operator' },
  input('0'),
  input('.'),
  { label: '=', value: 'equals', style: 'operator' },
]

const Pad = withStyles(theme => ({
  pad: {
    backgroundColor: theme.palette.primary[50]
  },
  button: {
    width: '100%'
  },
  operator: {
    backgroundColor: 'orange'
  }
}))((props) => {
  const {
    label,
    classes,
    style,
    type,
    value,
    onClick } = props;

  const positionStyle = (label === '0') ? {
    gridColumn: '1/3'
  } : {};
  const names = classNames(classes.pad, classes[style]);


  return (
    <div
      style={positionStyle}
      className={names} >
      <IconButton
        className={classes.button}
        onClick={() => onClick(value)}>
        <div dangerouslySetInnerHTML={{ __html: label }} />
      </IconButton>
    </div>
  );
});

export class NewPad extends React.Component {
  render() {
    const { classes, onInput } = this.props;

    const handlers = { onInput, onDelete, onEquals, onClear };

    return (
      <div className={classes.pad}>
        {items.map((i, index) => (
          <Pad key={index}
            {...i}
            onClick={onInput}
            {...handlers}
          />
        ))}
      </div>
    );
  }
}

export default withStyles(theme => ({
  pad: {
    gridGap: '1px',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)'
  }
}))(NewPad);
