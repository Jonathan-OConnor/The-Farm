import React, { useState, useEffect } from "react"
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Button } from "@material-ui/core";
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import RecipientRow from "./RecipientRow";

function ReciepientModal(props) {
    const [modalStyle, setModalStyle] = useState(getModalStyle)
    const [allSelected, setAllSelected] = useState(props.allSelected)
    const [noneSelected, setNoneSelected] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [doneSaving, setDoneSaving] = useState(false)
    const [recipients, setRecipients] = useState(props.recipients)
    const [addingEmail, setAddingEmail] = useState(false)


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
                        selected={true}
                        deleteEmail={props.deleteEmail} />
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
                        selected={false}
                        deleteEmail={props.deleteEmail} />
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
                            selected={true}
                            deleteEmail={props.deleteEmail} />
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
                            selected={false}
                            deleteEmail={props.deleteEmail} />
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
        setTimeout(() => {
            setIsSaving(false);
            setDoneSaving(true);
            setTimeout(props.closeModal, 400)
        }, 400)

    }

    function addRecipient(selectedEmail) {
        setRecipients([...recipients, selectedEmail])
    }

    function removeRecipient(selectedEmail) {
        const temp = []
        for (var i = 0; i < recipients.length; i++) {
            if (recipients[i] !== selectedEmail) {
                temp.push(recipients[i])
            }
        }
        setRecipients(temp)
    }

    function isAddingEmail() {
        setAddingEmail(true)
    }
    function saveEmail() {
        const newEmail = document.getElementById("emailAddition").value
        setRecipients([...recipients, newEmail])
        props.addEmail(newEmail)
        setAddingEmail(false)
    }
    function closeAddingEmail() {
        setAddingEmail(false)
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
            {addingEmail ?
                <div>
                    <input id="emailAddition" type="text"></input> <Button color="primary" onClick={saveEmail}>Save Email</Button><Button onClick={closeAddingEmail}><CloseIcon /></Button>
                </div> :
                <Button color="primary" onClick={isAddingEmail}>Add Email</Button>
            }
            <div className="d-flex mb-3">
                <button className="btn btn-primary ms-auto" onClick={saveRecipients}>{isSaving ?
                    <CircularProgress color="black" /> :
                    doneSaving ? <DoneIcon /> : "Save Edit"}
                </button>
            </div>
        </div>)
}

export default ReciepientModal