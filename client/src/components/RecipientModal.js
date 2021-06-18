import React, { useState, useEffect } from "react"
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from "@material-ui/core";
import DoneIcon from '@material-ui/icons/Done';
import RecipientRow from "./RecipientRow";

function ReciepientModal(props) {
    const [modalStyle, setModalStyle] = useState(getModalStyle)
    const [allSelected, setAllSelected] = useState(props.allSelected)
    const [noneSelected, setNoneSelected] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [doneSaving, setDoneSaving] = useState(false)
    const [recipients, setRecipients] = useState(props.recipients)

    // styles
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

    // helper functions 
    function buildRecipients() {
        const final = []
        for (var i = 0; i < props.allRecipients.length; i++) {
            if (allSelected) {
                final.push(
                    <RecipientRow
                        recipient={props.allRecipients[i]}
                        allSelected={allSelected}
                        noneSelected={noneSelected}
                        toggle={toggle}
                        addRecipient={addRecipient}
                        removeRecipient={removeRecipient}
                        selected={true} />
                )
            } else if (noneSelected) {
                final.push(
                    <RecipientRow
                        recipient={props.allRecipients[i]}
                        allSelected={allSelected}
                        noneSelected={noneSelected}
                        toggle={toggle}
                        addRecipient={addRecipient}
                        removeRecipient={removeRecipient}
                        selected={false} />
                )
            } else {
                if (props.recipients.includes(props.allRecipients[i])) {
                    final.push(
                        <RecipientRow
                            recipient={props.allRecipients[i]}
                            allSelected={allSelected}
                            noneSelected={noneSelected}
                            toggle={toggle}
                            addRecipient={addRecipient}
                            removeRecipient={removeRecipient}
                            selected={true} />
                    )
                } else {

                    final.push(
                        <RecipientRow
                            recipient={props.allRecipients[i]}
                            allSelected={allSelected}
                            noneSelected={noneSelected}
                            toggle={toggle}
                            addRecipient={addRecipient}
                            removeRecipient={removeRecipient}
                            selected={false} />
                    )
                }
            }


        }
        return final
    }
    function selectAllRecipients() {
        setNoneSelected(false)
        setAllSelected(true)
        setRecipients(props.allRecipients)
    }
    function selectNoRecipients() {
        setAllSelected(false)
        setNoneSelected(true)
        setRecipients([])
    }
    function toggle() {
        setAllSelected(false)
        setNoneSelected(false)
    }
    function saveRecipients() {
        setIsSaving(true)
        props.setEmailees(recipients)
        if (recipients !== props.allRecipients) {
            props.changeSelected()
        }
    }

    function addRecipient(selectedEmail) {
        setRecipients([...recipients, selectedEmail])
        console.log(recipients)
    }
    function removeRecipient(selectedEmail) {

        const temp = []
        for (var i = 0; i < recipients.length; i++) {
            if (recipients[i] !== selectedEmail) {
                temp.push(recipients[i])
            }
        }
        setRecipients(temp)
        console.log(recipients)
    }

    // component render
    return (
        <div style={modalStyle} className={classes.paper}>
            <h1>Select Recipients</h1>
            <div>
                <button onClick={selectAllRecipients}> Select All</button>
                <button onClick={selectNoRecipients}> Deselect All</button>
            </div>

            {buildRecipients()}

            <div className="d-flex mb-3">
                <button className="btn btn-primary ms-auto" onClick={saveRecipients}>{isSaving ? <CircularProgress color="black" /> : doneSaving ? <DoneIcon /> : "Save Edit"} </button>
            </div>
        </div>)
}

export default ReciepientModal