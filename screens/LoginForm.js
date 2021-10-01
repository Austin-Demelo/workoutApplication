import {
  Alert,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { loginUser, registerUser, signOut } from "../redux/modules/userModule";

import React from "react";
import { connect } from "react-redux";

class LoginForm extends React.Component {
  constructor(props) {
    console.disableYellowBox = true;
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  componentWillMount() {
    //this.autoLogin()
  }

  autoLogin() {
    this.props
      .loginUser("daniel1@gmail.com", "Password123")
      .then((result) => {});
  }

  handleLogin() {
    this.props
      .loginUser(this.state.email, this.state.password)
      .then((result) => {
        this.setState({ results: result.result });
        this.props.navigation.goBack();

        const cancelDialog = {
          text: "Close",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        };

        if (this.props.user !== undefined) {
          Alert.alert(
            "User Login succesful!",
            this.props.user + " has signed in",
            [cancelDialog],
            { cancelable: false }
          );
        } else {
          console.log(this.props.message);
          Alert.alert("Could not login", this.props.message, [cancelDialog], {
            cancelable: false,
          });
        }
      });
  }

  handleRegister() {
    this.props
      .registerUser(this.state.email, this.state.password)
      .then((result) => {
        this.props.navigation.goBack();

        const cancelDialog = {
          text: "Close",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        };

        if (this.props.user !== undefined) {
          Alert.alert(
            "User Register succesful!",
            this.props.user + " has registered ",
            [cancelDialog],
            { cancelable: false }
          );
        } else {
          console.log(this.props.message);
          Alert.alert(
            "Could not Register",
            this.props.message,
            [cancelDialog],
            { cancelable: false }
          );
        }
      });
  }
  handleSignOut() {
    this.props.signOut();
  }

  render() {
    return (
      <View>
        {this.props.user == undefined ? (
          //If they are NOT signed in
          <View>
            <Text>Email:</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => {
                this.setState({ email: text });
              }}
              value={this.state.email}
            />

            <Text>Password:</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => {
                this.setState({ password: text });
              }}
              value={this.state.password}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() => this.handleLogin()}
            >
              <Text style={styles.textSubmit}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => this.handleRegister()}
            >
              <Text style={styles.textSubmit}>Register</Text>
            </TouchableOpacity>
          </View>
        ) : (
          //If they are signed in
          <View>
            <Button title="Sign Out" onPress={() => this.handleSignOut()} />
          </View>
        )}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.user,
    message: state.user.message,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginUser: (email, password) => dispatch(loginUser(email, password)),
    registerUser: (email, password) => dispatch(registerUser(email, password)),
    signOut: (email, password) => dispatch(signOut(email, password)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

const styles = StyleSheet.create({
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
    textAlignVertical: "top",
  },
  button: {
    marginTop: 5,
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 100,
    marginRight: 100,
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "black",
  },
  textSubmit: {
    textAlign: "center",
    fontSize: 20,
  },
});
