import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

const Login = () => {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('email and password are required')
        }
        try {
            const url = `https://user-auth-back-end.vercel.app/auth/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
            
                setTimeout(async () => {
                    try {
                        const createUserUrl = 'https://version-app-lac.vercel.app/user/create';
                        
                        const createUserResponse = await fetch(createUserUrl, {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ name, email })
                        });
            
                        const createUserResult = await createUserResponse.json();
            
                        if (createUserResult.success) {
                            handleSuccess('User created successfully');
                        } else if (createUserResult.message === 'User already exists') {
                            handleSuccess('User already exists in stats database');
                        } else {
                            handleError(createUserResult.message || 'Failed to create user');
                            return;
                        }
            
                        // Debugging log to confirm redirection code is reached
                        console.log("Redirecting to external site...");
            
                        // Redirect to the external site using `window.location.assign` or `window.location.replace`
                        window.location.assign(`https://learningfrontend.vercel.app?email=${email}`);


                        // Alternatively, you could use:
                        // window.location.replace('https://learningfrontend.vercel.app/');
            
                    } catch (error) {
                        handleError('Error creating user in stats database: ' + error.message);
                    }
                }, 500);  // Delay of 1 second
            }
            
             else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError(err);
        }
    }

    return (
        <div className='container'>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={loginInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={loginInfo.password}
                    />
                </div>
                <button type='submit'>Login</button>
                <span>Does't have an account ?
                    <Link to="/signup">Signup</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Login
