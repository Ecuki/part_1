import React from 'react'
import useUser from '../../hooks/useUser'
import PropTypes from 'prop-types'

import { Form, Button } from 'semantic-ui-react'
import { useForm } from "react-hook-form";

const BlogForm = ({ createBlog }) => {
  const { register, handleSubmit, reset, errors } = useForm();
  const [user] = useUser('/api/login')
  const onSubmit = async ({ title, author, url, likes }) => {

    const newBlog = {
      title, author, url, likes
    }
    await createBlog(newBlog)
    reset({ title: "", author: "", url: "", likes: "0" })
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} data-test="blogForm">
      <Form.Field>
        <label htmlFor="title">
          Title
          <input
            name="title"
            placeholder="Title"
            id="title"
            type="text"
            ref={register({ required: true, minLength: 5, maxLength: 50 })}
            defaultValue=""
          />
          {errors.title && errors.title.type === "required" && <span>This is required</span>}
          {errors.title && errors.title.type === "maxLength" && <span>Max length exceeded</span>}
          {errors.title && errors.title.type === "minLength" && <span>Title is to short</span>}
        </label>
      </Form.Field>
      <Form.Field>
        <label htmlFor="author">
          Author
          <input
            placeholder="Author"
            id="author"
            name="author"
            type="text"
            ref={register({ required: true, minLength: 3, maxLength: 30 })}
            defaultValue=""
          />
          {errors.author && errors.author.type === "required" && <span>This is required</span>}
          {errors.author && errors.author.type === "maxLength" && <span>Max length exceeded</span>}
          {errors.author && errors.author.type === "minLength" && <span>Author is to short</span>}
        </label>
      </Form.Field>
      <Form.Field>
        <label htmlFor="url">
          Url
          <input
            placeholder="Url"
            name="url"
            id="url"
            type="text"
            ref={register({ required: true, minLength: 5, maxLength: 100 })}
            defaultValue=""
          />
          {errors.url && errors.url.type === "required" && <span>This is required</span>}
          {errors.url && errors.url.type === "maxLength" && <span>Max length exceeded</span>}
          {errors.url && errors.url.type === "minLength" && <span>Url is to short</span>}
        </label>
      </Form.Field>
      <Form.Field>
        <label htmlFor="likes">
          Likes
          <input
            placeholder="Likes"
            id="likes"
            data-test="likes"
            name="likes"
            ref={register({ required: false, minLength: 1, maxLength: 10 })}
            defaultValue="0"
          />
          {errors.likes && errors.likes.type === "required" && <span>This is required</span>}
          {errors.likes && errors.likes.type === "maxLength" && <span>Max length exceeded</span>}

        </label>
      </Form.Field>
      {user && <Button type="submit" content="Add" color="green" id="add-blog-button" />}
    </Form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm
