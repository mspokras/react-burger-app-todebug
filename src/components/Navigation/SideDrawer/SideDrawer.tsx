import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
// @ts-expect-error TS(2307): Cannot find module './SideDrawer.css' or its corre... Remove this comment to see the full error message
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
// @ts-expect-error TS(2307): Cannot find module '../../../hoc/Aux/Aux' or its c... Remove this comment to see the full error message
import Aux from '../../../hoc/Aux/Aux';

const sideDrawer = (props: $TSFixMe) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(' ')} onClick={props.closed}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
