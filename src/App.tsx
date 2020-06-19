import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import Layout from './layout/Layout';
import Section from './layout/Section/Section';
import Title from './ui/Title/Title';
import Capacity from './components/Capacity/Capacity';
import Concurrent from './components/Concurrent/Concurrent';
import { AuthContext, UserContext } from './shared/AuthContext';
import { API_URL, PASSWORD, USER } from './shared/const';

function App() {

    const userContext = useContext(AuthContext);

    const [user, setUser] = useState<Partial<UserContext>>(userContext);

    const [firstCheck, setFirstCheck] = useState(true);


    const resetUser = () => {
        console.log('reset user');
        localStorage.removeItem('mystreamtoken');
        setUser({});
    };


    // If the be server has been restarted, token from localstorage may be invalid
    // todo: make a useCallback ?
    const checkToken = async (token: string) => {
        console.log('checkToken');
        try {
            const response = await fetch(`${API_URL}/checktoken`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    session_token: token,
                })
            });

            console.log('response', response);
            if (response.status !== 200 && response.status !== 201) {
                throw new Error('An error occurred');
            }

            const data = await response.json();
            console.log('data', data);

            if (data.isValid) {
                console.log('token existing, provide context');
                setUser({
                    user: USER,
                    token,
                });
            } else {
                resetUser();
            }

        } catch (e) {
            console.log('error', e);
        }
    };


    // check localstorage
    useEffect(() => {

        if (firstCheck && !userContext.user) {
            setFirstCheck(false);
            console.log('getting storage');
            const token = localStorage.getItem('mystreamtoken');

            if (token) {
                checkToken(token);
            }
        }
    }, [userContext.user, firstCheck, checkToken]);

    const loginHandler = async () => {
        console.log('login');

        try {
            const response = await fetch(`${API_URL}/auth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    identifiant: USER,
                    password: PASSWORD,
                })
            });

            console.log('response', response);
            if (response.status !== 200 && response.status !== 201) {
                throw new Error('An error occurred');
            }

            const data = await response.json();
            console.log('data', data);

            localStorage.setItem('mystreamtoken', data.session_token);

            setUser({
                user: USER,
                token: data.session_token,
            });

        } catch (e) {
            console.log('error', e);
        }

    };

    const logoutHandler = async () => {
        console.log('logout');

        try {
            const response = await fetch(`${API_URL}/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    session_token: user.token,
                })
            });

            console.log('response', response);
            if (response.status !== 200 && response.status !== 201) {
                throw new Error('An error occurred');
            }

            resetUser();

        } catch (e) {
            console.log('error', e);
        }

    };

    let content: JSX.Element = (
        <Section>
            <p>Please login first</p>
        </Section>
    );

    if (user.user) {
        content = (
            <>
                <Section>
                    <Title tag="h1" type="title1">
                        Welcome {user.user}!
                    </Title>
                </Section>
                <Section>
                    <Capacity/>
                </Section>
                <Section>
                    <Concurrent/>
                </Section>
            </>
        )
    }

    return (
        <AuthContext.Provider value={user}>
            <Layout loginClicked={loginHandler} logoutClicked={logoutHandler}>
                {content}
            </Layout>
        </AuthContext.Provider>
    );
}

export default App;
