import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Dashboard } from "./dashboard";
import { ExerciseList } from "./exercises/exerciseList";
import { ExerciseDetails } from "./exercises/exerciseDetails";
import { WorkoutList } from "./workouts/workoutList";
import Login from "./login";
import Register from "./register";
import { WorkoutForm } from "./workouts/workoutForm";
import { WorkoutEdit } from "./workouts/workoutEdit";

export default function ApplicationViews({ isLoggedIn }) {
    return (
        <main>
            <Switch>
                <Route path="/" exact>
                    {isLoggedIn ? <Dashboard /> : <Redirect to="/login" />}
                </Route>

                <Route exact path="/workouts">
                    {isLoggedIn ? <WorkoutList /> : <Redirect to="/login" />}
                </Route>

                <Route exact path="/workoutForm">
                    {isLoggedIn ? <WorkoutForm /> : <Redirect to="/login" />}
                </Route>

                <Route exact path="/workouts/edit/:id">
                    {isLoggedIn ? <WorkoutEdit /> : <Redirect to="/login" />}
                </Route>

                <Route exact path="/exercises">
                    {isLoggedIn ? <ExerciseList /> : <Redirect to="/login" />}
                </Route>

                <Route exact path="/exercises/exerciseDetails/:id">
                    {isLoggedIn ? <ExerciseDetails /> : <Redirect to="/login" />}
                </Route>

                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/register">
                    <Register />
                </Route>
            </Switch>
        </main>
    );
};