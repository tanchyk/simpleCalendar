import * as React from 'react';
import {Header} from "../components/Header";
import {PropsToDo} from "../components/ToDo";
import {ToDoList} from "../components/ToDoList";
import {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {LoginContext} from "../context/LoginContext";
import {AddToDo} from "../components/AddToDo";

export const ToDoPage: React.FC = () => {
    const [list, setList] = useState<Array<PropsToDo>>([]);
    const {request} = useHttp();
    const auth = useContext(LoginContext);

    const deleteHandler = async (todo_id: number) => {
        await request(`http://localhost:5000/api/todo/${todo_id}`, 'DELETE', null,  {
            authorization: `Bearer ${auth.token}`
        });
        await getData();
    }

    const doneHandler = async (todo_id: number, complete: boolean) => {
        await request(`http://localhost:5000/api/todo/${todo_id}`, 'PUT', {complete: complete}, {
            authorization: `Bearer ${auth.token}`
        });
        await getData();
    }

    const addHandler = async (userId: number | null, description: string) => {
        await  request(`http://localhost:5000/api/todo/`, 'POST', {
            description,
            userId
        }, {
            authorization: `Bearer ${auth.token}`
        });
        await getData();
    }

    const getData = useCallback(async () => {
        const data: any = await request(`http://localhost:5000/api/todo/${auth['userId']}`, 'GET', null, {
            authorization: `Bearer ${auth.token}`
        });
        setList(data.newTodo.rows);

    }, [auth]);

    useEffect(()=> {
        getData();
        console.log('Use Effect is called');
    }, [getData]);

    return (
        <div>
            <Header />
            <div className="list">
                <h2>Your List</h2>
                <ToDoList list={list} deleteHandler={deleteHandler} doneHandler={doneHandler}/>
                <AddToDo addHandler={addHandler} />
            </div>
        </div>
    );
}