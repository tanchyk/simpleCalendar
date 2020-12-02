import React from "react";
import {Event, PropsEvent} from "./Event";

interface ListProps {
    list: Array<PropsEvent>
    deleteHandler(_id: string): void
}

export const EventList: React.FC<ListProps> = ({list, deleteHandler}) => {
    return (
        <div className="wrapper">
            <div className="maybe-table">
                <div className="time-element"><p className="every-time">8:00</p></div>
                <div className="time-element2"><p className="every-time">8:30</p></div>
                <div className="time-element"><p className="every-time">9:00</p></div>
                <div className="time-element2"><p className="every-time">9:30</p></div>
                <div className="time-element"><p className="every-time">10:00</p></div>
                <div className="time-element2"><p className="every-time">10:30</p></div>
                <div className="time-element"><p className="every-time">11:00</p></div>
                <div className="time-element2"><p className="every-time">12:30</p></div>
                <div className="time-element"><p className="every-time">12:00</p></div>
                <div className="time-element2"><p className="every-time">12:30</p></div>
                <div className="time-element"><p className="every-time">13:00</p></div>
                <div className="time-element2"><p className="every-time">13:30</p></div>
                <div className="time-element"><p className="every-time">14:00</p></div>
                <div className="time-element2"><p className="every-time">14:30</p></div>
                <div className="time-element"><p className="every-time">15:00</p></div>
                <div className="time-element2"><p className="every-time">15:30</p></div>
                <div className="time-element"><p className="every-time">16:00</p></div>
                <div className="time-element2"><p className="every-time">16:30</p></div>
                <div className="time-element"><p className="every-time">17:00</p></div>
            </div>
            <div className="list-events">
                {list.map((todo, key) => {
                    return <Event
                        _id={todo._id}
                        start={todo.start}
                        duration={todo.duration}
                        title={todo.title}
                        key={key}
                        deleteHandler={deleteHandler}
                    />
                })}
            </div>
        </div>
    );
};