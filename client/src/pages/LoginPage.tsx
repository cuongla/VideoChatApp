import React, { ChangeEvent, FC, FormEvent, useState } from 'react'
import { useHistory } from 'react-router';
import { addNewUser } from 'utils/wssConnection';
import Alert from 'components/shared/Alert';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

interface LoginPageProps {
    saveUsername?: (username: string) => void
}

const LoginPage: FC<LoginPageProps> = ({ saveUsername }) => {
    const history = useHistory();
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [openAlert, setOpenAlert] = useState(false);

    const handleCloseAlert = () => {
        setOpenAlert(false);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        // check username 
        if (username.length < 3) {
            setOpenAlert(true)
        } else {
            history.push('/dashboard')
            addNewUser(username);
            // saveUsername(username);
        }
    }

    return (
        <div className={classes.loginContainer}>
            <Container maxWidth='sm' className={classes.loginBox}>
                <div>
                    <Typography
                        variant='h4'
                        align='center'
                        color='textSecondary'
                        style={{ marginBottom: '1rem' }}>
                        WebRTC Chat App
                    </Typography>
                    <Alert
                        openAlert={openAlert}
                        handleCloseAlert={handleCloseAlert}
                        alertTitle="Error Logining"
                        alertContent="The minimum characters for username is 3 characters. Please check again!" />
                    <form className={classes.loginForm}>
                        <TextField
                            id="standard-basic"
                            label="Username"
                            style={{ width: '50%' }}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                            value={username} />
                        <small style={{ color: 'red' }}>*Please enter your username</small>
                        <Button
                            size="medium"
                            color='default'
                            variant="contained"
                            style={{ marginTop: '1.5rem' }}
                            onClick={handleSubmit}>
                            Access Video Chat
                        </Button>
                    </form>
                </div>
            </Container>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    loginContainer: {
        width: '100vh',
        height: '100vh'
    },
    loginBox: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    loginForm: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));


export default LoginPage
