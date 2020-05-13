
import service from '../services/service'
const blogService = service('/api/blogs')


export const blogReducer = (state = [], action) => {
  console.log(action.payload);
  switch (action.type) {
    case 'ADD_BLOG':
      return [...state, action.payload]
    case 'UPDATE_BLOG':
      return state.map(s => s.id !== action.payload.id ? s : action.payload)
    case 'REMOVE_BLOG':
      return state.filter(s => s.id !== action.payload)
    case 'INIT_BLOGS':
      return action.payload
    case 'GET_BLOG':
      return action.payload
    case 'ADD_COMMENT':
      return state.map(s => s.id !== action.payload.id ? s : { ...s, comments: s.comments.concat(action.payload.comment) })
    default:
      return state
  }
}
export const getBlog = (id) => {
  return async (dispatch) => {
    const blog = await blogService.get(id)
    dispatch({
      type: 'GET_BLOG',
      payload: [blog],
    })
  }
}

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      payload: blogs,
    })
  }
}
export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      payload: id,
    })
  }
}


export const addBlog = (blog) => {
  return async (dispatch) => {
    const createdBlog = await blogService.create(blog)
    dispatch({
      type: 'ADD_BLOG',
      payload: createdBlog,
    })
  }
}

export const updateBlog = (blog) => {
  const blogToUpdate = {
    ...blog
  }
  return async (dispatch) => {
    const updatedBlog = await blogService.update(
      blog.id,
      blogToUpdate
    )
    dispatch({
      type: 'UPDATE_BLOG',
      payload: updatedBlog,
    })
  }
}
export const likeBlog = (id, blog) => {
  const blogToUpdate = {
    likes: blog.likes + 1
  }
  return async (dispatch) => {
    const likedBlog = await blogService.update(
      id,
      blogToUpdate
    )
    dispatch({
      type: 'UPDATE_BLOG',
      payload: likedBlog,
    })
  }
}

export const addComment = (id, comment) => {
  return async (dispatch) => {
    const createdComment = await service(`/api/blogs/${id}/comments`).create(comment)
    dispatch({
      type: 'ADD_COMMENT',
      payload: {
        id,
        comment: createdComment
      },
    })
  }
}



export default blogReducer