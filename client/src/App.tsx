import React from 'react';
import {AuthPage} from "./pages/AuthPage";
import {LoginContext} from "./context/LoginContext";
import {useLogin} from "./hooks/login.hook";
import {BrowserRouter} from "react-router-dom";
import {Routes} from './routes';
import {useHttp} from "./hooks/http.hook";

const App: React.FC = () => {
    const {login, logout, token, userId, ready} = useLogin();
    const isAuth = !!token;
    const routes = Routes(isAuth);

    return (<LoginContext.Provider value={{
            token: token,
            userId: userId,
            isAuth: ready,
            login: login,
            logout: logout
        }}>
            <BrowserRouter>
                <div>
                    {routes}
                </div>
            </BrowserRouter>
        </LoginContext.Provider>
    );
}

export default App;
