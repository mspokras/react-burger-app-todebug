import React from 'react';

// @ts-expect-error TS(2307): Cannot find module './Backdrop.css' or its corresp... Remove this comment to see the full error message
import classes from './Backdrop.css';

const backdrop = (props: $TSFixMe) => props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null;

export default backdrop;