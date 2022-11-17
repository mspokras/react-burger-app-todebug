import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';

import * as actions from '../actions';

export function* initIngredientsSaga(action: $TSFixMe) {
  try {
    // @ts-expect-error TS(7057): 'yield' expression implicitly results in an 'any' ... Remove this comment to see the full error message
    const res = yield axios.get('/ingredients.json');
    yield put(actions.setIngredients(res.data));
  } catch (e) {
    yield put(actions.fetchIngredientsFailed());
  }
}
