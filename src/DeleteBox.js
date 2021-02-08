import React from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import PropTypes from 'prop-types';

const DeleteBox = (props) => {
    const { handleClose, handleConfirm, open, title, index } = props;

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
            <DialogActions>
                <Button onClick={() => handleConfirm(index)} variant="outlined" color="primary">
                    {"YES! :("}
                </Button>
                <Button onClick={handleClose} variant="outlined" color="primary" >
                    {"NO! :D"}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

DeleteBox.propTypes = {
    handleClose: PropTypes.func,
    handleConfirm: PropTypes.func,
    open: PropTypes.bool,
    title: PropTypes.string,
    index: PropTypes.number,
}

DeleteBox.defaultProps = {
    title: "Delete Item ?"
}



export default DeleteBox;