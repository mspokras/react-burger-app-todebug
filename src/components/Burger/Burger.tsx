import React from 'react';
//import { withRouter } from 'react-router-dom';

// @ts-expect-error TS(2307): Cannot find module './Burger.css' or its correspon... Remove this comment to see the full error message
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props: $TSFixMe) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  if (transformedIngredients.length === 0) {
    // @ts-expect-error TS(2740): Type 'ReactElement<any, any>' is missing the follo... Remove this comment to see the full error message
    transformedIngredients = <p>Please start adding ingredients!</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

//export default withRouter(burger);
export default burger;
