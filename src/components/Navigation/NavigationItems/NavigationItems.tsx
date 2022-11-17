import React from 'react';

// @ts-expect-error TS(2307): Cannot find module './NavigationItems.css' or its ... Remove this comment to see the full error message
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props: $TSFixMe) => <ul className={classes.NavigationItems}>
  <NavigationItem link="/" exact>
    Burger Builder
  </NavigationItem>
  {props.isAuthenticated ? (
    <NavigationItem link="/orders">Orders</NavigationItem>
  ) : null}
  {props.isAuthenticated ? (
    <NavigationItem link="/logout">Logout</NavigationItem>
  ) : (
    <NavigationItem link="/auth">Authenticate</NavigationItem>
  )}
</ul>;

export default navigationItems;
