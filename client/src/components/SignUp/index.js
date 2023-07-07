import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER, LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';


export default function SignUp({handleProgChange}) {
    const [formState, setFormState] = useState({ username: '', password: '', progression: 1 });
    const [login, { error: loginError, data: loginData }] = useMutation(LOGIN_USER);
    const [addUser, { error: addUserError, data: addUserData}] = useMutation(ADD_USER);
    
    // update state based on form input changes
    const handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;

        setFormState({
        ...formState,
        [name]: value,
        });
    };

    // submit form
   
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (event.target.id === "login-btn") {
            try {
                const { data } = await login({
                    variables: { ...formState },
                });
                
                Auth.login(data.login.token);
                const userProgression = data.login.user.progression;
                handleProgChange(userProgression)
                } catch (loginError) {
                console.error(loginError);
                
                }
                
        }
        if (event.target.id === "signUp-btn") {
            try { 
                const { data } = await addUser({
                  variables: { ...formState },
                });
                Auth.login(data.addUser.token);
                handleProgChange(1)
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
                <button type="submit" id="login-btn" onClick={handleFormSubmit}>Login</button>
                <button type="submit" id="signUp-btn" onClick={handleFormSubmit}>Sign Up</button>
            </form>
        </div>
    )
};