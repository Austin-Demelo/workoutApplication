const firebase = require("firebase");
require("firebase/firestore");

const WorkoutActions = {
    GET_WORKOUTS: 'workout/GET_WORKOUTS',
    CREATE_WORKOUT: 'workout/CREATE_WORKOUT',
    WORKOUTS_ERROR: 'workout/EXERCISE_ERROR',
    DELETE_WORKOUT: 'workout/DELETE_WORKOUT'
}


const firebaseConfig = {
  apiKey: "AIzaSyDYrLqhUhVi4iXNry99iq86UoOY1JQ8R_s",
  authDomain: "workoutapp-ecaaf.firebaseapp.com",
  databaseURL: "https://workoutapp-ecaaf.firebaseio.com",
  projectId: "workoutapp-ecaaf",
  storageBucket: "workoutapp-ecaaf.appspot.com"
}

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
var workoutCollection = db.collection("Workouts");


// const UserActions = {
//   LOGIN_USER: 'user/LOGIN_USER',
//   REGISTER_USER: 'user/REGISTER_USER',
//   USER_ERROR: 'user/USER_ERROR',
// }

// async function registerUser(email, password) { 
//   try {
//       let reigster = await auth.createUserWithEmailAndPassword(email, password);
//       return { type: UserActions.LOGIN_USER, payload: reigster}
//   }
//   catch(error) {
//       return { type: UserActions.USER_ERROR, payload: {hasError: true, message: error.message}}
//   }
// }

// registerUser("ChrisChrisChris@gmail.com", "Password").then((result) => {
//   console.log(result);
//   return;
// });

function createWorkout(workout) { 
    return ((dispatch, getState) => {
        console.log(workout);
        return firebase.firestore().collection("Workouts").add(workout)
        .then(result => {
            const payload = {...workout, id: result.id};
            dispatch({ type: WorkoutActions.CREATE_WORKOUT, payload: payload});
            return payload;
        })
        .catch(error => {
            console.log(error);
            const payload = {hasError: true, message: error};
            dispatch( { type: WorkoutActions.WORKOUTS_ERROR, payload: payload});
            return payload;
        });
            
    });
}

const newWorkout = {
  user: "Chris",
  startTime: Date.now(),
  endTime: Date.now(),
  workout: //An array of objects, representing routineExercises
  [ 
      {// workoutExercise
          exercise: {exercise: "Bench", reps: 3, sets: 10},
          setsCompleted: 2
      }
  ]
}

const dispatch = createWorkout(newWorkout);

const result = dispatch();
console.log("res");
console.log(result);


// //Will load all workouts, from the provided user, into the store
// async function getWorkouts(user) { 
//   var query = await workoutCollection.where("user","==",user);
//   var select = await query.get();
//   try{
//       const workouts = [];
//       select.forEach(function(doc) {

//           workouts.push({...doc.data(), id: doc.id});
//       });
//       return { type: WorkoutActions.GET_WORKOUTS, payload: workouts}

//   }
//   catch(error) {
//       return { type: WorkoutActions.WORKOUTS_ERROR, payload: {hasError: true, message: error}}
//   };
// }





// async function updateWorkout(workout) {
//   try {
//     const workoutID = workout.id;
//     delete workout.id; //Don't save the id in the JSON object
//     await workoutCollection.doc(workoutID).set(workout);
//     return { type: WorkoutActions.UPDATE_WORKOUT, payload: {...workout, id: workoutID}}
//   }
//   catch(error) {
//     return { type: WorkoutActions.WORKOUTS_ERROR, payload: {hasError: true, message: error}}
//   }
// }


// const updatedWorkout = {
//   user: "Chris",
//   id: "1NHAouyAXBlQJYCbtKUj",
//   startTime: Date.now(),
//   endTime: Date.now(),
//   workout: //An array of objects, representing routineExercises
//   [ 
//       {// workoutExercise
//           exercise: {exercise: "Bench", reps: 3, sets: 10},
//           setsCompleted: 3
//       },
//       {// workoutExercise
//         exercise: {exercise: "Dips", reps: 3, sets: 10},
//         setsCompleted: 3
//     }
//   ]
// }




// deleteWorkout("1NHAouyAXBlQJYCbtKUj").then((result) => {
//   console.log(result);
//   return;
// });


// // auth.signInWithEmailAndPassword("Chris@gmail.com", "PASSWORD")
// //       .then(function (_firebaseUser) {
// //         console.log("User logged in");
// //       })
// //       .catch(function (error) {
// //         console.log(error);
// //       }
// // );
  

// //var db = firebase.firestore();
// //console.log(workoutMethods.getWorkouts());





// // const workoutCollection = db.collection("Workouts");
// // const query = workoutCollection.where("workoutName", "==", "Abs of Steel");

// // query.get()
// // .then(function(querySnapshot) {
// //     querySnapshot.forEach(function(doc) {
        
// //       db.collection("Workouts").doc(doc.id).delete().then(function() {
// //             console.log("Document successfully deleted!");
// //         }).catch(function(error) {
// //             console.error("Error removing document: ", error);
// //         });

// //     });
// // })
// // .catch(function(error) {
// //     console.log("Error getting documents: ", error);
// // });




