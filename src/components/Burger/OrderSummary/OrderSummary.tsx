import React, { Component } from 'react';

// @ts-expect-error TS(2307): Cannot find module '../../../hoc/Aux/Aux' or its c... Remove this comment to see the full error message
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  //This could be a functional component, does not have to be a class

  render() {
    const ingredientSummary = Object.keys((this.props as $TSFixMe).ingredients).map(igKey => {
    return (<li key={igKey}>
          <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{' '}
          {/* @ts-expect-error TS(2339): Property 'ingredients' does not exist on type 'Rea... Remove this comment to see the full error message */}
          {this.props.ingredients[igKey]}
        </li>);
});
      // @ts-expect-error TS(2304): Cannot find name 'igKey'.
      return (<li key={igKey}>
          {/* @ts-expect-error TS(2304): Cannot find name 'igKey'. */}
          <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{' '}
          {/* @ts-expect-error TS(2304): Cannot find name 'igKey'. */}
          {(this.props as $TSFixMe).ingredients[igKey]}
        </li>);
    });
    // @ts-expect-error TS(7010): 'return', which lacks return-type annotation, impl... Remove this comment to see the full error message
    return (<Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        // @ts-expect-error TS(2304): Cannot find name 'ingredientSummary'.
        <ul>{ingredientSummary}</ul>
        <p>
          {/* @ts-expect-error TS(2532): Object is possibly 'undefined'. */}
          <strong>Total Price: {(this.props as $TSFixMe).price.toFixed(2)}</strong>
        </p>
        <p>Continue to Checkout?</p>
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        <Button btnType="Danger" clicked={(this.props as $TSFixMe).purchaseCancelled}>
          CANCEL
        </Button>
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        <Button btnType="Success" clicked={(this.props as $TSFixMe).purchaseContinued}>
          CONTINUE
        </Button>
      </Aux>);
  }
}

export default OrderSummary;
