import React, { Component } from 'react';

// @ts-expect-error TS(2307): Cannot find module './Modal.css' or its correspond... Remove this comment to see the full error message
import classes from './Modal.css';
// @ts-expect-error TS(2307): Cannot find module '../../../hoc/Aux/Aux' or its c... Remove this comment to see the full error message
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
  shouldComponentUpdate(nextProps: any, nextState: any) {
    return (nextProps.show !== (this.props as $TSFixMe).show ||
    nextProps.children !== this.props.children);
  }

  render() {
    return (<Aux>
        <Backdrop show={(this.props as $TSFixMe).show} clicked={(this.props as $TSFixMe).modalClosed}/>
        <div className={classes.Modal} style={{
        transform: (this.props as $TSFixMe).show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: (this.props as $TSFixMe).show ? '1' : '0'
    }}>
          {this.props.children}
        </div>
      </Aux>);
  }
}

export default Modal;
