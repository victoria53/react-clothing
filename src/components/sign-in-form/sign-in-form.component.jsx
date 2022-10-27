import { useState } from 'react';
import './sign-in-form.styles.scss'
import FormInput from '../form-input/form-input.component'
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import {
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    signInAuthEmailAndPassword
} from '../../utils/firebase/firebase.utils';

const defaultSignInFields = {
    email: '',
    password: ''
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultSignInFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultSignInFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { user } = await signInAuthEmailAndPassword(email, password);
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('Incorrect password')
                    break
                case 'auth/invalid-email':
                    alert('Invalid email')
                    break
                case 'auth/user-not-found':
                    alert('User not found')
                    break
                default:
                    console.log(error);
            }
        }
    }

    const signInWithGoogle = async () => {
        signInWithGooglePopup();
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({})
        setFormFields({ ...formFields, [name]: value });
    }

    return (
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='email'
                    type='text'
                    required
                    onChange={handleChange}
                    name='email'
                    value={email}
                />
                <FormInput
                    label='password'
                    type='password'
                    required
                    onChange={handleChange}
                    name='password'
                    value={password}
                />
            </form>
            <div className='buttons-container'>
                <Button onClick={handleSubmit}>SIGN IN</Button>
                <Button buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>GOOGLE SIGN IN</Button>
            </div>
        </div>

    )
}

export default SignInForm;