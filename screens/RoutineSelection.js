import { Button, Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { getRoutines } from "../redux/modules/routineModule";

class RoutineSelection extends React.Component {
  render() {
    return (
      <View style={styles.screen}>
        <Text style={styles.textBody}>Available Routines</Text>
        <ScrollView>
          {this.props.routines.map((routine, index) => (
            <TouchableOpacity
              style={styles.selections}
              key={index}
              onPress={() =>
                this.props.navigation.navigate("Current Workout", {
                  routine: routine, //Pass the routine chosen, to the next component
                })
              }
            >
              <Text style={styles.textTitle}>{routine.routineName}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.user,
    routines: state.routine.routines,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getRoutines: (db, user) => dispatch(getRoutines(db, user)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutineSelection);

//Maybe different colours, just going off the xd design xd
const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#428947',
  },
  screen: {
    backgroundColor: "#96ced9",
    flex: 1,
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
  textTitle: {
    fontSize: 20,
    textAlign: "center",
  },
  textSubmit: {
    textAlign: "center",
    fontSize: 25,
  },
  textBody: {
    fontSize: 30,
    textAlign: "center",
    paddingTop: 3,
  },
});
