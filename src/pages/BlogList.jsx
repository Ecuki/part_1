import React, { useState, useEffect, useRef } from 'react'
import _ from 'lodash'
import { Button, Header, Container, Grid, Item } from 'semantic-ui-react'

import { changeMessage } from '../Utils'

import Blog from '../components/BlogList/Blog'
import BlogForm from '../components/BlogList/BlogForm'
import LoginForm from '../components/LoginForm'
import Notification from '../components/Notification'
import Togglable from '../components/Togglable'
import loginService from '../services/login'
import blogService from '../services/blogs'

export default function BlogList() {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  useEffect(() => {
    const blogsSortedByLikes = _.orderBy(blogs, 'likes', 'desc')
    setBlogs(blogsSortedByLikes)
  }, [_.sumBy(blogs, 'likes')])

  const login = async credentials => {
    try {
      const loginingUser = await loginService.login(credentials)
      window.localStorage.setItem('loggedUser', JSON.stringify(loginingUser))
      blogService.setToken(loginingUser.token)
      setUser(loginingUser)
    } catch (exception) {
      changeMessage('Wrong credentials', setErrorMessage)
    }
  }
  const handleLogout = event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    blogService.setToken(user.token)
  }
  const getBlogs = async () => {
    const response = await blogService.getAll(); setBlogs(response)
  }
  const createBlog = async newBlog => {
    try {
      blogFormRef.current.toggleVisibility()
      const response = await blogService.create(newBlog)
      setBlogs(blogs.concat(response))
      changeMessage(
        `Blog '${newBlog.title}' by ${newBlog.author} added successfuly`,
        setNotificationMessage
      )
    } catch (exception) {
      console.error(exception.response.data)
      changeMessage(exception.response.data.error, setErrorMessage)
    }
  }
  const addLike = async likedBlog => {
    const blogToUpdate = {
      user: likedBlog.user.id,
      author: likedBlog.author,
      url: likedBlog.url,
      title: likedBlog.title,
      likes: likedBlog.likes + 1
    }

    try {
      const response = await blogService.update(likedBlog.id, blogToUpdate)
      setBlogs(blogs.map(blog => (blog.id !== response.id ? blog : response)))
      changeMessage(
        `Blog '${response.title}' by ${response.author} liked successfuly`,
        setNotificationMessage
      )
    } catch (exception) {
      console.error(exception)
      changeMessage(exception.response.data.error, setErrorMessage)
    }
  }
  const deleteBlog = async blogToDelete => {
    try {
      await blogService.remove(blogToDelete.id)

      setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id))
      changeMessage(
        `Blog '${blogToDelete.title}' by ${blogToDelete.author} deleted successfuly`,
        setNotificationMessage
      )
    } catch (exception) {
      console.error(exception)
      changeMessage(exception.response.data.error, setErrorMessage)
    }
  }

  return (
    <Container>
      <Grid columns={2}>
        <Grid.Column>
          <Header floated="left">
            {user ? `${user.name} logged in` : 'Log in to apllication'}
          </Header>
        </Grid.Column>
        <Grid.Column textAlign="right">
          <Button
            type="submit"
            content="Logout"
            color="red"
            onClick={handleLogout}
          />
        </Grid.Column>
      </Grid>

      <Notification message={notificationMessage} color="green" />
      <Notification message={errorMessage} color="red" />
      {user === null && <LoginForm login={login} />}
      {user && (
        <>
          <Item.Group divided>
            {blogs.map(blog => (
              <Blog
                key={blog.id}
                blog={blog}
                addLike={addLike}
                deleteBlog={deleteBlog}
                user={user}
              />
            ))}
          </Item.Group>
          <Togglable buttonLabel="New blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
        </>
      )}
    </Container>
  )
}
