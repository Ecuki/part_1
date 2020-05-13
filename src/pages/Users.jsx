import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Route, Link } from 'react-router-dom'

import { initUsers } from '../reducers/userReducer'
import { setNotificaton } from '../reducers/notificationReducer'
import { checkStorage } from '../reducers/loginReducer'
import Notification from '../components/Notification'

import UserDetails from '../components/Users/UserDetails'
import UsersList from '../components/Users/UsersList'
import styled from 'styled-components'

export default function Users() {
    const dispatch = useDispatch()

    useEffect(() => {

        getUsers()
    }, []);

    const getUsers = async () => {
        try { await dispatch(initUsers()) } catch (exception) {
            dispatch(setNotificaton(`Something went wrong`, "red", 5))
        }
    }
    return (
        <>
            <UsersList />
            <br />
        </>
    )
}



const Nav = styled.nav`
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #fff;
`

const List = styled.ul`
  display: flex;
  width: 100%;
  height: 100%;
  max-width: 980px;
  padding: 0px 10px;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  list-style: none;
  border-bottom: 2px solid #ddd;
  a {
    text-decoration: none;
    color: #333;
    padding: 2px 4px;
    margin: 0 2px;

    transition: all 0.2s ease;
    font-size: 0.9rem;
  }
  a:hover {
    color: #ddd;
  }
`

export function UsersRoute() {
    const dispatch = useDispatch()
    const { user, notification: { message, color, isShow } } = useSelector(state => state)
    useEffect(() => {
        dispatch(checkStorage())
    }, []);
    return (
        <>
            <Nav>
                <List>
                    <li>
                        <Link to={'/users'}>Users</Link>
                    </li>

                </List>
            </Nav>
            <br />
            {isShow && < Notification message={message} color={color} />}
            <Route path={`/users/`} component={Users} exact />
            <Route path={`/users/:id`} component={UserDetails} exact />
            {!user?.username && <div>You need to login</div>}
        </>
    )
}