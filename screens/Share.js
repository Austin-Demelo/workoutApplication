import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { getWorkouts } from "../redux/modules/workoutModule";
import * as MailComposer from 'expo-mail-composer';
import * as SMS from 'expo-sms';


class Share extends React.Component {

    constructor(props) {
        super(props);
        this.props.getWorkouts(this.props.user).then((result) => {

        });
        // -Style workout info to red
        let exerciseNames = []
        let WorkooutTime = []
        let completedExercises = 0
        let completedWorkouts = 0
        let averageTimedWorkouts = 0

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
                if (completeWorkout === true) {
                    completedWorkouts++;
                }
            }
        }
        //Do the WorkoutAverage Time
        for (const elem of WorkooutTime) {
            averageTimedWorkouts += elem;
        }
        averageTimedWorkouts = averageTimedWorkouts / WorkooutTime.length;
        averageTimedWorkouts = (averageTimedWorkouts / 1000) * -1
        averageTimedWorkouts = averageTimedWorkouts.toFixed(2)
        console.log(averageTimedWorkouts)

        this.state = {
            stats: exerciseNames,
            averageLength: averageTimedWorkouts,
            exercisesCompleted: completedExercises,
            workoutsCompleted: completedWorkouts

        };
    }

    sendMessageWithSMS = async () => {
        const isAvailable = await SMS.isAvailableAsync();

        let message = ""
        for (const statistics of this.state.stats) {

            message += "Workout:" + statistics.name + "\n"
                + "Completed:" + statistics.setsTotal + "\n"
        }
        message += "Average Workout Length: " + this.state.averageLength + "\n"
            + "Total completed Exercises: " + this.state.exercisesCompleted + "\n"
            + "Total completed Workouts: " + this.state.workoutsCompleted + "\n"

        if (isAvailable) {
            const { result } = await SMS.sendSMSAsync(
                ['12269848128'],
                message
            );
            console.log(result);
        } else {
            console.log("SMS is not available on this device");
        }
    }

    sendMessageWithEmail = () => {
        let message = ""
        for (const statistics of this.state.stats) {

            message += "Workout:" + statistics.name + "\n"
                + "Completed:" + statistics.setsTotal + "\n\n"
        }
        message += "Average Workout Length: " + this.state.averageLength + "\n"
            + "Total completed Exercises: " + this.state.exercisesCompleted + "\n"
            + "Total completed Workouts: " + this.state.workoutsCompleted + "\n"

        var options = {
            // recipients (array) -- An array of e-mail addressess of the recipients.
            recipients: ['d_baker60713@fanshaweonline.ca'],
            // ccRecipients (array) -- An array of e-mail addressess of the CC recipients.
            // bccRecipients (array) -- An array of e-mail addressess of the BCC recipients.
            // subject (string) -- Subject of the mail.
            subject: this.props.user + " stats",
            // body (string) -- Body of the mail.
            body: message
            // isHtml (boolean) -- Whether the body contains HTML tags so it could be formatted properly. Not working perfectly on Android.
            // attachments (array) -- An array of app's internal file uris to attach.
        };

        MailComposer.composeAsync(options).then((result) => { console.log(result.status); });
    }

    render() {
        return (
            <View>
                <Text>Send Stats to a friend</Text>
                <TouchableOpacity onPress={() => this.sendMessageWithSMS()}>
                    <View style={styles.buttons}>
                        <Text style={styles.buttonText}>Text Stats</Text>
                    </View>
                </TouchableOpacity>

                <Text>Email a friend</Text>
                <TouchableOpacity onPress={() => this.sendMessageWithEmail()}>
                    <View style={styles.buttons}>
                        <Text style={styles.buttonText}>Email Stats</Text>
                    </View>
                </TouchableOpacity>
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
    )(Share);


const styles = StyleSheet.create({
    screen: {
        padding: 50,
        textAlign: 'center'
    },
    buttons: {
        padding: 12,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        margin: 2,
        marginBottom: 10,
        borderColor: 'black',
        borderWidth: 1
    },
    buttonText: {
        color: 'black',
        fontSize: 20,
        fontFamily: 'serif'
    },
    buttons2: {
        padding: 12,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        margin: 2,
        marginBottom: 10,
        borderColor: 'white',
        borderWidth: 1
    },
});