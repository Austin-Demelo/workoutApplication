import { Alert } from "react-native";
import "firebase/firestore";

import firebase from "firebase";
const RoutineActions = {
  GET_ROUTINES: "routine/GET_ROUTINES",
  CREATE_ROUTINE: "routine/CREATE_ROUTINE",
  ROUTINES_ERROR: "routine/EXERCISE_ERROR",
  DELETE_ROUTINE: "routine/DELETE_ROUTINE",
};

//Routine Interface
//user: //Who created the routine
//name: (doubles as doc ID)
//exercises: //An array of objects, representing routineExercises
//  [
//      {exerciseName: [STRING], reps: [INT], sets: [INT]}
//  ]

//Will load all routines, from the provided user, into the store
export function getRoutines(user) {
  console.disableYellowBox = true;
  return (dispatch, getState) => {
    return firebase
      .firestore()
      .collection("Routine")
      .where("user", "==", user)
      .get()
      .then((result) => {
        //Provide the routines to the reducer
        const routines = [];

        result.forEach(function (doc) {
          routines.push({ ...doc.data(), id: doc.id });
        });
        console.log(routines);
        dispatch({ type: RoutineActions.GET_ROUTINES, payload: routines });
        return routines;
      })
      .catch((error) => {
        const payload = { hasError: true, message: error };
        dispatch({ type: RoutineActions.ROUTINES_ERROR, payload: payload });
        return payload;
      });
  };
}

export function saveWorkout(workout) {
  return (dispatch, getState) => {
    return firebase
      .firestore()
      .collection("Routine")
      .add(workout)
      .then((result) => {
        const payload = { ...workout, id: result.id };
        dispatch({ type: RoutineActions.CREATE_ROUTINE, payload: payload });
        return payload;
      })
      .catch((error) => {
        const payload = { hasError: true, message: error };
        dispatch({ type: RoutineActions.ROUTINES_ERROR, payload: payload });
        return payload;
      });
  };
}
export function updateRoutines(workout) {
  return (dispatch, getState) => {
    const workoutID = workout.id;
    delete workout.id; //Don't save the id in the JSON object
    return firebase
      .firestore()
      .collection("routines")
      .doc(workoutID)
      .set(workout)
      .then((result) => {
        const payload = { ...workout, id: workoutID };
        dispatch({ type: RoutineActions.UPDATE_ROUTINE, payload: payload });
        return payload;
      })
      .catch((error) => {
        const payload = { hasError: true, message: error };
        dispatch({ type: RoutineActions.ROUTINES_ERROR, payload: payload });
        return payload;
      });
  };
}

export function deleteRoutines(routine) {
  return (dispatch, getState) => {
    const routineId = routine;
    delete routine.id;
    return firebase
      .firestore()
      .collection("Routine")
      .doc(routineId)
      .delete()
      .then((result) => {
        console.log("delete successful");
        // const payload = { ...workout, id: workoutID };
        // dispatch({ type: RoutineActions.UPDATE_ROUTINE, payload: payload });
        // return payload;
      })
      .catch((error) => {
        console.log("unsuccessful");
      });
  };
}
const initialState = {
  routines: [
    //Dummy Routine
    // {
    //   routineName: "Chest/Triceps",
    //   //An array of objects, representing routineExercises
    //   exercises: [
    //     { exerciseName: "Bench", reps: 10, sets: 3 },
    //     { exerciseName: "Incline", reps: 11, sets: 3 },
    //     { exerciseName: "Bumbells", reps: 11, sets: 3 },
    //     { exerciseName: "Pushups", reps: 10, sets: 3 },
    //     { exerciseName: "Curls", reps: 20, sets: 3 },
    //   ],
    // },
  ],
  hasError: false,
  message: "",
};

export function routineReducer(state = initialState, action) {
  switch (action.type) {
    case RoutineActions.GET_ROUTINES:
      return {
        ...state,
        routines: action.payload,
        hasError: false,
        message: "",
      };
    case RoutineActions.CREATE_ROUTINE:
      return {
        ...state,
        routines: [...state.routines, action.payload],
        hasError: false,
        message: "",
      };
    case RoutineActions.UPDATE_ROUTINE:
      return {
        ...state,
        routines: [...state.routines, action.payload],
        hasError: false,
        message: "",
      };
    case RoutineActions.DELETE_ROUTINE:
      return {
        ...state,
        routines: [...state.routines, action.payload],
        hasError: false,
        message: "",
      };
    default:
      return state;
  }
}

export { initialState as InitialRoutineState };
