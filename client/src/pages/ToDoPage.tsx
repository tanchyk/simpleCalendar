import * as React from 'react';
import {Header} from "../components/Header";
import {ToDo, PropsToDo} from "../components/ToDo";
import {ToDoList} from "../components/ToDoList";

const ary: Array<PropsToDo> = [
    {todo_id: 1,task: 'Do dishes',complete: true},
    {todo_id: 2,task: 'Do homework',complete: false}
    ]

export const ToDoPage: React.FC = () => {
    return (
        <div>
            <Header />
            <div className={'list'}>
                <h2>Your List</h2>
                <ToDoList list={ary} />
            </div>
        </div>
    );
}