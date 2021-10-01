import {
  Button,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Alert,
} from "react-native";

import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { createWorkout } from "../redux/modules/workoutModule";

class CurrentWorkout extends React.Component {
  constructor(props) {
    super(props);
    //Create Workout Object, from routine
    let newWorkout = [];
    //route.params holds attributes passed from the parent component
    //routine is passed from RoutineSelection screen
    //Create a new workout object, from the routine object
    this.props.route.params.routine.exercises.map((exercise) => {
      newWorkout.push({
        exercise: exercise,
        setsCompleted: 0,
      });
    });
    //The workout object is saved in the state.
    //Final attributes (user, endTime) are added to workout object, before passing to createWorkout()
    this.state = {
      workout: newWorkout,
      startTime: Date.now(),
    };
    //Set the header title, to the name of the workout
    this.props.navigation.setOptions({
      title: this.props.route.params.routine.name,
    });

    console.log(this.state.workout);
  }

  handleExercisePress(exerciseName) {
    //Create a deep copy of the current workout exercises
    let newExercises = [...this.state.workout];
    //Find the exercise with the same name, and increase it's setsCompleted by one
    newExercises.map((ex, index) => {
      //Skip the increase, if it has already maxed out
      if (
        ex.exercise.exerciseName == exerciseName &&
        ex.setsCompleted < ex.exercise.sets
      ) {
        ex.setsCompleted++;
      }
    });
    //Pass the new exercise list, to the state
    this.setState({
      ...this.state,
      workout: newExercises,
    });
  }

  handleCompleteWorkout() {
    //Prepare the workout object, to conform to the db interface
    const newWorkout = {
      workout: this.state.workout,
      startTime: this.state.startTime,
      endTime: Date.now(),
      user: this.props.user,
      isCardio: false,
    };
    if (this.props.user == undefined) {
      //MUST pass user, cancel workout, take them back to home screen to log in.
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
      return;
    }
    const cancelDialog = {
      text: 'Close',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    };
    Alert.alert(
      'Workout completed!',
      "Returning to home",
      [
        cancelDialog
      ],
      { cancelable: false },
    );
    //Pass workout to createWorkout, saving it to the DB, then updating the redux store
    this.props.createWorkout(newWorkout).then((result) => {
      //Reset the stack, and go to Home Screen
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    });
  }

  render() {
    return (
      <View style={styles.screen}>
        <ScrollView>
          {this.state.workout.map((ex, index) => (
            <TouchableOpacity
              style={styles.selections}
              key={index}
              onPress={() => this.handleExercisePress(ex.exercise.exerciseName)}
            >
              <Image
                style={styles.image}
                source={{ uri: ex.exercise.picture }}
              />
              <Text style={styles.textTitle}>{ex.exercise.exerciseName}</Text>
              <Text style={styles.textBody}>
                {ex.setsCompleted} / {ex.exercise.sets} sets :{" "}
                {ex.exercise.reps} reps
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity
          onPress={() => this.handleCompleteWorkout()}
          style={styles.button}
        >
          <Text style={styles.textSubmit}>Finish Workout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createWorkout: (workout) => dispatch(createWorkout(workout)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentWorkout);

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#96ced9",
    flex: 1,
  },
  image: {
    marginTop: 10,
    marginLeft: "44%",
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#428947",
  },
  selections: {
    marginTop: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 65,
    marginRight: 65,
    backgroundColor: "white",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "black",
    textAlign: "center",
  },
  button: {
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 100,
    marginRight: 100,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "black",
  },
  textBody: {
    fontSize: 15,
    textAlign: "center",
    paddingTop: 3,
  },
  textTitle: {
    fontSize: 20,
    textAlign: "center",
  },
  textSubmit: {
    textAlign: "center",
    fontSize: 25,
  },
});
