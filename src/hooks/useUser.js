import axios from 'axios'

import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
const useUser = (baseUrl) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const history = useHistory()

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const loggedUser = JSON.parse(loggedUserJSON)
            setUser(loggedUser)
            setToken(loggedUser.token)
        } else {
            setUser(null)
            setToken(null)
        }
    }, []);



    const login = async credentials => {
        try {
            const response = await axios.post(baseUrl, credentials)
            const loginingUser = response.data
            window.localStorage.setItem('loggedUser', JSON.stringify(loginingUser))
            setUser(loginingUser)
        } catch (exception) {
            throw new Error(exception.response.data.error)
        }
    }
    const logout = () => {
        window.localStorage.removeItem('loggedUser')
        setUser(null)
        history.push(`/login`)
    }


    return [
        user
        , { login, logout, setToken }]
}

export default useUser