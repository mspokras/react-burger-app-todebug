import React from 'react';

// @ts-expect-error TS(2307): Cannot find module './BuildControls.css' or its co... Remove this comment to see the full error message
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
];

const buildControls = (props: $TSFixMe) => <div className={classes.BuildControls}>
  <p>
    Current Price: <strong>{props.price.toFixed(2)}</strong>
  </p>
  {controls.map(ctrl => (
    <BuildControl
      key={ctrl.label}
      label={ctrl.label}
      added={() => props.ingredientAdded(ctrl.type)}
      removed={() => props.ingredientRemoved(ctrl.type)}
      disabled={props.disabled[ctrl.type]}
    />
  ))}
  <button
    className={classes.OrderButton}
    disabled={!props.purchasable}
    onClick={props.ordered}
  >
    {props.isAuth ? 'ORDER NOW' : 'Sign up/in to Order'}
  </button>
</div>;

export default buildControls;
