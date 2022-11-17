import React from 'react';

// @ts-expect-error TS(2307): Cannot find module '../../assets/images/burger-log... Remove this comment to see the full error message
import burgerLogo from '../../assets/images/burger-logo.png';
// @ts-expect-error TS(2307): Cannot find module './Logo.css' or its correspondi... Remove this comment to see the full error message
import classes from './Logo.css';

const logo = (props: $TSFixMe) => <div className={classes.Logo} style={{height: props.height}}>
    <img src={burgerLogo} alt="MyBurger" />
</div>;

export default logo;