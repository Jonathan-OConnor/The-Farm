import React, { useState, useEffect } from "react"
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from "@material-ui/core";
import DoneIcon from '@material-ui/icons/Done';
import RecipientRow from "./RecipientRow";

function ReciepientModal(props) {
    const [modalStyle, setModalStyle] = useState(getModalStyle)
    const [recipientList, setReciepientList] = useState([])
    const [allSelected, setAllSelected] = useState(false)
    const [noneSelected, setNoneSelected] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [doneSaving, setDoneSaving] = useState(false)

    useEffect(() => {
        async function getRecipients() {
            const recipients = ["test@test.com", "test2@test.com", "test3@test.com"]
            setReciepientList(recipients)
        }
        getRecipients()

    }, [])

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
        for (var i = 0; i < recipientList.length; i++) {
            final.push(
                <RecipientRow recipient={recipientList[i]} allSelected={allSelected} noneSelected={noneSelected} toggle={toggle} />
            )
        }
        return final
    }
    function selectAllRecipients() {
        setNoneSelected(false)
        setAllSelected(true)

    }
    function selectNoRecipients() {
        setAllSelected(false)
        setNoneSelected(true)
    }
    function toggle() {
        setAllSelected(false)
        setNoneSelected(false)
    }
    function saveRecipients(){
        setIsSaving(true)
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