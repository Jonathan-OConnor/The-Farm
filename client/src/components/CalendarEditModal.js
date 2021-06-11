import React, { useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done'
import CircularProgress from '@material-ui/core/CircularProgress';

function CalendarCreationModal(props) {

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

   

    return (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Edit an Event</h2>
            <div className="container">
                <p id="simple-modal-description">
                    Event Selected: {props.selectedEvent.title}
                </p>
                <label for="event-name">Event Name:</label>
                <input type="text" id="event-name" name="event-name" defaultValue={props.selectedEvent.title}></input>
                <div className="row">
                    <label for="event-desc">Event Description:</label>
                    <textarea id="event-desc" name="event-desc" rows="4" cols="50" defaultValue={props.selectedEvent.description}></textarea>
                </div>
                <button className="btn btn-primary" > Save Edit </button>
            </div>
        </div>
    )
}

export default CalendarCreationModal