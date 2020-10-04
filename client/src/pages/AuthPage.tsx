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
            <h1 className="main-logo">TODO<span className="teal-text darken-1">TS</span></h1>
            <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                    <img className="activator"
                         src="https://images.pexels.com/photos/1226398/pexels-photo-1226398.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"/>
                </div>
                <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4">Authorization<i
                        className="material-icons right">more_vert</i></span>

                    <div className="row" style={{marginBottom: 0}}>
                        <div className="input-field col s12">
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

                    <a className="waves-effect waves-light btn" onClick={loginHandler}><i className="material-icons left">assignment_ind</i>Log In</a>
                    <a className="waves-effect waves-light btn" style={{marginLeft: 20}} onClick={registerHandler}><i className="material-icons left">add_circle_outline</i>Sign In</a>
                </div>

                <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">Organize your work with TODOTS<i
                        className="material-icons right">close</i></span>
                    <p>One of the things I get asked by a lot by a lot of people is, ‘How do you manage to get so many things done?’ And I do. I have a lot of hobbies, I have a lot of businesses, and I get a lot done. I still enjoy my own time doing things I love doing. Sometimes I get ribbed because I run a calendar system for home and for my businesses. It took me a while to get my wife into the spirit of being more organized.</p>
                    <p>With our website you can do all of this and even more!</p>
                </div>
            </div>
        </div>
    );
}