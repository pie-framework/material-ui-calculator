import pink from 'material-ui/colors/pink';
import indigo from 'material-ui/colors/indigo';
import grey from 'material-ui/colors/grey';
import red from 'material-ui/colors/red';

const v = (name, fallback) => `var(--material-ui-calc-${name}, ${fallback})`;

const disabled = v('disabled', grey[500]);
const error = v('error', red[500]);

const primary = {
  light: v('primary-light', indigo[50]),
  main: v('primary-main', indigo[300]),
  dark: v('primary-dark', indigo[900])
};

const secondary = {
  light: v('secondary-light', pink[100]),
  main: v('secondary-main', pink[300]),
  dark: v('secondary-dark', pink[900])
};

export { error, disabled, primary, secondary };
