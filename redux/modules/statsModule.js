import { Alert } from "react-native";
import "firebase/firestore";

import firebase from "firebase";

const StatsActions = {
    CREATE_STATS: 'stat/CREATE_STATS',
    GET_STATS: "stat/GET_STATS",
    UPDATE_STATS: 'stat/UPDATE_STATS'
};

//Creates a stat in the database, then add to Redux store
export function createStats(stat) {
    return ((dispatch, getState) => {

        return firebase.firestore().collection("Stats").add(stat)
            .then(result => {
                const payload = { ...stat, id: result.id };
                dispatch({ type: StatsActions.CREATE_STATS, payload: payload });
                return payload;
            })
            .catch(error => {
                const payload = { hasError: true, message: error };
                dispatch({ type: StatsActions.CREATE_STATS, payload: payload });
                return payload;
            });
    });
}
//Updates a stat by the id, then updates the store
export function updateStats(stat) {
    return ((dispatch, getState) => {
        const statID = stat.id;
        delete stat.id; //Don't save the id in the JSON object
        return firebase.firestore().collection("Stats").doc(statID).set(stat)
            .then(result => {
                const payload = { ...stat, id: statID };
                dispatch({ type: StatsActions.UPDATE_STATS, payload: payload });
                return payload;
            })
            .catch(error => {
                const payload = { hasError: true, message: error };
                dispatch({ type: StatsActions.UPDATE_STATS, payload: payload });
                return payload;
            });
    });
}

export function getStats(user) {
    return ((dispatch, getState) => {

        return firebase.firestore().collection("Stats").where("user", "==", user).get()
            .then(result => {
                const stats = [];
                select.forEach(function (doc) {
                    stats.push({ ...doc.data(), id: doc.id });
                });
                dispatch({ type: StatsActions.GET_STATS, payload: stats });
                return stats;
            })
            .catch(error => {
                const payload = { hasError: true, message: error };
                dispatch({ type: StatsActions.GET_STATS, payload: payload });
                return payload;
            });

    });
}

const initialState = {
    stats: [],
    hasError: false,
    message: "",
}

export function statReducer(state = initialState, action) {
    switch (action.type) {
        case StatsActions.CREATE_STATS:
            return {
                ...state,
                stats: [...state.stats, action.payload],
                hasError: false,
                message: "",
            }
        case StatsActions.GET_STATS:
            return {
                ...state,
                stats: action.payload,
                hasError: false,
                message: "",
            }
        case StatsActions.UPDATE_STATS:
            let newStates = [...state.stats];
            const updateIndex = newStates.findIndex(stat => stat.id = action.payload.id);
            newStates[updateIndex] = action.payload;
            return {
                ...state,
                stats: newStates,
                hasError: false,
                message: "",
            }
        default:
            return state;
    }
}

export { initialState as InitialStatState };