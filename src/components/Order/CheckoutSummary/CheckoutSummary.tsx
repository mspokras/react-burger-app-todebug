import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
// @ts-expect-error TS(2307): Cannot find module './CheckoutSummary.css' or its ... Remove this comment to see the full error message
import classes from './CheckoutSummary.css';

const checkoutSummary = (props: $TSFixMe) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!!!</h1>
      <div>
        <Burger ingredients={props.ingredients} />
        <Button btnType="Danger" clicked={props.checkoutCancelled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={props.checkoutContinued}>
          CONTINUE
        </Button>
      </div>
    </div>
  );
};

export default checkoutSummary;
