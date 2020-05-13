import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'



describe('<BlogForm/>', () => {
  let component
  let createBlog
  const blog = { id: 'sadsdasd3fef', url: 'sssd', author: 'dasdas', likes: '23', title: 'sdasdasd', user: { username: 'emil' } }

  beforeEach(() => {
    createBlog = jest.fn()
    component = render(
      <BlogForm createBlog={createBlog} />
    )
  })

  test('  updates parent state and calls onSubmit', () => {
    const title = component.container.querySelector('#title')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
      target: { value: 'testing of forms could be easier' }
    })
    fireEvent.submit(form)
    expect(createBlog.mock.calls).toHaveLength(1)

    expect(createBlog.mock.calls[0][0].title).toBe('testing of forms could be easier')
  })
  test('  form calls the event handler it received as props with the right details when a new blog is called', () => {

    const url = component.container.querySelector('#url')
    const author = component.container.querySelector('#author')
    const likes = component.container.querySelector('#likes')
    const title = component.container.querySelector('#title')
    const form = component.container.querySelector('form')

    fireEvent.change(url, {
      target: { value: blog.url }
    })
    fireEvent.change(author, {
      target: { value: blog.author }
    })
    fireEvent.change(likes, {
      target: { value: blog.likes }
    })
    fireEvent.change(title, {
      target: { value: blog.title }
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)

    expect(createBlog.mock.calls[0][0].title).toBe(blog.title)
    expect(createBlog.mock.calls[0][0].author).toBe(blog.author)
    expect(createBlog.mock.calls[0][0].likes).toBe(blog.likes)
    expect(createBlog.mock.calls[0][0].url).toBe(blog.url)

  })


})

