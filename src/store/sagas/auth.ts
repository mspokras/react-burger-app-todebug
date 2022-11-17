import { delay } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions/index';

export function* logoutSaga(action: $TSFixMe) {
  yield call([localStorage, 'removeItem'], 'token');
  yield call([localStorage, 'removeItem'], 'expirationDate');
  yield call([localStorage, 'removeItem'], 'userId');
  // yield localStorage.removeItem('token');
  // yield localStorage.removeItem('expirationDate');
  // yield localStorage.removeItem('userId');
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action: $TSFixMe) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
  // setTimeout(() => {
  //   dispatch(logout());
  // }, expirationTime * 1000);
}

export function* authUserSaga(action: $TSFixMe) {
  // "put" in redux-saga is the same as "dispatch"
  yield put(actions.authStart()); //is the same as dispatch(authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  };
  let url =
    'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDd24SCQ1nkN3Tk3XPiRgK7sC56puUuJ2U';
  if (!action.isSignup) {
    url =
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDd24SCQ1nkN3Tk3XPiRgK7sC56puUuJ2U';
  }
  try {
    // @ts-expect-error TS(7057): 'yield' expression implicitly results in an 'any' ... Remove this comment to see the full error message
    const res = yield axios.post(url, authData);
    // @ts-expect-error TS(7057): 'yield' expression implicitly results in an 'any' ... Remove this comment to see the full error message
    const expirationDate = yield new Date(
      new Date().getTime() + res.data.expiresIn * 1000
    );
    yield localStorage.setItem('token', res.data.idToken);
    yield localStorage.setItem('expirationDate', expirationDate);
    yield localStorage.setItem('userId', res.data.localId);
    yield put(actions.authSuccess(res.data.idToken, res.data.localId));
    yield put(actions.checkAuthTimeout(res.data.expiresIn));
  } catch (err) {
    yield put(actions.authFail((err as $TSFixMe).response.data.error));
  }
}

export function* authCheckStateSaga(action: $TSFixMe) {
  // "put" in redux-saga is the same as "dispatch"
  // @ts-expect-error TS(7057): 'yield' expression implicitly results in an 'any' ... Remove this comment to see the full error message
  const token = yield localStorage.getItem('token');
  if (!token) {
    yield put(actions.logout());
  } else {
    // @ts-expect-error TS(7057): 'yield' expression implicitly results in an 'any' ... Remove this comment to see the full error message
    const expirationDate = yield new Date(
      // @ts-expect-error TS(2769): No overload matches this call.
      localStorage.getItem('expirationDate')
    );
    if (expirationDate <= new Date()) {
      yield put(actions.logout());
    } else {
      // @ts-expect-error TS(7057): 'yield' expression implicitly results in an 'any' ... Remove this comment to see the full error message
      const userId = yield localStorage.getItem('userId');
      yield put(actions.authSuccess(token, userId));

      yield put(
        actions.checkAuthTimeout(
          expirationDate.getTime() - new Date().getTime() / 1000
        )
      );
    }
  }
}
