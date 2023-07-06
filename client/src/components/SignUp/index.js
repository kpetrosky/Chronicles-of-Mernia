import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER, LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';


export default function SignUp({handleProgChange}) {
    const [formState, setFormState] = useState({ username: '', password: '' });
    const [login, { Error, Data }] = useMutation(LOGIN_USER);
    const [addUser, { Error, Data }] = useMutation(ADD_USER);

    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
        ...formState,
        [name]: value,
        });
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        if (event.target.id === "login-btn") {
            try {
                const { data } = await login({
                    variables: { ...formState },
                });
        
                Auth.login(data.login.token);
                } catch (e) {
                console.error(e);
            }
        }
        if (event.target.id === "signUp-btn") {
            try {
                const { data } = await addUser({
                  variables: { ...formState },
                });
          
                Auth.login(data.addUser.token);
            } catch (e) {
                console.error(e);
            }
        }

        // clear form values
        setFormState({
        username: '',
        password: '',
        });
    };


    
    return (
        <div>
            <form>
                <h2>Join the Battle!</h2>
                <input 
                    className="username-input" 
                    placeholder="Username"
                    name="username"
                    type="text"
                    value={formState.username}
                    onChange={handleChange}
                    />
                <input 
                    className="password-input" 
                    placeholder="******"
                    name="password"
                    type="password" 
                    value={formState.password}
                    onChange={handleChange}
                    />
                <button id="login-btn" onClick={handleFormSubmit}>Login</button>
                <button id="signUp-btn" onClick={handleFormSubmit}>Sign Up</button>
            </form>
        </div>
    )
};