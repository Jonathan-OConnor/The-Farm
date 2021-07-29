import React, { useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done'
import CircularProgress from '@material-ui/core/CircularProgress';

function CalendarCreationModal(props) {

    const [eventEditLoading, setEventEditLoading] = useState(false)
    const [eventEditDone, setEventEditDone] = useState(false)
    const [eventDeleteLoading, setEventDeleteLoading] = useState(false)
    const [eventDeleteDone, setEventDeleteDone] = useState(false)
    const [isYearly, setIsYearly] = useState(props.selectedEvent.extendedProps.yearly)
    const [modalStyle, setModalStyle] = useState(getModalStyle)
    
    // modal styling
    function getModalStyle() {
        return {
            top: `30%`,
            left: `50%`,
            transform: `translate(-50%, -50%)`,
        };
    }
    const useStyles = makeStyles((theme) => ({
        paper: {
            position: 'absolute',
            width: '1000px',
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },

    }));
    const classes = useStyles();

    function toggleYearly(){
        setIsYearly(!isYearly)
    }

    async function editEvent(){
        setEventEditLoading(true)
        const data = { 
            date: props.selectedEvent.startStr, 
            title: document.getElementById("edit-name").value, 
            description: document.getElementById("edit-desc").value,
            yearly: isYearly,
            _id: props.selectedEvent.extendedProps._id,
            uuid: localStorage.uuid || sessionStorage.uuid || '',
            sessionDate: localStorage.sessionDate || sessionStorage.sessionDate || ''
        }
        const response = await fetch('/api/event', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Session': localStorage.session || ''
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
        setEventEditLoading(false)
        props.updateEvent(data)
        props.closeModal()
        setEventEditDone(true)
    }
   async function deleteEvent(){
    setEventDeleteLoading(true)
    const data={
        _id: props.selectedEvent.extendedProps._id,
        uuid: localStorage.uuid || sessionStorage.uuid || '',
        sessionDate: localStorage.sessionDate || sessionStorage.sessionDate || ''
    }
    const response = await fetch('/api/event', {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
            'Session': localStorage.session || ''
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
    if (response.status){
        setEventDeleteLoading(false)
        props.deleteEvent(data)
        props.closeModal()
        setEventDeleteDone(true)
    }
   }

    return (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Edit an Event</h2>
            <div className="container">
                <p id="simple-modal-description">
                    Event Selected: {props.selectedEvent.title}
                </p>
                <label for="event-name">Event Name:</label>
                <input type="text" id="edit-name" name="edit-name" defaultValue={props.selectedEvent.title}></input>
                <div className="row">
                    <label for="event-desc">Event Description:</label>
                    <textarea id="edit-desc" name="edit-desc" rows="4" cols="50" defaultValue={props.selectedEvent.extendedProps.description}></textarea>
                </div>
                <div class="form-check">
                    <label class="form-check-label" for="yearlyEventCheck">
                        Yearly Event
                    </label>
                    <input class="form-check-input" type="checkbox" value="" id="yearlyEventCheck" checked={isYearly} onClick={toggleYearly}/>
                </div>
                <button className="btn btn-primary" onClick={editEvent}>{eventEditLoading ? <CircularProgress color="black" /> : eventEditDone ? <DoneIcon /> : "Save Edit"} </button>
                <button className="btn btn-danger" onClick={deleteEvent}>{eventDeleteLoading ? <CircularProgress color="black" /> : eventDeleteDone ? <DoneIcon /> : "Delete Event"} </button>
            </div>
        </div>
    )
}

export default CalendarCreationModal