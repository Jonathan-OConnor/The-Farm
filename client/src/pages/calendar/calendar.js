import React from 'react'
import FullCalendar from '@fullcalendar/react'
import Grow from '@material-ui/core/Grow';
import Navbar from "../../components/Navbar"
import dayGridPlugin from '@fullcalendar/daygrid'
import "./calendar.css"


function Calendar() {

    return (
        <div>
            <Navbar active="calendar" />
            <div className="container">
                <Grow in={true}>
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                        events={[{ title: 'Hi Maria', date: '2021-04-28' }]}
                    />
                </Grow>
            </div>

        </div>


    )
}

export default Calendar