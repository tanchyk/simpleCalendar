import * as React from 'react';
import {useContext, useEffect, useState} from "react";
import {Form} from "../interfaces";
import {useHttp} from "../hooks/http.hook";
import {LoginContext} from "../context/LoginContext";
import {useMessage} from "../hooks/message";

export const AuthPage: React.FC = () => {
    const [form, setForm] = useState<Form>({
        email: '',
        password: ''
    });
    const {request, error, clearErr} = useHttp();
    const auth = useContext(LoginContext);
    const message = useMessage();

    useEffect(() => {
        message(error);
        clearErr();
    }, [error, clearErr]);

    useEffect(() => {
        window.M.updateTextFields();
    }, [])

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setForm({...form, [event.target.id]: event.target.value});
    }

    const loginHandler = async (): Promise<void> => {
        try {
            const data: any = await request('http://localhost:5000/api/auth/login', 'POST', {...form});
            await auth.login(data.token, data.userId);

        } catch (e) {}
    }

    const registerHandler = async (): Promise<void> => {
        try {
            const data: any = await request('http://localhost:5000/api/auth/register','POST', {...form});
            console.log(data);
            await loginHandler();
        } catch (e) {}
    }

    return (
        <div className="auth-container">
            <div className="name"><i className="medium material-icons blue-text darken-1">av_timer</i><p className="main-logo">CalendarTs</p></div>
            <div className="card">
                <div className="card-content">
                    <span className="card-title grey-text text-darken-4">Authorization</span>

                    <div className="row" style={{marginBottom: 0}}>
                        <div className="input-field col s12 ">
                            <input
                                id="email"
                                type="email"
                                className="validate"
                                value={form.email}
                                onChange={changeHandler}
                            />
                            <label htmlFor="email">Email</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                id="password"
                                type="password"
                                className="validate"
                                value={form.password}
                                onChange={changeHandler}
                            />
                                <label htmlFor="password">Password</label>
                        </div>
                    </div>

                    <a className="waves-effect waves-light btn blue darken-1" onClick={loginHandler}><i className="material-icons left">assignment_ind</i>Log In</a>
                    <a className="waves-effect waves-light btn blue darken-1" style={{marginLeft: 20}} onClick={registerHandler}><i className="material-icons left">add_circle_outline</i>Sign In</a>
                </div>
            </div>
        </div>
    );
}