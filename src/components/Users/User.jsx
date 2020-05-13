import React from 'react'
import { NavLink } from 'react-router-dom'
import { Image, List } from 'semantic-ui-react'

export default function User({ user = null }) {
    console.log(user);
    return (user &&
        <List.Item>
            <Image avatar src='https://react.semantic-ui.com/images/avatar/small/rachel.png' />
            <List.Content>
                <NavLink to={`/users/${user.id}`}>
                    {user.name}
                </NavLink>

                <List.Description>
                    Blogs:
                            {user.blogs.length}
                    <br />
                            Anecdotes:
                            {user.anecdotes.length}
                </List.Description>
            </List.Content>
        </List.Item >
    )
}
