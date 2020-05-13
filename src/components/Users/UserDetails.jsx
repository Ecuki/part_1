import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getUser } from '../../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Image, List } from 'semantic-ui-react'
import UsersList from './UsersList'
import Anecdote from '../Anecdotes/Anecdote'

function UserDetails(props) {

    const { id } = useParams()
    const dispatch = useDispatch()
    const users = useSelector((state) => state.users)
    // console.log(id);
    // console.log(users);
    useEffect(() => {
        if (id) get(id)
    }, [id])

    const get = async (id) => {
        console.log(id)
        await dispatch(getUser(id))
    }

    if (!users[0] && users.length !== 0) return <div>Loading</div>
    console.log(users);
    return (
        <Container>
            <UsersList users={users} />
            <List relaxed ordered divided>
                <List.Header content={`Anecdotes added by ${users[0]?.name}`} />
                {users[0]?.anecdotes.map(anecdote => anecdote && <Anecdote key={anecdote.id} anecdote={anecdote} />)}
            </List>
            <List relaxed ordered divided>
                <List.Header content={`Blogs added by ${users[0]?.name}`} />
                {users[0]?.blogs.map(blog => blog && <List.Item key={blog.id}><List.Content as={Link} to={`/blog/${blog.id}`} >{blog.title}</List.Content></List.Item>)}
            </List>
        </Container>
    )
}


export default UserDetails;
