import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


describe('<Blog/>', () => {
  let component
  const blog = { id: 'sadsdasd3fef', url: 'sssd', author: 'dasdas', likes: '23', title: 'sdasdasd', user: { username: 'emil' } }
  const user = { username: 'emil' }
  const addLike = jest.fn()
  const deleteBlog = jest.fn()


  beforeEach(() => {
    component = render(
      <Blog
        key={blog.id}
        blog={blog}
        addLike={addLike}
        deleteBlog={deleteBlog}
        user={user}
      />
    )
  })
  test('render content', () => {
    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
    expect(component.container).toHaveTextContent(blog.url)
    expect(component.container).toHaveTextContent(blog.likes)
  })
  test('renders the blog\'s title and author', () => {
    const title = component.getByText(blog.title)
    const author = component.getByText(blog.author)
    expect(title).toBeVisible()
    expect(author).toBeVisible()
  })
  test('not render its url or number of likes by default', () => {
    const url = component.getByText(blog.url)
    const likes = component.getByText(blog.likes)
    expect(url).not.toBeVisible()
    expect(likes).not.toBeVisible()
  })

  test('render url and number of likes by after View click', () => {
    const viewButton = component.getByText('View')
    fireEvent.click(viewButton)
    const url = component.getByText(blog.url)
    const likes = component.getByText(blog.likes)
    expect(url).toBeVisible()
    expect(likes).toBeVisible()
  })

  test(' if the like button is clicked twice, the event handler the component received as props is called twice', () => {
    const likeButton = component.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(addLike.mock.calls).toHaveLength(2)
  })

})

