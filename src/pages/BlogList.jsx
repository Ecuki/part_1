import React, { useEffect, useRef } from 'react'
import { Route, Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { setNotificaton } from '../reducers/notificationReducer'
import { checkStorage } from '../reducers/loginReducer'
import { initBlogs, addBlog } from '../reducers/blogReducer'
import _ from 'lodash'
import { Container, Item } from 'semantic-ui-react'


import Blog from '../components/BlogList/Blog'
import BlogForm from '../components/BlogList/BlogForm'

import Notification from '../components/Notification'
import Togglable from '../components/Togglable'
import styled from 'styled-components'

export default function BlogList() {
  const dispatch = useDispatch()
  const { blogs, notification, user } = useSelector(state => { return { ...state, blogs: _.orderBy(state.blogs, 'likes', 'desc') } })

  const blogFormRef = useRef()

  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    try { await dispatch(initBlogs()) } catch (exception) {
      dispatch(setNotificaton(`Something went wrong`, "red", 5))
    }
  }

  const createBlog = async newBlog => {
    const isExist = blogs.find(blog => blog.url === newBlog.url)

    try {
      blogFormRef.current.toggleVisibility()
      if (isExist) {
        const blogToUpdate = { ...newBlog, id: isExist.id, user: isExist.user }
        updateBlog(blogToUpdate)
      } else {
        await dispatch(addBlog(newBlog))
      }

      dispatch(setNotificaton(
        `Blog '${newBlog.title}' by ${newBlog.author} added successfuly`, "green", 5))
    } catch (exception) {

      dispatch(setNotificaton(exception.response.data.error, "red", 5))
    }
  }

  const updateBlog = async newBlog => {

    try {
      blogFormRef.current.toggleVisibility()
      await dispatch(updateBlog(newBlog))
      dispatch(setNotificaton(
        `Blog '${newBlog.title}' by ${newBlog.author} updated successfuly`, "green", 5))
    } catch (exception) {

      dispatch(setNotificaton(exception.response.data.error, "red", 5))
    }
  }




  return (

    user && (
      <>
        <Item.Group divided>
          {blogs.map(blog => (
            <Blog
              key={blog.id}
              blog={blog}
            />
          ))}
        </Item.Group>
        <Togglable buttonLabel="New blog" ref={blogFormRef}>
          <BlogForm createBlog={createBlog} />
        </Togglable>
      </>
    )

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


export function BlogRoute() {
  const dispatch = useDispatch()
  const { user, notification: { message, color, isShow } } = useSelector(state => state)
  useEffect(() => {
    dispatch(checkStorage())
  }, []);
  return (
    <Container>
      <Nav>
        <List>
          <li>
            <Link to={'/blog'}>Blog list</Link>
          </li>
        </List>
      </Nav>
      <br />
      {isShow && <Container Notification message={message} color={color} />}

      <Route path={`/blog/`} component={BlogList} exact />
      <Route path={`/blog/:id`} component={Blog} exact />
      {!user?.username && <div>You need to login</div>}
    </Container>
  )
}