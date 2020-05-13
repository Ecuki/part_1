import React, { useState, useEffect } from 'react'
import { NavLink, useParams, useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Button, Item, Icon, Label, Confirm } from 'semantic-ui-react'
import Comments from '../Comments'

import { removeBlog, likeBlog, getBlog } from '../../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setNotificaton } from '../../reducers/notificationReducer'

function Blog({ blog }) {
  const { id } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const { user, blogToDisplay } = useSelector(state => {
    console.log(state.blogs[0]);
    return {
      user: state.user, blogToDisplay: blog ? blog :
        state.blogs[0]
    }
  })
  console.log(blogToDisplay);
  useEffect(() => {
    if (id && !blog) get(id)
  }, [id])
  const get = async (id) => {
    await dispatch(getBlog(id))
  }

  const [showConfirm, setShowConfirm] = useState(false)


  const handleLike = (event, blog) => {
    event.preventDefault()
    addLike(blog)
  }

  const addLike = async likedBlog => {
    try {
      await dispatch(likeBlog(likedBlog.id, likedBlog))
      dispatch(setNotificaton(
        `Blog '${likedBlog.title}' by ${likedBlog.author} liked successfuly`, "green", 5))
    } catch (exception) {
      dispatch(setNotificaton(exception.response.data.error, "red", 5))
    }
  }
  const deleteBlog = async blogToDelete => {
    try {
      await dispatch(removeBlog(blogToDelete.id))
      dispatch(setNotificaton(
        `Blog '${blogToDelete.title}' by ${blogToDelete.author} deleted successfuly`, "green", 5))
      history.push('/blog')
    } catch (exception) {
      dispatch(setNotificaton(exception.response.data.error, "red", 5))
    }
  }

  if (!blogToDisplay) return <div>loading ...</div>

  const { title, author, url, likes, comments } = blogToDisplay
  return (<>
    {id && <Item.Header as="h3" content="Blog details:" />

    }
    <Item data-test="blog" id="blog">
      <Confirm
        header={`Do you really want to remove ${title} by ${author}?`}
        open={showConfirm}
        cancelButton='Never mind'
        confirmButton="Let's do it"
        onCancel={() => { }}
        onConfirm={() => deleteBlog(blogToDisplay)}
      />
      <Item.Content>
        <Item.Header as="h3">
          <NavLink to={`/blog/${blogToDisplay.id}`} >
            {title}
          </NavLink>
        </Item.Header>
        <Item.Description>{author}</Item.Description>
        {id && <><Item.Extra as="a">{url}</Item.Extra>
          <Item.Meta>
            <Button as="div" labelPosition="left" size="mini">
              <Label as="a" basic pointing="right" data-test-id="likes-number">
                {likes}
              </Label>
              <Button icon size="mini" onClick={(e) => handleLike(e, blogToDisplay)} id="like-button">
                <Icon name="heart" />
                Like
              </Button>
            </Button>

            {(((user && user.username) === (blogToDisplay.user && blogToDisplay.user.username))) && (
              <Button icon negative size="mini" onClick={() => setShowConfirm(true)} id="delete-button">
                <Icon name="delete" />
              </Button>
            )}
          </Item.Meta>
          <Item.Header>{`Added by: `}
            <NavLink to={`/users/${blogToDisplay.user.id}`} >
              {blogToDisplay.user.username}
            </NavLink>
          </Item.Header>

          <Comments comments={comments} />
        </>
        }

      </Item.Content>
    </Item></>
  )
}

Blog.propTypes = {
  blog: PropTypes.oneOfType([PropTypes.object]).isRequired,
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.oneOfType([PropTypes.object]).isRequired
}
export default Blog
