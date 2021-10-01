import React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { createExercise } from "../redux/modules/exerciseModule";

export class ExerciseForm extends React.Component {
  constructor(props) {
    super(props);
    //Debung Only
    let newWorkout = [];

    // this.props.route.params.exercise.exercises.map((exercise) => {
    //   newWorkout.push({
    //     exercise: exercise,
    //   });
    // });
    this.state = {
      workout: newWorkout,
      reps: 0,
      sets: 0,
      routineName: "",
      exerciseName: "",
      startTime: Date.now(),
    };
    //Set the header title, to the name of the workout
    // this.props.navigation.setOptions({
    //   title: this.props.route.params.exercise.name,
    // });
  }

  handleCompleteWorkout() {
    //Prepare the workout object, to conform to the db interface
    const newWorkout = {
      //workout: this.state.workout,
      reps: this.state.reps,
      sets: this.state.sets,
      exerciseName: this.state.exerciseName,
      routineName: this.state.routineName,
    };
    //Pass workout to createWorkout, saving it to the DB, then updating the redux store
    this.props.createExercise(newWorkout).then((result) => {
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
        <View>
          <TouchableOpacity>
            <Text>Exercise Name:</Text>
            <TextInput
              onChangeText={(text) => {
                {
                  this.setState({ exerciseName: text });
                }
              }}
              value={this.state.exerciseName}
            />
            <Text>Sets:</Text>
            <TextInput
              onChangeText={(text) => {
                this.setState({ sets: text });
                // ex.exercises.sets;
              }}
              value={this.state.sets}
            />
            <Text>Reps:</Text>
            <TextInput
              onChangeText={(text) => {
                this.setState({ reps: text });
                //ex.exercises.reps;
              }}
              value={this.state.reps}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text
            style={styles.textSubmit}
            onPress={() => this.handleCompleteWorkout()}
          >
            Add Exercise
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonRed}
          onPress={() => this.props.navigation.navigate("Create/Edit Routine")}
        >
          <Text style={styles.textSubmit}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     exercise: state.exercise.exercise,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     addExercise: (routineName) => dispatch(addWorkout(routineName)),
//   };
// }
function mapStateToProps(state) {
  return {
    user: state.user.user,
    exercise: state.exercise.exercise,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createExercise: (workout) => dispatch(createExercise(workout)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseForm);

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#41CE7E",
    flex: 1,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  scrollViewContainer: {
    backgroundColor: "orange",
    borderRadius: 30,
    marginLeft: 50,
    marginRight: 50,
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
    backgroundColor: "white",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "black",
  },
  buttonRed: {
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 100,
    marginRight: 100,
    marginBottom: 20,
    backgroundColor: "#ff5e4f",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "black",
  },
  buttonSmall: {
    marginTop: 10,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "black",
  },
  buttonSmallRed: {
    marginTop: 10,
    paddingTop: 3,
    paddingBottom: 3,
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#ff5e4f",
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
