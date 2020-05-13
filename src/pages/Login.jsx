import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoginForm from '../components/Login/LoginForm'
import { setNotificaton } from '../reducers/notificationReducer'
import { login, logout, checkStorage } from '../reducers/loginReducer'
import { Button, Header, Grid, Message } from 'semantic-ui-react'
import Notification from '../components/Notification'
import { useHistory } from 'react-router-dom'

export default function Login() {
    const dispatch = useDispatch()
    const { user, notification: { color, message, isShow } } = useSelector(state => { return { user: state.user, notification: state.notification } })

    useEffect(() => {
        dispatch(checkStorage())
    }, [])


    const handleLogout = event => {
        event.preventDefault()
        dispatch(logout())
        dispatch(setNotificaton(`Successfully logged out`, "green", 5))
    }

    const handleLogin = async (user) => {
        if (!user.username) return dispatch(setNotificaton(`Username cannot be empty`, "red", 5))
        if (!user.password) return dispatch(setNotificaton(`Password cannot be empty`, "red", 5))
        try {
            await dispatch(login(user))
            dispatch(setNotificaton(`${user.username} successfully logged in`, "green", 5))
        } catch (error) {
            console.log(error.message);
            dispatch(setNotificaton(error.message, "red", 5))
        }
    }
    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='blue' textAlign='center'>
                    {user ? `${user.name} logged in` : 'Log in to apllication'}
                </Header>

                {isShow && <Notification message={message} color={color} />}

                {user === null && <LoginForm handleLogin={handleLogin} />}
                {user && <Button
                    type="submit"
                    content="Logout"
                    color="red"
                    onClick={handleLogout}
                />}
                {user === null && <Message>
                    New to us? <a href='#'>Sign Up</a>
                </Message>}
            </Grid.Column>
        </Grid>
    )
}
