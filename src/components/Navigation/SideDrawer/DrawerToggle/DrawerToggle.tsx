import React from 'react';

// @ts-expect-error TS(2307): Cannot find module './DrawerToggle.css' or its cor... Remove this comment to see the full error message
import classes from './DrawerToggle.css';

const drawerToggle = (props: $TSFixMe) => <div className={classes.DrawerToggle} onClick={props.clicked}>
    <div></div>
    <div></div>
    <div></div>
</div>;

export default drawerToggle;