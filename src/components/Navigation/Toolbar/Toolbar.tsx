import React from 'react';

// @ts-expect-error TS(2307): Cannot find module './Toolbar.css' or its correspo... Remove this comment to see the full error message
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props: $TSFixMe) => <header className={classes.Toolbar}>
  <DrawerToggle clicked={props.drawerToggleClicked} />
  <div className={classes.Logo}>
    <Logo />
  </div>
  <nav className={classes.DesktopOnly}>
    <NavigationItems isAuthenticated={props.isAuth} />
  </nav>
</header>;

export default toolbar;
