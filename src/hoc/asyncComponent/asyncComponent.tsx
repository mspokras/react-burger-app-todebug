import React, { Component } from 'react';

const asyncComponent = (importComponent: $TSFixMe) => {
  return class extends Component {
    state = {
      component: null
    };

    componentDidMount() {
      importComponent().then((cmp: $TSFixMe) => {
        this.setState({ component: cmp.default });
      });
    }

    render() {
      const C = this.state.component;

      // @ts-expect-error TS(2604): JSX element type 'C' does not have any construct o... Remove this comment to see the full error message
      return C ? <C {...this.props} /> : null;
    }
  };
};

export default asyncComponent;
