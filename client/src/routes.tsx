import React from "react";
import {Switch, Route, Redirect } from 'react-router-dom';
import {ToDoPage} from './pages/ToDoPage';
import {ProfilePage} from "./pages/ProfilePage";

export const Routes: React.FC = (isAuth: boolean) => {
    if(isAuth) {
        return (
            <Switch>
                <Route exact path="/todo-page">
                    <ToDoPage />
                </Route>
                <Route exact path="/profile">
                    <ProfilePage />
                </Route>
                <Redirect to="/todo-page" />
            </Switch>
        );
    } else {
        return  (
            <Switch>
                <Route path="/">

                </Route>
                <Route path="/register">

                </Route>
                <Redirect to="/" />
            </Switch>
        );
    }
}