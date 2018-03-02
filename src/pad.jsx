import React from 'react';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';

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
    theme,
    style,
    type,
    value,
    onClick } = props;

  const names = classNames(classes.pad, theme && theme.root);


  return (
    <div
      style={style}
      className={names} >
      <IconButton
        className={classes.button}
        onClick={() => onClick(value)}>
        <div dangerouslySetInnerHTML={{ __html: label }} />
      </IconButton>
    </div>
  );
});

export default Pad;
