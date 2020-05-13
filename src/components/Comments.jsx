import React from 'react'
import moment from 'moment'
import { useField } from '../hooks/index'
import { useParams } from 'react-router-dom'
import { Comment, Button, Form, Header, TextArea } from 'semantic-ui-react'
import { addComment } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
export default function Comments({ comments }) {
    const dispatch = useDispatch()
    const { id } = useParams()

    const textArea = useField('text')
    const add = async (e) => {

        e.preventDefault()

        if (!textArea.isEmpty()) {
            await dispatch(addComment(id, { content: textArea.props.value }))
            textArea.clear()
        }
    }
    const getDate = (date) => {

        const newDate = new Date(date).toUTCString();
        return moment(newDate).fromNow()
    }
    if (!comments) return <div>Loading ...</div>

    return (
        <Comment.Group>
            <Header as='h3' dividing>
                Comments
    </Header>
            {comments.map(({ user, createdAt, content }) => <Comment>
                <Comment.Content>
                    {user && <Comment.Author>{user.username}</Comment.Author>}
                    <Comment.Metadata>
                        <div>{getDate(createdAt)}</div>
                    </Comment.Metadata>
                    <Comment.Text>
                        <p>
                            {content}
                        </p>
                    </Comment.Text>
                </Comment.Content>
            </Comment>)}

            <Form onSubmit={add} >
                <TextArea id="comment" {...textArea.props} />
                <Button content='Add Comment' labelPosition='left' icon='edit' primary type="submit" />
            </Form>
        </Comment.Group>
    )
}
