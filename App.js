import 'firebase/firestore';

import React, {useEffect} from "react";

import AppNavigator from './navigation/AppNavigator';
import { Provider } from "react-redux";
import Store from "./redux/store";
import { StyleSheet } from "react-native";
import firebase from 'firebase';
import {firebaseConfig} from './FirebaseConfig';

let _store = null;
export default function App() {
  useEffect(() => {
    //Reloading Expo will attempt to reinitialize. Don't do that..
    if (firebase.apps.length === 0) {
      console.log("Initializing Firebase");
      firebase.initializeApp(firebaseConfig)
    }
    
  }, []);

  return (
    <Provider store={Store}>
      <AppNavigator />
    </Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
