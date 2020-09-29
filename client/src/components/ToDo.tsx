import React from "react";

export interface PropsToDo {
    todo_id: number
    description: string
    complete: boolean
}

export const ToDo: React.FC<PropsToDo> = ({todo_id, description, complete}) => {
    let line: string = 'collection-item';
    if(complete) {
        line += ' completed'
    }

    return <a className={line + ' list-item'}>
        <i className={'material-icons done-icon'}>done</i>
        {description}
        <i className={'material-icons delete-icon'}>delete_forever</i>
    </a>
}