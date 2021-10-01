import React from "react";
import { Pedometer } from "expo-sensors";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import { connect } from "react-redux";
import { createWorkout } from "../redux/modules/workoutModule";

class CardioWorkout extends React.Component {
  constructor(props) {
    super(props);
    let newWorkout = [];

    this.state = {
      isPedometerAvailable: "checking",
      currentStepCount: 0,
      btnName: "Start Run",
      isRunning: false,
      startTime: 0,
      currentTime: 0,
      endTime: 0,
      kilometersRun: 0.0,
      workout: newWorkout,
      timer: null,
      counter: "00",
      milliseconds: "00",
    };
  }

  start = () => {
    this.setState({ startTime: Date.now() });
    this.pedoService = Pedometer.watchStepCount((result) => {
      this.setState({
        currentStepCount: result.steps,
        kilometersRun: result.steps / 1300,
        currentTime: Date.now(),
      });
    });

    Pedometer.isAvailableAsync().then(
      (result) => {
        this.setState({
          isPedometerAvailable: String(result),
        });
      },
      (error) => {
        this.setState({
          isPedometerAvailable: error,
        });
      }
    );
  };

  stop = () => {
    this.pedoService && this.pedoService.remove();
    this.pedoService = null;

    const cancelDialog = {
      text: "Close",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel",
    };
    Alert.alert(
      "Run finished!",
      this.state.kilometersRun + " kilometers ran!",
      [cancelDialog],
      { cancelable: false }
    );

    this.props.navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };
  startRun() {
    if (this.state.isRunning === false) {
      this.setState({ btnName: "Stop Run" });
      this.setState({ isRunning: true });
      //timer stuff
      var self = this;
      let timer = setInterval(() => {
        var num = (Number(this.state.milliseconds) + 1).toString(),
          count = this.state.counter;

        if (Number(this.state.milliseconds) == 99) {
          count = (Number(this.state.counter) + 1).toString();
          num = "00";
        }

        self.setState({
          counter: count.length == 1 ? "0" + count : count,
          milliseconds: num.length == 1 ? "0" + num : num,
        });
      }, 0);
      this.setState({ timer });
      //end timer stuff
      this.start();
    } else {
      this.setState({ btnName: "Start Run" });
      this.setState({ isRunning: false });

      this.stop();
      this.handleCompleteWorkout();
    }
  }
  handleCompleteWorkout() {
    this.setState({
      endTime: Date.now(),
    });

    //Prepare the workout object, to conform to the db interface
    const newWorkout = {
      cardioWorkout: {
        kilometersRun: this.state.kilometersRun,
        currentStepCount: this.state.currentStepCount,
      },
      startTime: this.state.startTime,
      endTime: Date.now(),
      isCardio: true,
      user: this.props.user,
    };
    if (this.props.user == undefined) {
      //MUST pass user, cancel workout, take them back to home screen to log in.
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
      return;
    }
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
      <View style={styles.container}>
        <Text style={styles.fontSizeSmall}>Your Current Steps Are</Text>
        <Text style={styles.fontSizeBig}>{this.state.currentStepCount}</Text>
        <Text style={styles.fontSizeSmall}>Kilometers Run:</Text>
        <Text style={styles.fontSizeBig}>
          {this.state.kilometersRun.toFixed(2)}
        </Text>
        <Text style={styles.fontSizeSmall}>Time:</Text>
        <Text style={styles.fontSizeBig}>
          {this.state.counter} : {this.state.milliseconds}
        </Text>
        <Button
          title={this.state.btnName}
          onPress={() => this.startRun()}
        ></Button>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.user.user,
    // routine: state.routine.routine,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    //saveWorkout: (workout) => dispatch(saveWorkout(workout)),
    createWorkout: (workout) => dispatch(createWorkout(workout)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CardioWorkout);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  fontSizeBig: {
    fontSize: 100,
  },
  fontSizeSmall: {
    fontSize: 40,
  },
  fontSizeMini: {
    fontSize: 10,
  },
});
