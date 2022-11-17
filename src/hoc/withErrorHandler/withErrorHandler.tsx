import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
// @ts-expect-error TS(2307): Cannot find module '../../hoc/Aux/Aux' or its corr... Remove this comment to see the full error message
import Aux from '../../hoc/Aux/Aux';

const withErrorHandler = (WrappedComponent: $TSFixMe, axios: $TSFixMe) => {
  return class extends Component {
    reqInterceptor: $TSFixMe;
    resInterceptor: $TSFixMe;
    state = {
      error: null
    };

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use((req: $TSFixMe) => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(
        (res: $TSFixMe) => res,
        (error: $TSFixMe) => {
          this.setState({ error: error });
        }
      );
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    render() {
      return (<Aux>
          {/* @ts-expect-error TS(2769): No overload matches this call. */}
          <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
            {this.state.error ? (this.state.error as $TSFixMe).message : null}
          </Modal>
          <WrappedComponent {...this.props}/>
        </Aux>);
    }
  };
};

export default withErrorHandler;
