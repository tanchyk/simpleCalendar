import React from "react";
import {ToDo, PropsToDo} from "./ToDo";

interface ListProps {
    list: Array<PropsToDo>
}

export const ToDoList: React.FC<ListProps> = ({list}) => {
    return (
        <div className={'collection'}>
            {list.map(todo => {
                return <ToDo todo_id={todo.todo_id} task={todo.task} complete={todo.complete} />
            })}
        </div>
    );
}