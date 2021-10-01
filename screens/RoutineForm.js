import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Modal,
  TouchableHighlight,
  Image,
  Alert,
} from "react-native";

import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { saveWorkout } from "../redux/modules/routineModule";
import { ImageSelector } from "../components/ImageSelector";
import { deleteRoutines } from "../redux/modules/routineModule";
export class RoutineForm extends React.Component {
  constructor(props) {
    super(props);

    let newProps = this.props.route.params;
    //console.log(newProps);

    //variables for the save functionality

    this.state = {
      routineName: newProps.newRoutine ? "" : newProps.editRoutine.routineName,
      exercises: newProps.newRoutine ? [] : newProps.editRoutine.exercises,
      reps: 0,
      sets: 0,
      eName: "",
      temp: "",
      ex: "",
      exerciseName: "",
      modalVisible: false,
      modalVisibleImage: false,
      tempExercise: "",
      tempImage: "",
      tempSets: "",
      tempReps: "",
      selectedImage: "",
      routineId: this.props.route.params.routineID,
    };

    //console.log(this.state.exercises);
  }

  handleSave() {
    //Prepare the workout object, to conform to the db interface
    const newRoutine = {
      user: this.props.user,
      routineName: this.state.routineName,
      exercises: this.state.exercises,

      //user: this.props.user,
    };
    if(this.state.routineName == ""|| this.state.routineName == null){
      Alert.alert("Please enter a Routine name");
    }else{

    console.log(this.state.routineId)
    if (this.state.routineId != null) {
      this.props.deleteRoutines(this.state.routineId).then((result) => { });
    }
    Alert.alert("Routine Saved!");
    this.props.saveWorkout(newRoutine).then((result) => {
      //Reset the stack, and go to Home Screen
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    });
  }
  }

  AddExercise() {
    let exerciseName = this.state.exerciseName;
    let reps = this.state.reps;
    let sets = this.state.sets;
    var blankWorkout = { exerciseName, reps, sets };
    let AllExercises = this.state.exercises;
    AllExercises.push(blankWorkout);

    this.setState({ exercises: AllExercises });
    //console.log(this.state.exercises);
  }
  EditExercise() {
    let exerciseName = this.state.tempExercise;
    let reps = this.state.tempReps;
    let sets = this.state.tempSets;
    let picture = this.state.selectedImage;

    console.log(this.state.tempExercise)
    console.log(this.state.tempReps)
    console.log(this.state.tempSets)
    console.log(this.state.selectedImage)

    if(this.state.tempExercise == ""){
      Alert.alert("Please add an exercise name!");
    }
    else if(this.state.tempReps == ""){
      Alert.alert("Please enter the amount of reps!");
    }
    else if(this.state.tempSets == ""){
      Alert.alert("Please enter the amount of sets!");
    }
    else if(this.state.selectedImage == ""){
      Alert.alert("Please select an image!");
    }else{
      var blankWorkout = { exerciseName, reps, sets, picture };
      let AllExercises = this.state.exercises;
      AllExercises.push(blankWorkout);
  
      this.setState({ exercises: AllExercises });
      this.setState({ modalVisible: false });
   
      //console.log(this.state.exercises);
      Alert.alert("Exercise Saved.");
    }

  }

