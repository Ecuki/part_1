import { blogReducer } from './blogReducer'
import deepFreeze from 'deep-freeze'

describe('blogReducer', () => {
  test('returns new state with action NEW_BLOG', () => {
    const state = []
    const action = {
      type: 'NEW_BLOG',
      payload: {
        title: 'dfsdffsdf',
        author: 'dfsdffsdf',
        url: 'dfsdffsdf',
        likes: 15,
      }
    }
    deepFreeze(state)
    const newState = blogReducer(state, action)
    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual(action.payload)
  })
  test('returns new state with action UPDATE_BLOG', () => {
    const state = [
      {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url:
          'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 0,
      },
      {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url:
          'http://www.u.arizona.edu/~rubinsondd/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 1,
      },
    ]
    const action = {
      type: 'UPDATE_BLOG',
      payload: {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url:
          'http://www.u.arizona.edu/~rubinsondd/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 3,
      },
    }
    deepFreeze(state)
    const newState = blogReducer(state, action)
    expect(newState).toHaveLength(2)
    expect(newState).toContainEqual(state[0])
    expect(newState).toContainEqual(action.payload)

  })

})
