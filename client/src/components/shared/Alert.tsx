import React, { FC } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';


interface AlertProps {
    openAlert: boolean
    alertTitle: string
    alertContent: string
    handleCloseAlert: () => void
}

const Alert: FC<AlertProps> = ({ openAlert, handleCloseAlert, alertTitle, alertContent }) => {
    return (
        <Dialog
            open={openAlert}
            onClose={handleCloseAlert}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {alertTitle}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {alertContent}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseAlert} color="primary" autoFocus>
                    Close Window
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default Alert