  setModalVisible = (visible, index) => {
    this.setState({ modalVisible: visible });
    //console.log("INDEX LOGGED HERE33333333333333333333333333333333333");
    //console.log(index);
  };
  setOtherModalVisible = (visible) => {
    this.setState({ modalVisibleImage: visible });
    //console.log("INDEX LOGGED ");
  };
  // imageSelectedHandler = (imagePath) => {
  //   this.state.selectedImage = imagePath;
  //   console.log("imagePath " + imagePath)
  // }
  render() {
    const { modalVisible, modalVisibleImage } = this.state;

    const imageSelectedHandler = (imagePath) => {
      this.state.selectedImage = imagePath;
      //console.log("imagePath " + imagePath);
      this.setState({ modalVisibleImage: false });
    };

    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.textTitle}>Workout Name:</Text>
        <TextInput
          style={styles.textInputStyleHeader}
          onChangeText={(text) => {
            this.setState({ routineName: text });
          }}
          value={this.state.routineName}
        />
        {/* Add button for exercises */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.setModalVisible(true, this.state.exercises.length + 1);
            this.setState({ tempExercise: "" });
            this.setState({ tempReps: "" });
            this.setState({ tempSets: "" });
            this.state.exercises.splice(this.state.exercises.length + 1, 1);
          }}
        >
          <Text style={styles.textSubmit}>Add Exercise</Text>
        </TouchableOpacity>

        {/* ScrollView that has all the workouts and ability for them to be clicked on */}
        <ScrollView style={styles.scrollViewContainer}>
          {this.state.exercises.map((ex, index) => (
            <View style={styles.Views} 
                  key={index}>
              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(true, index);
                  this.setState({ tempExercise: ex.exerciseName });
                  this.setState({ tempReps: ex.reps });
                  this.setState({ selectedImage: ex.picture });
                  this.setState({ tempSets: ex.sets });
                  this.state.exercises.splice(index, 1);
                }}
              >
                <View style={styles.ImageViewMain}>
                  <Image
                    style={styles.image}
                    source={{ uri: ex.picture }}
                  ></Image>
                </View>
                <Text style={styles.textTitle}>{ex.exerciseName} </Text>
                <Text style={styles.textBody}>
                  sets: {ex.sets} / reps: {ex.reps}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Modal for edit */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {/* Image picker/ take image */}
              <TouchableOpacity
                onPress={() => {
                  this.setOtherModalVisible(true);
                }}
              >
                <Text style={styles.modalText}>Image</Text>
                <View style={styles.ImageView}>
                  <Image
                    style={styles.image}
                    source={{ uri: this.state.selectedImage }}
                  />
                </View>
              </TouchableOpacity>

              <Text style={styles.modalText}>Name</Text>
              <TextInput
                style={styles.textInputStyle}
                onChangeText={(tempExercise) => this.setState({ tempExercise })}
              >
                {this.state.tempExercise}
              </TextInput>
              <Text style={styles.modalText}>Sets</Text>
              <TextInput
                style={styles.textInputNumbers}
                onChangeText={(tempSets) => this.setState({ tempSets })}
              >
                {this.state.tempSets}
              </TextInput>
              <Text style={styles.modalText}>Reps</Text>
              <TextInput
                style={styles.textInputNumbers}
                onChangeText={(tempReps) => this.setState({ tempReps })}
              >
                {this.state.tempReps}
              </TextInput>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  //this.setModalVisible(!modalVisible);
                  this.EditExercise();
                }}
              >
                <Text style={styles.textStyle}>Save Exercise</Text>
              </TouchableHighlight>
              <TouchableOpacity
                style={styles.openButton2}
                onPress={() => {
                  this.setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Delete Exercise</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal that will have the Picture stuff inside */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleImage}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.modalView}>
            <Text style={styles.label}>Lets Take a picture for your exercise!</Text>

            <ImageSelector onImageSelected={imageSelectedHandler} />

            {/* {this.state.selectedImage &&
              <View>

                <Button title="Reset" onPress={() => { setSelectedImage(null); }} />
              </View>
            } */}
            <TouchableOpacity
              style={styles.openButton2}
              onPress={() => {
                this.setOtherModalVisible(!modalVisibleImage);
              }}
            >
              <Text style={styles.textStyle}>Close Modal</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.handleSave()}
        >
          <Text style={styles.textSubmit}>Save Routine</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.user,
    routine: state.routine.routine,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveWorkout: (workout) => dispatch(saveWorkout(workout)),
    deleteRoutines: (workout) => dispatch(deleteRoutines(workout)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutineForm);

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#428947",
  },
  ImageView: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#428947",
    marginBottom: 10,
    marginTop: -10,
    alignContent: "center",
  },
  ImageViewMain: {
    marginTop: 10,
    marginLeft: "44%",
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#428947",
    marginBottom: -9,
  },
  Views: {
    alignItems: "stretch",
  },
  innerexerciseText: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#428947",
    width: "40%",
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
    textAlignVertical: "top",
  },
  screen: {
    backgroundColor: "#41CE7E",
    flex: 1,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  textBody: {
    fontSize: 15,
    textAlign: "center",
  },
  textTitle: {
    fontSize: 15,
    textAlign: "center",
  },
  scrollViewContainer: {
    backgroundColor: "#96ced9",
    borderRadius: 30,
    marginLeft: 50,
    marginRight: 50,
    borderColor: "black",
    borderWidth: 2,
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
    marginBottom: 10,
    backgroundColor: "#95edad",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "black",
  },
  buttonRed: {
    position: "relative",
    left: 0,
    right: 0,
    // marginTop: 10,
    // paddingTop: 15,
    // paddingBottom: 15,
    // marginLeft: 100,
    // marginRight: 100,
    // marginBottom: 20,
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
    marginBottom: 10,
  },
  textTitle: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 10,
  },
  textSubmit: {
    textAlign: "center",
    fontSize: 25,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#96ced9",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  openButton2: {
    backgroundColor: "red",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  textInputStyle: {
    paddingLeft: 5,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    marginBottom: 3,
    marginTop: -15,
    width: 200,
  },
  textInputNumbers: {
    paddingLeft: 5,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    marginBottom: 3,
    marginTop: -15,
    width: 40,
  },
  textInputStyleHeader: {
    paddingLeft: 10,
    paddingRight: 30,
    paddingBottom: 5,
    paddingTop: 5,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    marginBottom: 10,
    textAlign: "center",
  },
});
