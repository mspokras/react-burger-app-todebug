import React, { Component } from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { connect } from 'react-redux';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Redirect } from 'react-router-dom';
import * as actions from '../../../store/actions/auth';

class Logout extends Component {
  componentDidMount() {
    (this.props as $TSFixMe).onLogout();
  }

  render() {
    return <Redirect to="/" />;
  }
}

const mapDisPatchToProps = (dispatch: $TSFixMe) => {
  return {
    onLogout: () => dispatch(actions.logout())
  };
};

export default connect(null, mapDisPatchToProps)(Logout);
