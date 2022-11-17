import React, { Component } from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
// @ts-expect-error TS(2307): Cannot find module './ContactData.css' or its corr... Remove this comment to see the full error message
import classes from './ContactData.css';
import Input from '../../../components/UI/Input/Input';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as orderActions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

type ContactDataState = $TSFixMe;

class ContactData extends Component<{}, ContactDataState> {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP CODE'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true,
          touched: false
        }
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your mail'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        },
        value: 'fastest',
        validation: {},
        valid: true
      }
    },
    formIsValid: false
  };

  orderHandler = (e: $TSFixMe) => {
    e.preventDefault();
    //alert('You continue!');
    //this.setState({ loading: true });
    const formData = {};
    for (let formElIdentifier /*email, name, country and so on...*/ in this
      .state.orderForm) {
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      formData[formElIdentifier] = this.state.orderForm[formElIdentifier].value;
    }
    const order = {
    ingredients: (this.props as $TSFixMe).ings,
    price: (this.props as $TSFixMe).price,
    orderData: formData,
    userId: (this.props as $TSFixMe).userId
};
    (this.props as $TSFixMe).onOrderBurger(order, (this.props as $TSFixMe).token);
    // const req = async () => {
    //   try {
    //     //error check await axios.post('/orders', order);
    //     await axios.post('/orders.json', order);
    //     this.setState({ loading: false });
    //     this.props.history.push('/');
    //   } catch (err) {
    //     this.setState({ loading: false });
    //   }
    // };
    // req();
  };

  inputChangedHandler = (e: $TSFixMe, inputIdentifier: $TSFixMe) => {
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const updatedFormEl = updateObject(this.state.orderForm[inputIdentifier], {
      value: e.target.value,
      valid: checkValidity(
        e.target.value,
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        this.state.orderForm[inputIdentifier].validation
      ),
      touched: true
    });

    const updatedOrderForm = updateObject(this.state.orderForm, {
      [inputIdentifier]: updatedFormEl
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({
      orderForm: updatedOrderForm,
      formIsValid
    });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formEl => (
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
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          Order
        </Button>
      </form>
    );
    if ((this.props as $TSFixMe).loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Contact data required</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state: $TSFixMe) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = (dispatch: $TSFixMe) => {
  return {
    onOrderBurger: (orderData: $TSFixMe, token: $TSFixMe) =>
      dispatch(orderActions.purchaseBurger(orderData, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(ContactData, axios)
);
