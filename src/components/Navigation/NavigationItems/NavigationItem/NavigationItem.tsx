import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { NavLink } from 'react-router-dom';

// @ts-expect-error TS(2307): Cannot find module './NavigationItem.css' or its c... Remove this comment to see the full error message
import classes from './NavigationItem.css';

const navigationItem = (props: $TSFixMe) => <li className={classes.NavigationItem}>
  <NavLink
    to={props.link}
    exact={props.exact}
    activeClassName={classes.active}
  >
    {props.children}
  </NavLink>
</li>;

export default navigationItem;
