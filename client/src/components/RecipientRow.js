import React, { useState, useEffect } from "react"


function RecipientRow(props) {

    const [isSelected, setIsSelected] = useState(props.selected)


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
    return (
        <div class="form-check">
            <label class="form-check-label" for={`${props.recipient}`}>
                {props.recipient}
            </label>
            <input class="form-check-input" type="checkbox" value="" id={`${props.recipient}`} checked={isSelected} onClick={toggle} />
        </div>
    )
}

export default RecipientRow