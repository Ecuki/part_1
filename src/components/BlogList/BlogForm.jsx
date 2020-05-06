import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Form, Button } from 'semantic-ui-react'

const content = {
  initialBlog: {
    title: '',
    author: '',
    url: '',
    likes: ''
  }
}

const BlogForm = ({ createBlog }) => {
  const { initialBlog } = content
  const [blog, setBlog] = useState(initialBlog)

  const addBlog = event => {
    event.preventDefault()
    createBlog(blog)
    setBlog(initialBlog)
  }

  const handleBlogInput = event => {
    const { id } = event.target
    setBlog({ ...blog, [id]: event.target.value })
  }
  const { title, author, url, likes } = blog
  return (
    <Form onSubmit={addBlog} data-test="blogForm">
      <Form.Field>
        <label htmlFor="title">
          Title
          <input
            placeholder="Title"
            value={title}
            onChange={handleBlogInput}
            id="title"
            type="text"
          />
        </label>
      </Form.Field>
      <Form.Field>
        <label htmlFor="author">
          Author
          <input
            placeholder="Author"
            value={author}
            onChange={handleBlogInput}
            id="author"
            type="text"
          />
        </label>
      </Form.Field>
      <Form.Field>
        <label htmlFor="url">
          Url
          <input
            placeholder="Url"
            value={url}
            onChange={handleBlogInput}
            id="url"
            type="text"
          />
        </label>
      </Form.Field>
      <Form.Field>
        <label htmlFor="likes">
          Likes
          <input
            placeholder="Likes"
            value={likes}
            onChange={handleBlogInput}
            id="likes"
            data-test="likes"
          />
        </label>
      </Form.Field>
      <Button type="submit" content="Add" color="green" id="add-blog-button" />
    </Form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm
