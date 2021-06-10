import React, { useState, useEffect } from 'react'
import Grow from '@material-ui/core/Grow';
import Modal from '@material-ui/core/Modal';
import CircularProgress from '@material-ui/core/CircularProgress';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import Navbar from "../../components/Navbar"
import CalendarModal from "../../components/CalendarModal"
import "./calendar.css"


function Calendar() {

    // react state initialization
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const [events, setEvents] = useState([])
    const [selectedDate, setSelectedDate] = useState("")

    useEffect(() => {
        async function getEvents() {
            const { status, message, eventList } = await fetch('/api/event', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Session': localStorage.session || ''
                }
            }).then(res => res.json())
            // add yearly recurring events
            const yearlyArray = addYearlies(eventList)
            const final = [...eventList, ...yearlyArray]
            setEvents(final)
            setLoading(false)
        }
        getEvents()
    }, [])

    // page javascript functions
    function openModal(arg) {
        setSelectedDate(arg.dateStr)
        setOpen(true)
    }
    function handleClose() {
        setOpen(false)
    }

    function closeModal() {
        setTimeout(() => { setOpen(false) }, 300)
    }
    function addEvent(newEvent) {
        const newYearly = addYearlies([newEvent])
        console.log(newYearly)
        setEvents([...events, newEvent, ...newYearly])
    }

    function addYearlies(eventList) {
        const yearlyArray = []
        for (var i = 0; i < eventList.length; i++) {
            if (eventList[i].yearly) {
                const startYear = parseInt(eventList[i].date.substring(0, 4))
                const endString = eventList[i].date.substring(4, eventList[i].date.length)
                for (var j = 1; j < 31; j++) {
                    const newYear = startYear + j
                    const newDate = newYear.toString() + endString
                    const event = {
                        date: newDate,
                        title: eventList[i].title,
                        description: eventList[i].description
                    }
                    yearlyArray.push(event)
                }
            }
        }
        return yearlyArray
    }
    // component render
    return (
        <div>
            <Navbar active="calendar" />
            <div className="container">
                <Grow in={true}>
                    {loading ? <CircularProgress /> : <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        events={events}
                        dateClick={openModal}
                    />}
                </Grow>
                <Modal
                    open={open}
                    onClose={handleClose}>
                    <CalendarModal selectedDate={selectedDate} closeModal={closeModal} addEvent={addEvent} />
                </Modal>
            </div>
        </div >
    )
}

export default Calendar