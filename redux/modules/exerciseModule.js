import { Alert } from "react-native";
import "firebase/firestore";

import firebase from "firebase";

const ExerciseActions = {
  GET_EXERCISES: "exercise/GET_EXERCISES",
  ADD_EXERCISES: "exercise/ADD_EXERCISES",
  EXERCISES_ERROR: "exercise/EXERCISE_ERROR",
};

//Exercise Interface
//image:
//name: (doubles as doc ID)
//muscleGroup:

// export function createExercise(db, exercise) {
//   //Add to database
//   var exercisesCollection = db.collection("exercises");

//   exercisesCollection
//     .doc(exercise.name)
//     .set({
//       muscleGroup: exercise.muscleGroup,
//     })
//     .then(function () {
//       Alert.alert("Document successfully written!");
//       return { type: ExerciseActions.ADD_EXERCISES, payload: exercise };
//     })
//     .catch(function (error) {
//       return {
//         type: ExerciseActions.EXERCISES_ERROR,
//         payload: { hasError: true, message: error },
//       };
//     });
// }
export function createExercise(workout) {
  return (dispatch, getState) => {
    return firebase
      .firestore()
      .collection("Exercises")
      .add(workout)
      .then((result) => {
        const payload = { ...workout, id: result.id };
        dispatch({ type: WorkoutActions.ADD_EXERCISES, payload: payload });
        return payload;
      })
      .catch((error) => {
        const payload = { hasError: true, message: error };
        dispatch({ type: WorkoutActions.WORKOUTS_ERROR, payload: payload });
        return payload;
      });
  };
}
export function getAllExercises(user) {
  return (dispatch, getState) => {
    return firebase
      .firestore()
      .collection("Exercises")
      .where("user", "==", user)
      .get()
      .then((result) => {
        // result.docs.forEach(doc => {

        // })
        const workouts = [];
        result.forEach(function (doc) {
          workouts.push({ ...doc.data(), id: doc.id });
        });
        dispatch({ type: ExerciseActions.GET_EXERCISES, payload: workouts });
        return workouts;
      })
      .catch((error) => {
        const payload = { hasError: true, message: error };
        dispatch({ type: ExerciseActions.EXERCISES_ERROR, payload: payload });
        return payload;
      });
  };
}
// export function addExercise(routineName) {
//   return (dispatch, getState) => {
//     const workoutID = routineName.id;
//     //delete routineName.id; //Don't save the id in the JSON object
//     return firebase
//       .firestore()
//       .collection("Exercises")
//       .doc(workoutID)
//       .set(routineName)
//       .then((result) => {
//         const payload = { ...routineName, id: workoutID };
//         dispatch({ type: WorkoutActions.ADD_EXERCISES, payload: payload });
//         return payload;
//       })
//       .catch((error) => {
//         const payload = { hasError: true, message: error };
//         dispatch({ type: WorkoutActions.EXERCISES_ERROR, payload: payload });
//         return payload;
//       });
//   };
// }

const initialState = {
  exercises: [],
  hasError: false,
  message: "",
};

export function exerciseReducer(state = initialState, action) {
  switch (action.type) {
    case ExerciseActions.ADD_EXERCISES:
      let newExercises = [...state.exercises, action.payload];
      return {
        ...state,
        exercises: newExercises,
      };
    case ExerciseActions.GET_EXERCISES:
      return {
        ...state,
        exercises: action.payload,
        hasError: false,
        message: "",
      };
    default:
      return state;
  }
}

export { initialState as InitialExerciseState };
