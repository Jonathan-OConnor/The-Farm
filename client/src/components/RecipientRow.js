import React, { useState, useEffect } from "react"
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from "@material-ui/core";

function RecipientRow(props) {

    const [isSelected, setIsSelected] = useState(props.selected)
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        if (props.allSelected) {
            setIsSelected(true)
        }
        if (props.noneSelected) {
            setIsSelected(false)
        }

    }, [props.allSelected, props.noneSelected])
    function toggle() {
        props.toggle()
        setIsSelected(!isSelected)
        if (!isSelected) {
            props.addRecipient(props.recipient)
        } else {
            props.removeRecipient(props.recipient)
        }
    }
    function promptDelete() {
        setIsDeleting(true)
    }
    function cancelDelete(){
        setIsDeleting(false)
    }
    function deleteEmail(){
        props.removeRecipient(props.recipient)
        props.deleteEmail(props.recipient)
    }
    return (
        <div>

            <div class="form-check">
                <label class="form-check-label" for={`${props.recipient}`}>
                    {props.recipient}
                </label>
                <input class="form-check-input" type="checkbox" value="" id={`${props.recipient}`} checked={isSelected} onClick={toggle} />
                {isDeleting ?
                    <div>
                        <p style={{ color: "red" }}>Are you sure?</p>
                        <Button color="secondary" onClick={deleteEmail}>Yes</Button>
                        <Button color="secondary" onClick={cancelDelete}>No</Button>
                    </div>

                    : <button className="btn btn-danger" onClick={promptDelete}><DeleteIcon /></button>}
            </div>
        </div>

    )
}

export default RecipientRow