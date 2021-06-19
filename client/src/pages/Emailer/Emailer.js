import React, { useState } from "react"
import Grow from '@material-ui/core/Grow';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import DoneIcon from '@material-ui/icons/Done'
import Modal from '@material-ui/core/Modal';
import Navbar from "../../components/Navbar"
import ReciepientModal from "../../components/RecipientModal";
import "./Emailer.css"

function Emailer() {

    const [emailLoding, setEmailLoading] = useState(false)
    const [emailSent, setEmailSent] = useState(false)
    const [openRecipients, setOpenRecipients] = useState(false)
    const [allRecipients, setAllRecipients] = useState(["test@test.com", "test2@test.com", "test3@test.com"])
    const [recipients, setRecipients] = useState(["test@test.com", "test2@test.com", "test3@test.com"])
    const [allSelected, setAllSelected] = useState(true)


    function sendEmail() {
        setEmailLoading(true)
        console.log(recipients)
    }

    function openModal() {
        setOpenRecipients(true)
    }

    function closeModal(){
        setOpenRecipients(false)
    }
    function setEmailees(list){
        setRecipients(list)
    }
    function changeSelected(){
        setAllSelected(false)
    }
    function addEmail(newEmail){
        setAllRecipients([...allRecipients, newEmail])
        setRecipients([...recipients, newEmail])
    }
    return (
        <div>
            <Navbar active="Emailer" />
            <Grow in={true}>
                <div className="container">
                    <h1>Send an Email</h1>
                    <TextField
                        id="email-body"
                        placeholder="Enter your message here"
                        rows={30}
                        fullWidth
                        multiline
                        variant="outlined" />

                    <div className="d-flex mb-3" style={{ height: '50px' }}>
                        <button className="btn btn-primary" onClick={sendEmail}>{emailLoding ? <CircularProgress color="black" /> : emailSent ? <DoneIcon /> : "Submit"} </button>
                        <button className="btn btn-primary ms-auto" onClick={openModal}>Edit Reciepients</button>
                    </div>
                    <Modal
                        open={openRecipients}
                        onClose={closeModal}>
                        <ReciepientModal addEmail={addEmail} setEmailees={setEmailees} recipients={recipients} allRecipients={allRecipients} allSelected={allSelected} changeSelected={changeSelected}/>
                    </Modal>
                </div>
            </Grow>
        </div>


    )
}

export default Emailer