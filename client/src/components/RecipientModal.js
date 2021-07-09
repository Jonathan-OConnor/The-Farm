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
    const [emailList, setEmailList] = useState("")


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
        console.log("ALL RECIPIENTS:", props.allRecipients)
        console.log("RECIPIENTS:", recipients)
        for (var i = 0; i < props.allRecipients.length; i++) {
            if (props.allRecipients[i].group === emailList) {
                if (allSelected) {
                    console.log("ALL SELECTED")
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
                    console.log("None SELECTED")
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
                    let contains = 0
                    for (var j = 0; j < recipients.length; j++) {
                        if (recipients[j].email === props.allRecipients[i].email) {
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
                            console.log("CONTAINS")
                            contains = 1
                        }
                    }
                    if (contains === 0) {
                        console.log("DOES NOT CONTAIN")
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

        }
        console.log("FINAL:", final)
        return final
    }

    function selectAllRecipients() {
        setNoneSelected(false)
        setAllSelected(true)
        const temp = []
        for (var i = 0; i < props.allRecipients.length; i++){
            if (props.allRecipients[i].group === emailList){
                temp.push(props.allRecipients[i])
            }
        }
        setRecipients(temp)
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
            if (recipients[i].email !== selectedEmail.email) {
                temp.push(recipients[i])
            }
        }
        setRecipients(temp)
     
    }

    function isAddingEmail() {
        setAddingEmail(true)
    }
    function saveEmail() {
        const newEmail = { email: document.getElementById("emailAddition").value, group: emailList }
        setRecipients([...recipients, newEmail])
        props.addEmail(newEmail)
        setAddingEmail(false)
    }
    function closeAddingEmail() {
        setAddingEmail(false)
    }

    function updateList(e) {
        setEmailList(e.target.value)
        setRecipients([])
        setNoneSelected(true)
        setAllSelected(false)

    }

    // component render
    return (

        <div style={modalStyle} className={classes.paper}>

            <h1>Select Recipients</h1>
            <label for="emailLists">
                Select Email List:
            </label>
            <select name="emailLists" id="emailLists" onChange={updateList}>
                <option selected disabled>Choose List</option>
                <option value="Family Reunion">Family Reunion</option>
                <option value="Local Family">Local Family</option>
            </select>
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