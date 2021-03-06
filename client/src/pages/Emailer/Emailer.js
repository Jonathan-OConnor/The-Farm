import React, { useState, useEffect } from "react"
import Grow from '@material-ui/core/Grow';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import DoneIcon from '@material-ui/icons/Done'
import Modal from '@material-ui/core/Modal';
import Navbar from "../../components/Navbar"
import ReciepientModal from "../../components/Emailer/RecipientModal";
import "./Emailer.css"

function Emailer(props) {
    const [emailSubject, setEmailSubject] = useState("")
    const [emailBody, setEmailBody] = useState("")
    const [emailLoding, setEmailLoading] = useState(false)
    const [emailSent, setEmailSent] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [openRecipients, setOpenRecipients] = useState(false)
    const [allRecipients, setAllRecipients] = useState([])
    const [recipients, setRecipients] = useState([])
    const [allSelected, setAllSelected] = useState(true)


    useEffect(() => {
        async function getEmails() {
            const data = {
                uuid: localStorage.uuid || sessionStorage.uuid || '',
                sessionDate: localStorage.sessionDate || sessionStorage.sessionDate || ''
            }
            const { status, message, emailList } = await fetch('/api/emails', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Session': localStorage.uuid || sessionStorage.uuid || '',
                },
            }).then(res => res.json())
            if (status) {
                const parsedEmails = []
                for (var i = 0; i < emailList.length; i++) {
                    parsedEmails.push(emailList[i])
                }
                setAllRecipients(parsedEmails)
                setRecipients(parsedEmails)
            } else {
                console.log("error retrieving emails")
            }
        }
        getEmails()
    }, [])

    async function sendEmail() {
        setEmailLoading(true)
        const data = {
            mailList: recipients,
            subject: emailSubject,
            msg: emailBody,
            uuid: localStorage.uuid || sessionStorage.uuid || '',
            sessionDate: localStorage.sessionDate || sessionStorage.sessionDate || ''
        }
        const response = await fetch('/api/email', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Session': localStorage.session || ''
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
        setEmailLoading(false)
        if (response.status) {
            setEmailSent(true)
        } else {
            setEmailError(true)
        }

    }

    function openModal() {
        setOpenRecipients(true)
    }

    function closeModal() {
        setOpenRecipients(false)
    }
    function setEmailees(list) {
        setRecipients(list)
    }
    function changeSelected() {
        setAllSelected(false)
    }
    async function addEmail(newEmail) {
        const data = {
            email: newEmail.email,
            group: newEmail.group,
            uuid: localStorage.uuid || sessionStorage.uuid || '',
            sessionDate: localStorage.sessionDate || sessionStorage.sessionDate || ''
        }
        const response = await fetch('/api/emails', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Session': localStorage.session || ""
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
        if (response.status) {
            setRecipients([...recipients, newEmail])
            setAllRecipients([...allRecipients, newEmail])
        } else {
            console.log('error in saving email')
        }
    }

    async function deleteEmail(selectedEmail) {
        const data = {
            email: selectedEmail,
            uuid: localStorage.uuid || sessionStorage.uuid || '',
            sessionDate: localStorage.sessionDate || sessionStorage.sessionDate || ''
        }
        const response = await fetch('/api/emails', {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Session': localStorage.session || ''
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
        const temp = []
        for (var i = 0; i < recipients.length; i++) {
            if (recipients[i] !== selectedEmail) {
                temp.push(recipients[i])
            }
        }
        setRecipients(temp)
        const temp2 = []
        for (var i = 0; i < allRecipients.length; i++) {
            if (allRecipients[i] !== selectedEmail) {
                temp2.push(allRecipients[i])
            }
        }
        setAllRecipients(temp2)
    }
    function handleSubjectChange(e) {
        setEmailSubject(e.target.value)
    }
    function handleBodyChange(e) {
        setEmailBody(e.target.value)
    }
    return (
        <div>
            <div style={{ marginBottom: "100px" }}>
                <Navbar active="emailer" isAuthed={props.isAuthed} setIsAuthed={props.setIsAuthed} />
            </div>
            <Grow in={true}>
                <div className="container">
                    <h1>Send an Email</h1>
                    <TextField
                        id="email-header"
                        placeholder="Enter email subject here"
                        rows={3}
                        fullWidth
                        variant="outlined"
                        onChange={handleSubjectChange} />
                    <TextField
                        id="email-body"
                        placeholder="Enter your message here"
                        rows={30}
                        fullWidth
                        multiline
                        variant="outlined"
                        onChange={handleBodyChange} />

                    <div className="d-flex mb-3" style={{ height: '50px' }}>
                        <button className="btn btn-primary" onClick={sendEmail}>{emailLoding ? <CircularProgress color="black" /> : emailSent ? <DoneIcon /> : "Submit"} </button>
                        <button className="btn btn-primary ms-auto" onClick={openModal}>Edit Reciepients</button>
                    </div>
                    <Modal
                        open={openRecipients}
                        onClose={closeModal}>
                        <ReciepientModal closeModal={closeModal} deleteEmail={deleteEmail} addEmail={addEmail} setEmailees={setEmailees} recipients={recipients} allRecipients={allRecipients} allSelected={allSelected} changeSelected={changeSelected} />
                    </Modal>
                </div>
            </Grow>
        </div>


    )
}

export default Emailer