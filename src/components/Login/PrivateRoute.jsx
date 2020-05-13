import React, { useEffect } from 'react'
import { Route, useHistory } from 'react-router-dom'


const PrivateRoute = ({ component: Component, privateRoute, ...rest }) => {

    const history = useHistory()
    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    const loggedUser = loggedUserJSON ? JSON.parse(loggedUserJSON) : null

    useEffect(() => {
        if (!loggedUser?.username && privateRoute) {
            history.push('/login')
        }
    }, []);


    return <Route {...rest} render={(props) =>
        <Component {...props} />
    } />
}



export default PrivateRoute