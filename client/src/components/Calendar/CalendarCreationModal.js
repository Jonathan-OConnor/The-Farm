import React, { useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done'
import CircularProgress from '@material-ui/core/CircularProgress';

function CalendarCreationModal(props) {

    const [eventCreationError, setEventCreationError] = useState(false)
    const [eventCreationLoading, setEventCreationLoading] = useState(false)
    const [eventCreationDone, setEventCreationDone] = useState(false)
    const [isYearly, isYearlyToggle] = useState(false)
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

    async function createEvent() {
        const data = {
            date: props.selectedDate,
            title: document.getElementById("event-name").value,
            description: document.getElementById("event-desc").value,
            yearly: isYearly,
            uuid: localStorage.uuid || sessionStorage.uuid || '',
            sessionDate: localStorage.sessionDate || sessionStorage.sessionDate || ''
        }
        setEventCreationLoading(true)
        const response = await fetch('/api/event', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Session': localStorage.session || '',
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
        setEventCreationLoading(false)
        if (!response.status) {
            setEventCreationError(true)
        } else {
            setEventCreationError(false)
            console.log(response.eventData)
            props.addEvent(response.eventData)
            props.closeModal()
            setEventCreationDone(true)
        }
    }

    function toggleYearly() {
        isYearlyToggle(!isYearly)
    }

    return (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Create an Event</h2>
            <div className="container">
                <p id="simple-modal-description">
                    Date Selected: {props.selectedDate}
                </p>
                <label for="event-name">Event Name:</label>
                <input type="text" id="event-name" name="event-name"></input>
                <div className="row">
                    <label for="event-desc">Event Description:</label>
                    <textarea id="event-desc" name="event-desc" rows="4" cols="50" ></textarea>
                </div>
                <div class="form-check">
                    <label class="form-check-label" for="yearlyEventCheck">
                        Yearly Event
                    </label>
                    <input class="form-check-input" type="checkbox" value="" id="yearlyEventCheck" onClick={toggleYearly} />
                </div>

                <button className="btn btn-primary" onClick={createEvent}>{eventCreationLoading ? <CircularProgress color="black" /> : eventCreationDone ? <DoneIcon /> : "Submit"} </button>
            </div>
        </div>
    )
}

export default CalendarCreationModal