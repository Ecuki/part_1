import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'

export const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'NEW_BLOG':
            return [...state, action.payload]
        case 'UPDATE_BLOG':
            return state.map(s => s.url !== action.payload.url ? s : action.payload)
        default:
            return state;
    }
}

const store = createStore(blogReducer)

store.dispatch({
    type: 'NEW_BLOG',
    payload: {
        title: "dfsdffsdf",
        author: "dfsdffsdf",
        url: "dfsdffsdf",
        likes: 15,
    }
})
