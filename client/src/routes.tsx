import React, {ReactElement} from "react";
import {Switch, Route, Redirect } from 'react-router-dom';
import {AuthPage} from "./pages/AuthPage";
import {Header} from "./components/Header";
import {EventsPage} from "./pages/EventsPage";

export const Routes = (isAuth: boolean): ReactElement => {
    if(isAuth) {
        return (
            <Switch>
                <Route exact path="/event-calendar">
                    <EventsPage />
                </Route>
                <Redirect to="/event-calendar" />
            </Switch>
        );
    } else {
        return  (
            <Switch>
                <Route path="/">
                    <AuthPage />
                </Route>
                <Route path="/register">

                </Route>
                <Redirect to="/" />
            </Switch>
        );
    }
}