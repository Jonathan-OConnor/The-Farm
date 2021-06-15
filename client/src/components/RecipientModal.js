import React, { useState } from "react"
import { makeStyles } from '@material-ui/core/styles';

function ReciepientModal(props) {
    const [modalStyle, setModalStyle] = useState(getModalStyle)

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
    return <div style={modalStyle} className={classes.paper}>
      
    </div>
}

export default ReciepientModal