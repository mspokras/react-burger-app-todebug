import React from 'react';
// @ts-expect-error TS(2307): Cannot find module './Spinner.css' or its correspo... Remove this comment to see the full error message
import classes from './Spinner.css';
const spinner = () => <div className={classes.Loader}>Loading...</div>;

export default spinner;
