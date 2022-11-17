import React, { Component } from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Route, Redirect } from 'react-router-dom';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
class Checkout extends Component {
  // state = {
  //   ingredients: null,
  //   price: 0
  // };
  //
  // componentWillMount() {
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredients = {};
  //   let price = null;
  //   for (let param of query.entries()) {
  //     //['Bacon', '1']
  //     if (param[0] === 'price') {
  //       price = param[1];
  //     } else {
  //       ingredients[param[0]] = +param[1];
  //     }
  //   }
  //   this.setState({
  //     ingredients: ingredients,
  //     totalPrice: price
  //   });
  // }

  checkoutCancelledHandler = () => {
    (this.props as $TSFixMe).history.goBack();
  };

  checkoutContinuedHandler = () => {
    (this.props as $TSFixMe).history.replace('/checkout/contact-data');
  };
  render() {
    let summary = <Redirect to="/" />;

    if ((this.props as $TSFixMe).ings) {
      const purchasedRedirect = (this.props as $TSFixMe).purchased ? (<Redirect to="/"/>) : null;
      summary = (<div>
          {purchasedRedirect}
          <CheckoutSummary checkoutCancelled={this.checkoutCancelledHandler} checkoutContinued={this.checkoutContinuedHandler} ingredients={(this.props as $TSFixMe).ings}/>
          <Route path={`${(this.props as $TSFixMe).match.url}/contact-data`} component={ContactData}/>
        </div>);
    }
    return summary;
  }
}

const mapStateToProps = (state: $TSFixMe) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);
