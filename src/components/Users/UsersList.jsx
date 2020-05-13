import React from 'react'
import { List } from 'semantic-ui-react'
import { useSelector } from 'react-redux'

import User from './User'

export default function UserList() {


    const { users } = useSelector(state => state)
    return (
        <List>
            {users.map(user => <User user={user} key={user.id} />)}
        </List>
    )
}
