import { Button, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { getRoutines } from "../redux/modules/routineModule";

class RoutineList extends React.Component {
  constructor(props) {
    console.disableYellowBox = true;

    super(props);
    this.state = {
      email: "",
      password: "",
      results: "",
    };
    //this.props.getWorkouts();
    //console.log("WORKING")
    this.props.getRoutines(this.props.user).then((result) => {});
    console.log(this.props.routines);
    console.log("in the get");
    //console.log(this.props.routines.length)
  }

  render() {
    return (
      <View style={styles.screen}>
        <Text style={styles.textBody}>Available Routines</Text>

        <ScrollView>
          {this.props.routines.map((routine, index) => (
            <TouchableOpacity
              style={styles.selections}
              onPress={() =>
                this.props.navigation.navigate("Create/Edit Routine", {
                  newRoutine: false,
                  editRoutine: routine,
                  routineName: routine.routineName,
                  routineID: routine.id,
                })
              }
              key={index}
              style={styles.button}
            >
              <Text style={styles.textSubmit}>{routine.routineName}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity
          style={styles.addSelections}
          onPress={() =>
            this.props.navigation.navigate("Create/Edit Routine", {
              newRoutine: true,
            })
          }
        >
          <Text style={styles.textSubmit}>Create Routine</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
//Maps atate from redix to component props, passes state entire state of project
function mapStateToProps(state) {
  return {
    user: state.user.user,
    routines: state.routine.routines,
  };
}
//Same thing but instead were mapping component props (things we can call)
//When calling these you must use this.props cuz if you call just the method then it calls it from here and not the store
function mapDispatchToProps(dispatch) {
  return {
    getRoutines: (user) => dispatch(getRoutines(user)),
  };
}
//Export the connect it makes a version of the class thats connected to the redux store
export default connect(mapStateToProps, mapDispatchToProps)(RoutineList);

const styles = StyleSheet.create({
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
  addSelections: {
    marginTop: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 65,
    marginRight: 65,
    backgroundColor: "#95edad",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "black",
    textAlign: "center",
    marginBottom: 20,
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
    fontSize: 30,
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
