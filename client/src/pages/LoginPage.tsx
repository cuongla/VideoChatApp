import React, { FC, FormEvent, useState } from 'react'
import { useHistory } from 'react-router';
import FormInput from 'components/shared/FormInput';
import FormButton from 'components/shared/FormButton';
import { addNewUser } from 'utils/wssConnection';

interface LoginPageProps {
    saveUsername?: (username: string) => void
}

const LoginPage: FC<LoginPageProps> = ({ saveUsername }) => {
    const history = useHistory();

    const [username, setUsername] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        history.push('/dashboard')
        addNewUser(username);
        // saveUsername(username);
    }

    return (
        <div className='login_container background_primary_color'>
            <div className='login_box background_secondary_color'>
                <div className='login_title_container'>
                    <h2>Get on Board</h2>
                </div>
                <FormInput 
                    username={username} 
                    onChange={(event) => setUsername(event.target.value)} />
                <FormButton handleSubmit={handleSubmit} />
            </div>
        </div>
    )
}

export default LoginPage
