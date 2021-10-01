import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { getWorkouts } from "../redux/modules/workoutModule";
import { ScrollView } from "react-native-gesture-handler";

class Stats extends React.Component {

    constructor(props) {
        console.disableYellowBox = true;
        super(props);
        this.state = {
            stats: [],
            averageLength: "",
            exercisesCompleted: "",
            workoutsCompleted: "",
            isLoaded: false
        };


        this.props.getWorkouts(this.props.user).then((result) => {
            console.log("RAN GET WORKOUTS")
            this.runComputations();
        });


        //this.runComputations();
    }

    runComputations() {
        let exerciseNames = []
        let WorkooutTime = []
        let completedExercises = 0
        let completedWorkouts = 0
        let averageTimedWorkouts = 0

        console.log("running")
        for (const element of this.props.workout) {
            //console.log(element);
            WorkooutTime.push(element.startTime - element.endTime)
            console.log(element.startTime - element.endTime)
            let completeWorkout = true;
            if (element.isCardio === false) {

                for (const inner of element.workout) {

                    var obj = {}
                    var InLoop = false;
                    if (element.workout.sets === element.workout.setsCompleted) {
                        completedExercises++
                    } else {
                        completeWorkout = false;
                    }
                    exerciseNames.forEach((item) => {

                        if (item.name === inner.exercise.exerciseName) {
                            item.setsTotal += inner.setsCompleted * inner.exercise.reps
                            InLoop = true;
                            //break;
                        }
                    });

                    if (InLoop === false) {
                        obj["name"] = inner.exercise.exerciseName
                        obj["setsTotal"] = inner.setsCompleted * inner.exercise.reps
                        exerciseNames.push(obj)
                    }
                }
            }
            if (completeWorkout === true) {
                completedWorkouts++;
            }
        }
        //Do the WorkoutAverage Time
        for (const elem of WorkooutTime) {
            averageTimedWorkouts += elem;
        }
        averageTimedWorkouts = averageTimedWorkouts / WorkooutTime.length;
        averageTimedWorkouts = (averageTimedWorkouts / 1000) * -1
        averageTimedWorkouts = averageTimedWorkouts.toFixed(2)


        this.setState({
            stats: exerciseNames,
            averageLength: averageTimedWorkouts,
            exercisesCompleted: completedExercises,
            workoutsCompleted: completedWorkouts,
          })
        console.log("1 " + this.state.averageLength)

    }

    render() {
        return (
            <View>
                <ScrollView>
                    <View>
                        <Text style={styles.textTitle}>{this.props.user} Stats</Text>
                    </View>

                    {/* {this.state.isLoaded === true && */}
                        <View>
                            <View style={styles.line}></View>
                            {this.state.stats.map((statistics, index) =>
                                <View style={styles.statsGroup} key={index}> 
                                    <View style={styles.statsView}>
                                        <Text style={styles.textBody}>Workout: </Text>
                                        <Text style={styles.textBodyStats}>{statistics.name}</Text>
                                    </View>
                                    <View style={styles.statsView}>
                                        <Text style={styles.textBody}>Completed: </Text>
                                        <Text style={styles.textBodyStats}>{statistics.setsTotal}</Text>
                                    </View>
                                    <View style={styles.line}></View>
                                </View>

                            )}
                            <View>
                                <Text style={styles.textBody}>Average Workout Length {this.state.averageLength} seconds</Text>
                                <Text style={styles.textBody}>Total completed Exercises {this.state.exercisesCompleted}</Text>
                                <Text style={styles.textBody}>Total completed Workouts {this.state.workoutsCompleted}</Text>
                            </View>

                        </View>
                    {/* } */}

                </ScrollView>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.user,
        stat: state.stat,
        workout: state.workout.workouts
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getWorkouts: (user) => dispatch(getWorkouts(user))
    };
}

export default connect
    (
        mapStateToProps,
        mapDispatchToProps
    )(Stats);


const styles = StyleSheet.create({
    screen: {
        backgroundColor: "#41CE7E",
        flex: 1,
    },
    textBodyStats: {
        fontSize: 15,
        textAlign: "center",
        paddingTop: 3,
        color: "red"
    },
    textBody: {
        fontSize: 15,
        textAlign: "center",
        paddingTop: 3,
    },
    textTitle: {
        fontSize: 20,
        textAlign: "center",
    },
    statsView: {
        marginLeft: "35%",
        textAlign: "center",

        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    statsGroup: {

    },
    line: {
        marginBottom: 2,
        marginTop: 2,
        flex: 0.28,
        borderBottomWidth: 1,
        borderBottomColor: '#428947',
    }
});