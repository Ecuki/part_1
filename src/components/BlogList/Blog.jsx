import React from 'react'
import PropTypes from 'prop-types'
import { Button, Item, Icon, Label } from 'semantic-ui-react'
import Togglable from '../Togglable'

function Blog({ blog, addLike, deleteBlog, user }) {
  const handleLike = event => {
    event.preventDefault()
    addLike(blog)
  }
  const handleDelete = event => {
    event.preventDefault()
    const result = window.confirm(
      `Do you really want to remove ${blog.title} by ${blog.author}?`
    )
    return result && deleteBlog(blog)
  }

  return (
    <Item data-test="blog" id="blog">
      <Item.Content>
        <Item.Header>
          <a href={blog.url} target="_blank" rel="noopener noreferrer">
            {blog.title}
          </a>
        </Item.Header>
        <Item.Description>{blog.author}</Item.Description>
        <Togglable buttonLabel="View">
          <Item.Extra>{blog.url}</Item.Extra>
          <Item.Meta>
            <Button as="div" labelPosition="left" size="mini">
              <Label as="a" basic pointing="right" data-test-id="likes-number">
                {blog.likes}
              </Label>
              <Button icon size="mini" onClick={handleLike} id="like-button">
                <Icon name="heart" />
                Like
              </Button>
            </Button>

            {blog.user && user.username === blog.user.username && (
              <Button icon negative size="mini" onClick={handleDelete} id="delete-button">
                <Icon name="delete" />
              </Button>
            )}
          </Item.Meta>
        </Togglable>
      </Item.Content>
    </Item>
  )
}

Blog.propTypes = {
  blog: PropTypes.oneOfType([PropTypes.object]).isRequired,
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.oneOfType([PropTypes.object]).isRequired
}
export default Blog
