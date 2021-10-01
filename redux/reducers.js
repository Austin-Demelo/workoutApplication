import { State } from 'react-native-gesture-handler';
import { combineReducers } from 'redux';
import { exerciseReducer } from './modules/exerciseModule';
import { routineReducer } from './modules/routineModule';
import { userReducer } from './modules/userModule';
import { workoutReducer } from './modules/workoutModule';
import { statReducer } from './modules/statsModule';

function firebaseReducer(state = {}, action) {
	return state;
}

const rootReducer = combineReducers(
	{
		exercise: exerciseReducer,
		user: userReducer,
		firebase: firebaseReducer,
		routine: routineReducer,
		workout: workoutReducer,
		stat: statReducer
	}
);

export default rootReducer;