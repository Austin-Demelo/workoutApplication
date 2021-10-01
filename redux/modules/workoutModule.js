import 'firebase/firestore';

import firebase from 'firebase';

const WorkoutActions = {
    GET_WORKOUTS: 'workout/GET_WORKOUTS',
    CREATE_WORKOUT: 'workout/CREATE_WORKOUT',
    UPDATE_WORKOUT: 'workout/UPDATE_WORKOUT',
    WORKOUTS_ERROR: 'workout/EXERCISE_ERROR',
    DELETE_WORKOUT: 'workout/DELETE_WORKOUT'
}

//Workout Interface
//id
//user: //Who created the workout
//startTime: [DATETIME]
//endTime: [DATETIME]
//workout: //An array of objects, representing routineExercises
//  [ 
//      {// workoutExercise
//          exercise: {exercise: [STRING], reps: [INT], sets: [INT]}
//          setsCompleted: [INT]
//  ]

//Creates a workout in the database, then add to Redux store
export function createWorkout(workout) { 
    return ((dispatch, getState) => {

        return firebase.firestore().collection("Workouts").add(workout)
        .then(result => {
            const payload = {...workout, id: result.id};
            dispatch({ type: WorkoutActions.CREATE_WORKOUT, payload: payload});
            return payload;
        })
        .catch(error => {
            const payload = {hasError: true, message: error};
            dispatch( { type: WorkoutActions.WORKOUTS_ERROR, payload: payload});
            return payload;
        });
    });
}

//Loads all workouts, from the provided user, into the store

export function getWorkouts(user) { 
    return ((dispatch, getState) => {
       
        return firebase.firestore().collection("Workouts").where("user","==",user).get()
        .then(result => {
            const workouts = [];
            result.forEach(function(doc) {
                workouts.push({...doc.data(), id: doc.id});
            });
            //console.log(workouts)
            dispatch({ type: WorkoutActions.GET_WORKOUTS, payload: workouts});
            //console.log(workouts)
            return workouts;
        })
        .catch(error => {
            const payload = {hasError: true, message: error};
            dispatch( { type: WorkoutActions.WORKOUTS_ERROR, payload: payload});
            //console.log(payload)
            return payload;
        });
            
    });
}

//Updates a workout by the id, then updates the store
export function updateWorkout(workout) {
    return ((dispatch, getState) => {
        const workoutID = workout.id;
        delete workout.id; //Don't save the id in the JSON object
        return firebase.firestore().collection("Workouts").doc(workoutID).set(workout)
        .then(result => {
            const payload = {...workout, id: workoutID};
            dispatch({ type: WorkoutActions.UPDATE_WORKOUT, payload: payload});
            return payload;
        })
        .catch(error => {
            const payload = {hasError: true, message: error};
            dispatch( { type: WorkoutActions.WORKOUTS_ERROR, payload: payload});
            return payload;
        });
    });
}
    

export function deleteWorkout(workoutID) {
    return ((dispatch, getState) => {
        const workoutID = workout.id;
        delete workout.id; //Don't save the id in the JSON object
        return firebase.firestore().collection("Workouts").doc(workoutID).delete()
        .then(result => {
            dispatch({ type: WorkoutActions.DELETE_WORKOUT, payload: workoutID});
            return workoutID;
        })
        .catch(error => {
            const payload = {hasError: true, message: error};
            dispatch( { type: WorkoutActions.WORKOUTS_ERROR, payload: payload});
            return payload;
        });
    });
}

const initialState = {
    workouts: [], 
    hasError: false,
    message: "",
}

export function workoutReducer(state = initialState, action) {
    switch(action.type) {
        case WorkoutActions.CREATE_WORKOUT:
            return {
                ...state,
                workouts: [...state.workouts, action.payload],
                hasError: false,
                message: "",
            }   
        case WorkoutActions.GET_WORKOUTS:    
            return {
                ...state,
                workouts: action.payload,
                hasError: false,
                message: "",
            }
        case WorkoutActions.UPDATE_WORKOUT:
            let newWorkouts = [...state.workouts];
            const updateIndex = newWorkouts.findIndex(workout => workout.id = action.payload.id);
            newWorkouts[updateIndex] = action.payload;
            return {
                ...state,
                workouts: newWorkouts,
                hasError: false,
                message: "",
            }
        case WorkoutActions.DELETE_WORKOUT:
            newWorkouts = [...state.workouts];
            const deleteIndex = newWorkouts.findIndex(workout => workout.id = action.payload);
            newWorkouts.splice(deleteIndex, 1);
            return {
                ...state,
                workouts: newWorkouts,
                hasError: false,
                message: "",
            }            
        default: 
            return state;
     }
}

export {initialState as InitialWorkoutState};