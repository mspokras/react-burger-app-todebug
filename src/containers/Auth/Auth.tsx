import React, { Component } from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { connect } from 'react-redux';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Redirect } from 'react-router-dom';

import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
// @ts-expect-error TS(2307): Cannot find module './Auth.css' or its correspondi... Remove this comment to see the full error message
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';

type AuthState = $TSFixMe;

class Auth extends Component<{}, AuthState> {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignup: true
  };

  componentDidMount() {
    if (!(this.props as $TSFixMe).buildingBurger && (this.props as $TSFixMe).authRedirectPath !== '/') {
      (this.props as $TSFixMe).onSetAuthRedirectPath();
    }
  }

  //nested objects old/new values
  inputChangedHandler = (event: $TSFixMe, controlName: $TSFixMe) => {
    const updatedControls = updateObject(this.state.controls, {
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          this.state.controls[controlName].validation
        ),
        touched: true
      })
    });
    this.setState({
      controls: updatedControls
    });
  };

  submitHandler = (event: $TSFixMe) => {
    event.preventDefault();
    (this.props as $TSFixMe).onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
  };

  switchAuthModeHandler = () => {
    this.setState((prevState: $TSFixMe) => {
      return {
        isSignup: !prevState.isSignup
      };
    });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        config: this.state.controls[key]
      });
    }

    let form = formElementsArray.map(formEl => (
      <Input
        key={formEl.id}
        elementType={formEl.config.elementType}
        elementConfig={formEl.config.elementConfig}
        value={formEl.config.value}
        changed={(e: $TSFixMe) => this.inputChangedHandler(e, formEl.id)}
        invalid={!formEl.config.valid}
        shouldValidate={formEl.config.validation}
        touched={formEl.config.touched}
      />
    ));

    if ((this.props as $TSFixMe).loading) {
      // @ts-expect-error TS(2740): Type 'ReactElement<any, any>' is missing the follo... Remove this comment to see the full error message
      form = <Spinner />;
    }

    let errorMessage = null;
    if ((this.props as $TSFixMe).error) {
      errorMessage = <p>{(this.props as $TSFixMe).error.message}</p>;
    }

    let authRedirect = null;
    if ((this.props as $TSFixMe).isAuthenticated) {
      authRedirect = <Redirect to={(this.props as $TSFixMe).authRedirectPath}/>;
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">Submit</Button>
        </form>
        <Button clicked={this.switchAuthModeHandler} btnType="Danger">
          Switch to {this.state.isSignup ? 'Sign in' : 'Sign up'}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state: $TSFixMe) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = (dispatch: $TSFixMe) => {
  return {
    onAuth: (email: $TSFixMe, password: $TSFixMe, isSignup: $TSFixMe) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
