import CurrentWorkout from "../screens/CurrentWorkout";
import ExerciseForm from "../screens/ExerciseForm";
import HomeScreen from "../screens/HomeScreen";
import LoginForm from "../screens/LoginForm";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import RoutineForm from "../screens/RoutineForm";
import RoutineList from "../screens/RoutineList";
import RoutineSelection from "../screens/RoutineSelection";
import AddExerciseForm from "../screens/AddExerciseForm";
import CardioWorkout from "../screens/CardioWorkout";
import Share from "../screens/Share";
import Stats from "../screens/Stats";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login Form" component={LoginForm} />

        <Stack.Screen name="Routine Selection" component={RoutineSelection} />
        <Stack.Screen name="Current Workout" component={CurrentWorkout} />
        <Stack.Screen name="Cardio Workout" component={CardioWorkout} />

        <Stack.Screen name="Routine List" component={RoutineList} />
        <Stack.Screen name="Create/Edit Routine" component={RoutineForm} />
        <Stack.Screen name="Create Exercise" component={ExerciseForm} />
        <Stack.Screen name="Add Exercise" component={AddExerciseForm} />

        <Stack.Screen name="Share" component={Share} />
        <Stack.Screen name="Stats" component={Stats} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
