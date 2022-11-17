import React from 'react';

// @ts-expect-error TS(2307): Cannot find module './BuildControl.css' or its cor... Remove this comment to see the full error message
import classes from './BuildControl.css';

const buildControl = (props: $TSFixMe) => <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button 
        className={classes.Less} 
        onClick={props.removed} 
        disabled={props.disabled}>Less</button>
    <button 
        className={classes.More} 
        onClick={props.added}>More</button>
</div>;

export default buildControl;