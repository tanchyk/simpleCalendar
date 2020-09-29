import * as React from 'react';
import {Header} from "../components/Header";
import {ToDo, PropsToDo} from "../components/ToDo";
import {ToDoList} from "../components/ToDoList";
import {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {LoginContext} from "../context/LoginContext";

export const ToDoPage: React.FC = () => {
    const [list, setList] = useState<Array<PropsToDo>>([]);
    const {request} = useHttp();
    const userData: any = JSON.parse(localStorage.getItem('userData')!);
    const auth = useContext(LoginContext);

    const deleteHandler = async (todo_id: number) => {
        await request(`http://localhost:5000/api/todo/${todo_id}`, 'DELETE');
    }

    const getData = useCallback(async () => {
        const data: any = await request(`http://localhost:5000/api/todo/${userData['userId']}`, 'GET', null, {
            authorization: `Bearer ${auth.token}`
        });
        setList(data.newTodo.rows);
    }, [request, auth]);

    useEffect(()=> {
        getData();
    }, [getData, deleteHandler]);

    return (
        <div>
            <Header />
            <div className={'list'}>
                <h2>Your List<i className={'material-icons small add-item teal-text darken-1'}>add_circle</i></h2>
                <ToDoList list={list} deleteHandler={deleteHandler}/>
            </div>
        </div>
    );
}