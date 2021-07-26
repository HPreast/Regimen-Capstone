import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Dashboard } from "./dashboard";
import Login from "./login";
import Register from "./register";

export default function ApplicationViews({ isLoggedIn }) {
    return (
        <main>
            <Switch>
                <Route path="/" exact>
                    {isLoggedIn ? <Dashboard /> : <Redirect to="/login" />}
                </Route>

                {/* <Route path="/add">
                    {isLoggedIn ? <QuoteAddForm /> : <Redirect to="/login" />}
                </Route> */}

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