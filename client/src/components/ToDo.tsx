import React from "react";

export interface PropsToDo {
    todo_id: number
    description: string
    complete: boolean
    deleteHandler(todo_id: number): void
    doneHandler(todo_id: number, complete: boolean): void
}

export const ToDo: React.FC<PropsToDo> = ({todo_id, description, complete, deleteHandler, doneHandler}) => {

    let line: string = 'collection-item';
    if(complete) {
        line += ' completed'
    }

    return <a className={line + ' list-item'}>
        <i className={'material-icons done-icon'} onClick={() => doneHandler(todo_id, !complete)}>done</i>
        {description}
        <i className={'material-icons delete-icon'} onClick={() => deleteHandler(todo_id)}>delete_forever</i>
    </a>
}