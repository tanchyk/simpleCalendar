import React, {useContext, useState} from "react";
import {LoginContext} from "../context/LoginContext";

interface PropsAdd {
    addHandler(userId: number | null, description: string, time: any): void
}

export const AddEvent: React.FC<PropsAdd> = ({addHandler}) => {
    const [description, setDescription] = useState<string>('');
    const [time, setTime] = useState({
        start: 0,
        duration: 0
    })
    const Auth = useContext(LoginContext);

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    }

    const startTimeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const start = event.target.value;
        const ary: Array<string> = start.split(':');

        const minutes = (parseInt(ary[0]) - 8)*60 +  parseInt(ary[1]);

        setTime({...time, [event.target.id]: minutes});
    }

    const durationHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTime({...time, [event.target.id]: parseInt(event.target.value)});
    }

    const checkHandler = () => {
        if((time.start + time.duration) < 540 && time.start >= 0) {
            addHandler(Auth.userId, description, time)
        }
    }

    return (
        <div className="input">
            <a className="btn-floating btn-small waves-effect waves-light blue darken-1 plus" onClick={() => checkHandler()}><i className="material-icons">add</i></a>
            <div className="input-field col s6">
                <input placeholder="Your task" id="task" type="text" className="validate" onChange={changeHandler}/>
                <input type="time" id="start" name="start" min="08:00" max="16:50" required onChange={startTimeHandler}/>
                <input type="number" id="duration" name="duration" min="10" max="180" onChange={durationHandler}/>
            </div>
        </div>
    );
}