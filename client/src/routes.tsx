import React, {ReactElement} from "react";
import {Switch, Route, Redirect } from 'react-router-dom';
import {ToDoPage} from './pages/ToDoPage';
import {AuthPage} from "./pages/AuthPage";

export const Routes = (isAuth: boolean): ReactElement => {
    if(isAuth) {
        return (
            <Switch>
                <Route exact path="/todo-page">
                    <ToDoPage />
                </Route>
                <Redirect to="/todo-page" />
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