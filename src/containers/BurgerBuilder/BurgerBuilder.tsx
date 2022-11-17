import React, { Component } from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { connect } from 'react-redux';

// @ts-expect-error TS(2307): Cannot find module '../../hoc/Aux/Aux' or its corr... Remove this comment to see the full error message
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

type BurgerBuilderState = $TSFixMe;

export class BurgerBuilder extends Component<{}, BurgerBuilderState> {
  // constructor(props) {
  //     super(props);
  //     this.state = {...}
  // }
  state = {
    purchasing: false
  };

  componentDidMount() {
    (this.props as $TSFixMe).onInitIngredients();
  }

  updatePurchaseState(ingredients: $TSFixMe) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    //this.setState({ purchasable: sum > 0 });
    return sum > 0;
  }

  // addIngredientHandler = type => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //   this.updatePurchaseState(updatedIngredients);
  // };
  //
  // removeIngredientHandler = type => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceDeduction = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceDeduction;
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //   this.updatePurchaseState(updatedIngredients);
  // };

  purchaseHandler = () => {
    if ((this.props as $TSFixMe).isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      (this.props as $TSFixMe).onSetAuthRedirectPath('/checkout');
      (this.props as $TSFixMe).history.push('/auth');
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // const queryParams = [];
// for (let i in this.state.ingredients) {
//   queryParams.push(
//     encodeURIComponent(i) +
//       '=' +
//       encodeURIComponent(this.state.ingredients[i])
//   );
// }
// queryParams.push(`price=${this.props.price}`);
//const queryString = queryParams.join('&');
// this.props.history.push({
//   pathname: '/checkout',
//   search: `?${queryString}` //'?' + queryString
// });
(this.props as $TSFixMe).onInitPurchase();
    (this.props as $TSFixMe).history.push({
    pathname: '/checkout'
});
  };

  render() {
    const disabledInfo = {
    ...(this.props as $TSFixMe).ings
};
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = (this.props as $TSFixMe).error ? (<p>Ingredients couldn't be loaded</p>) : (<Spinner />);

    if ((this.props as $TSFixMe).ings) {
      burger = (<Aux>
          <Burger ingredients={(this.props as $TSFixMe).ings}/>
          <BuildControls ingredientAdded={(this.props as $TSFixMe).onIngredientAdded} ingredientRemoved={(this.props as $TSFixMe).onIngredientRemoved} disabled={disabledInfo} purchasable={this.updatePurchaseState((this.props as $TSFixMe).ings)} ordered={this.purchaseHandler} isAuth={(this.props as $TSFixMe).isAuthenticated} price={(this.props as $TSFixMe).price}/>
        </Aux>);
      // @ts-expect-error TS(2769): No overload matches this call.
      orderSummary = (<OrderSummary ingredients={(this.props as $TSFixMe).ings} price={(this.props as $TSFixMe).price} purchaseCancelled={this.purchaseCancelHandler} purchaseContinued={this.purchaseContinueHandler}/>);
    }
    return (
      <Aux>
        <Modal
          // @ts-expect-error TS(2769): No overload matches this call.
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state: $TSFixMe) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = (dispatch: $TSFixMe) => {
  return {
    onIngredientAdded: (ingName: $TSFixMe) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName: $TSFixMe) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path: $TSFixMe) => dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(BurgerBuilder, axios)
);
