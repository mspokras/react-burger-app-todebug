import React, { Component } from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { connect } from 'react-redux';

// @ts-expect-error TS(2307): Cannot find module '../Aux/Aux' or its correspondi... Remove this comment to see the full error message
import Aux from '../Aux/Aux';
// @ts-expect-error TS(2307): Cannot find module './Layout.css' or its correspon... Remove this comment to see the full error message
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

type LayoutState = $TSFixMe;

class Layout extends Component<{}, LayoutState> {
  state = {
    showSideDrawer: false
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState((prevState: $TSFixMe) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (<Aux>
        <Toolbar isAuth={(this.props as $TSFixMe).isAuthenticated} drawerToggleClicked={this.sideDrawerToggleHandler}/>
        <SideDrawer isAuth={(this.props as $TSFixMe).isAuthenticated} open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>);
  }
}

const mapStateToProps = (state: $TSFixMe) => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);
