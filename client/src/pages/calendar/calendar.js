import React, { useState, useEffect } from 'react'
import Grow from '@material-ui/core/Grow';
import Modal from '@material-ui/core/Modal';
import CircularProgress from '@material-ui/core/CircularProgress';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import Navbar from "../../components/Navbar"
import CalendarCreationModal from "../../components/Calendar/CalendarCreationModal"
import CalendarEditModal from "../../components/Calendar/CalendarEditModal"
import "./calendar.css"


function Calendar() {

    // react state initialization
    const [loading, setLoading] = useState(true)
    const [openCreation, setOpenCreation] = useState(false)
    const [openEditing, setOpenEditing] = useState(false)
    const [events, setEvents] = useState([])
    const [selectedDate, setSelectedDate] = useState("")
    const [selectedEvent, setSelectedEvent] = useState("")

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
            const oldYearlyArray = addYearliesPast(eventList)
            const final = [...eventList, ...yearlyArray, ...oldYearlyArray]
            setEvents(final)
            setLoading(false)
        }
        getEvents()
    }, [])

    // page javascript functions
    function addYearlies(eventList) {
        const yearlyArray = []
        for (var i = 0; i < eventList.length; i++) {
            if (eventList[i].yearly) {
                const startYear = parseInt(eventList[i].date.substring(0, 4))
                const endString = eventList[i].date.substring(4, eventList[i].date.length)
                for (var j = 1; j < 51; j++) {
                    const newYear = startYear + j
                    const newDate = newYear.toString() + endString
                    const event = {
                        date: newDate,
                        title: eventList[i].title,
                        description: eventList[i].description,
                        _id: eventList[i]._id,
                        yearly: eventList[i].yearly
                    }
                    yearlyArray.push(event)
                }
            }
        }
        return yearlyArray
    }
    function addYearliesPast(eventList){
        const yearlyArray = []
        for (var i = 0; i < eventList.length; i++) {
            if (eventList[i].yearly) {
                const startYear = parseInt(eventList[i].date.substring(0, 4))
                const endString = eventList[i].date.substring(4, eventList[i].date.length)
                for (var j = 1; j < 51; j++) {
                    const newYear = startYear - j
                    const newDate = newYear.toString() + endString
                    const event = {
                        date: newDate,
                        title: eventList[i].title,
                        description: eventList[i].description,
                        _id: eventList[i]._id,
                        yearly: eventList[i].yearly
                    }
                    yearlyArray.push(event)
                }
            }
        }
        return yearlyArray
    }

    // creation modal functions
    function openCreationModal(arg) {
        setSelectedDate(arg.dateStr)
        setOpenCreation(true)
    }
    function handleCreationClose() {
        setOpenCreation(false)
    }

    function closeCreationModal() {
        setTimeout(() => { setOpenCreation(false) }, 300)
    }

    function addEvent(newEvent) {
        const newYearly = addYearlies([newEvent])
        const oldYearly = addYearliesPast([newEvent])
        setEvents([...events, newEvent, ...newYearly, ...oldYearly])
    }

    // editing modal functions
    function openEditingModal(info){
        setSelectedEvent(info.event)
        setOpenEditing(true)
    }
    function handleEditingClose(){
        setOpenEditing(false)
    }
    async function updateEvent(event){
        const temp = await removeChanged(event)
        setEvents(temp)
    }
    
    function removeChanged(event){
        const temp = []
        for (var i = 0; i < events.length; i++){
            if (events[i]._id !== event._id){
                temp.push(events[i])
            }
        }
        const temp2 = addYearlies([event])
        const temp3 = addYearliesPast([event])
        return [...temp, event, ...temp2, ...temp3]
    }

    function closeEditModal() {
        setTimeout(() => { setOpenEditing(false) }, 300)
    }

    function deleteEvent(event){
        const temp = []
        for (var i = 0; i < events.length; i++){
            if (events[i]._id !== event._id){
                temp.push(events[i])
            }
        }
        setEvents(temp)
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
                        dateClick={openCreationModal}
                        eventClick={openEditingModal}
                    />}
                </Grow>
                {/* Event Creation Modal */}
                <Modal
                    open={openCreation}
                    onClose={handleCreationClose}>
                    <CalendarCreationModal selectedDate={selectedDate} closeModal={closeCreationModal} addEvent={addEvent} />
                </Modal>
                {/* Event Editing Modal */}
                <Modal
                    open={openEditing}
                    onClose={handleEditingClose}>
                    <CalendarEditModal selectedEvent={selectedEvent} updateEvent={updateEvent} deleteEvent={deleteEvent} closeModal={closeEditModal}/>
                </Modal>
            </div>
        </div >
    )
}

export default Calendar