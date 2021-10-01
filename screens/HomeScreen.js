import {
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert
} from "react-native";

import { Button } from "react-native-elements";
import React from "react";
import { connect } from "react-redux";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.props.navigation.setOptions({
      headerRight: () => (
        <Button
          icon={{ name: "account-circle" }}
          onPress={() => this.props.navigation.navigate("Login Form")}
        />
      ),
    });
  }

  notLoggedIn() {
    const cancelDialog = {
      text: "Close",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel",
    };
    console.log("This is inside the alert")
    if (this.props.user === undefined) {
      Alert.alert(
        "Not logged in",
        "Register or Login to access app",
        [cancelDialog],
        { cancelable: false }
      );
    }
  }

  render() {
    return (
      <View>
        {/* {this.props.user == undefined ?
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Routine Selection')}
                    disabled={(this.props.user == undefined)}>
                    <View style={styles.buttons}>
                        <Text style={styles.buttonText}>Start Workout</Text>
                    </View>
                </TouchableOpacity>
            } */}
        <TouchableOpacity disabled={this.props.user != undefined} onPress={() => this.notLoggedIn()}>
          <ScrollView style={styles.scrollViewer}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Routine Selection")}
              disabled={this.props.user == undefined}
            >
              <View style={styles.buttons}>
                <Text style={styles.buttonText}>Start Workout</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Routine List")}
              disabled={this.props.user == undefined}
            >
              <View style={styles.buttons}>
                <Text style={styles.buttonText}>Routine List</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Cardio Workout")}
              disabled={this.props.user == undefined}
            >
              <View style={styles.buttons}>
                <Text style={styles.buttonText}>Cardio Workout</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Stats")}
              disabled={this.props.user == undefined}
            >
              <View style={styles.buttons}>
                <Text style={styles.buttonText}>Stats</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Share")}
              disabled={this.props.user == undefined}
            >
              <View style={styles.buttons}>
                <Text style={styles.buttonText}>Share</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
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
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  screen: {
    padding: 50,
    textAlign: "center",
  },
  buttons: {
    padding: 18,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    margin: 2,
    marginBottom: 10,
    borderColor: "black",
    borderWidth: 1,
  },
  buttonText: {
    color: "black",
    fontSize: 20,
  },
  buttons2: {
    padding: 12,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    margin: 2,
    marginBottom: 10,
    borderColor: "white",
    borderWidth: 1,
  },
  scrollViewer: {
    marginTop: 30,
  },
});
