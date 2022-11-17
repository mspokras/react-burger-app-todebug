import React from 'react';

// @ts-expect-error TS(2307): Cannot find module './Button.css' or its correspon... Remove this comment to see the full error message
import classes from './Button.css';

const button = (props: $TSFixMe) => <button
  className={[classes.Button, classes[props.btnType]].join(' ')}
  onClick={props.clicked}
  disabled={props.disabled}
>
  {props.children}
</button>;

export default button;
