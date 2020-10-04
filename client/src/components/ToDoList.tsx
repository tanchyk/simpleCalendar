import React from "react";
import {ToDo, PropsToDo} from "./ToDo";

interface ListProps {
    list: Array<PropsToDo>
    deleteHandler(todo_id: number): void
    doneHandler(todo_id: number, complete: boolean): void
}

export const ToDoList: React.FC<ListProps> = ({list, deleteHandler, doneHandler}) => {
    return (
        <div className={'collection'}>
            {list.map((todo, key) => {
                return <ToDo
                    todo_id={todo.todo_id}
                    description={todo.description}
                    complete={todo.complete}
                    key={key}
                    deleteHandler={deleteHandler}
                    doneHandler={doneHandler}
                />
            })}
        </div>
    );
};