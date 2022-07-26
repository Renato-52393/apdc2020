import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from './EventCard'

export default function JoinEvents() {

    const url = 'https://apdc-fasebeta.appspot.com/events/list'
    const [events, setEvents] = useState({
        loading: false,
        data: null,
        error: false
    })

    useEffect(() => {
        setEvents({
            loading: true,
            data: null,
            error: false
        })

        axios.get(url)
            .then(response => {
                setEvents({
                    loading: false,
                    data: response.data,
                    error: false
                })
            })
            .catch(() => {
                setEvents({
                    loading: false,
                    data: null,
                    error: true
                })
            })
    }, [url])

    let content = null

    if (events.error) {
        content = <p>
            There was an error, please refresh or try again later.
        </p>
    }

    if (events.data) {
        console.log(events.data);
        content =
            events.data.map((event) => 
                <div key={event.eventsName}>
                    <EventCard
                        event={event}
                    />
                </div>
            )
    }

    return (
        <div>
            {content}
        </div>
    )
}