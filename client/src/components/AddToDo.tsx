import React, {useContext, useState} from "react";
import {LoginContext} from "../context/LoginContext";

interface PropsAdd {
    addHandler(userId: number | null, description: string): void
}

export const AddToDo: React.FC<PropsAdd> = ({addHandler}) => {
    const [description, setDescription] = useState<string>('');
    const Auth = useContext(LoginContext);

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setDescription(event.target.value);
    }

    return (
        <div className="input">
            <a className="btn-floating btn-small waves-effect waves-light darken-1 plus" onClick={() => addHandler(Auth.userId, description)}><i className="material-icons">add</i></a>
            <div className="input-field col s6">
                <input placeholder="Your task" id="task" type="text" className="validate" onChange={changeHandler}/>
            </div>
        </div>
    );
}