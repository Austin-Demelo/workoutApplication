import { applyMiddleware, compose, createStore } from "redux";

import { InitialExerciseState } from "./modules/exerciseModule";
import { InitialRoutineState } from "./modules/routineModule";
import { InitialUserState } from "./modules/userModule";
import { InitialWorkoutState } from "./modules/workoutModule";
import { InitialStatState } from "./modules/statsModule";

import rootReducer from "./reducers";
import thunk from "redux-thunk";

function configureStore() {
  const middlewares = [thunk];
  const initialState = {
    exercise: InitialExerciseState,
    routine: InitialRoutineState,
    user: InitialUserState,
    workout: InitialWorkoutState,
    stat: InitialStatState,
    firebase: {
      // db: firebase.firestore(),
      // auth: app.auth(),
    },
  };
  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middlewares))
  );
}

const Store = configureStore();
export default Store;
