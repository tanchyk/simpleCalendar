import * as React from 'react';
import {Header} from "../components/Header";
import {PropsEvent} from "../components/Event";
import {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {LoginContext} from "../context/LoginContext";
import {AddEvent} from "../components/AddEvent";
import {EventList} from "../components/EventList";

export const EventsPage: React.FC = () => {
    const [list, setList] = useState<Array<PropsEvent>>([]);
    const {request} = useHttp();
    const auth = useContext(LoginContext);

    const deleteHandler = async (_id: string) => {
        await request(`http://localhost:5000/api/event/${_id}`, 'DELETE', null,  {
            authorization: `Bearer ${auth.token}`
        });
        await getData();
    }

    const addHandler = async (userId: number | null, description: string, time: any) => {
        console.log(auth)
        await  request(`http://localhost:5000/api/event/`, 'POST', {
            start: time.start,
            duration: time.duration,
            title: description,
            userId
        }, {
            authorization: `Bearer ${auth.token}`
        });
        await getData();
    }

    const getData = useCallback(async () => {
        const data: any = await request(`http://localhost:5000/api/event/${auth['userId']}`, 'GET', null, {
            authorization: `Bearer ${auth.token}`
        });
        console.log(data)
        setList(data);

    }, [auth]);

    useEffect(()=> {
        getData();
        console.log('Use Effect is called');
    }, [getData]);

    return (
        <div>
            <Header />
            <div className="list">
                <h2>Your Events For a Day</h2>
                <AddEvent addHandler={addHandler} />
                <EventList list={list} deleteHandler={deleteHandler}/>
            </div>
        </div>
    );
}