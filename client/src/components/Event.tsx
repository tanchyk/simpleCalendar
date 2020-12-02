import React from "react";

export interface PropsEvent {
    _id: string
    start: number
    duration: number
    title: string
    deleteHandler(_id: string): void
}

export const Event: React.FC<PropsEvent> = ({_id, title, start,duration, deleteHandler}) => {

    return (
        <div className='event' style={{height: `${duration * 2}px`, top: `${start * 2}px`}} onClick={() => deleteHandler(_id)}>
            <p className='event-text'>{title}</p>
        </div>
    );
}