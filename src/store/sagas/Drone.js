import { takeEvery, call, put, cancel, delay } from "redux-saga/effects";
import API from "../api";
import * as actions from "../actions";

/*
  1. The drone service retruns the location and temprature of the drone for last 30 sec.

  This process is pretty well defined here with a saga.

  call invokes a method
  put dispatches an action
  takeEvery watches actions and executes a function

  Also -- the `*` in function is important; turns it into a "generator"

*/

// once the FETCH_DRONE is fired, get the drone data

function* watchFetchDrone() {
  //call the drone API
  while (true) {
    const { error, data } = yield call(API.findDrone);
    if (error) {
      yield put({ type: actions.API_ERROR, code: error.code });
      yield cancel();
      return;
    }

    if (!data) {
      yield put({ type: actions.API_ERROR });
      yield cancel();
      return;
    }
    yield put({ type: actions.DRONE_DATA_RECEIVED, data });

    yield delay(3000);
  }
}

function* watchDrone() {
  yield takeEvery(actions.FETCH_DRONE, watchFetchDrone);
}

export default [watchDrone];
