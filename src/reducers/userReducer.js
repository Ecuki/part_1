
import service from '../services/service'
const userService = service('/api/users')


export const userReducer = (state = [], action) => {
    // console.log(action.payload);
    switch (action.type) {
        case 'REGISTER_USER':
            return [...state, action.payload]
        case 'UPDATE_USER':
            return state.map(s => s.id !== action.payload.id ? s : action.payload)
        case 'REMOVE_USER':
            return state.filter(s => s.id !== action.payload)
        case 'INIT_USERS':
            return action.payload
        case 'GET_USER':
            return action.payload
        default:
            return state
    }
}

export const removeUser = (id) => {
    return async (dispatch) => {
        await userService.remove(id)
        dispatch({
            type: 'REMOVE_USER',
            payload: id,
        })
    }
}

export const updateUser = (user) => {
    const userToUpdate = {
        username: user.username,
        name: user.name,
        password: user.password
    }
    return async (dispatch) => {
        const updatedUser = await userService.update(
            user.id,
            userToUpdate
        )
        dispatch({
            type: 'UPDATE_USER',
            payload: updatedUser,
        })
    }
}

export const registerUser = (user) => {
    return async (dispatch) => {
        const newUser = await userService.create(user)
        dispatch({
            type: 'REGISTER_USER',
            payload: newUser,
        })
    }
}

export const initUsers = () => {
    return async (dispatch) => {
        const users = await userService.getAll()
        dispatch({
            type: 'INIT_USERS',
            payload: users,
        })
    }
}
export const getUser = (id) => {
    return async (dispatch) => {
        const user = await userService.get(id)
        dispatch({
            type: 'GET_USER',
            payload: [user],
        })
    }
}



export default userReducer