
import service from '../services/service'
const loginService = service('/api/login')


const loginReducer = (state = null, action) => {

    switch (action.type) {
        case 'LOGIN':
            return action.payload
        case 'CHECK_STORAGE':
            return action.payload
        case 'LOGOUT':
            return null
        default:
            return state
    }
}

export const login = (credentials) => {
    return async (dispatch) => {
        const user = await loginService.create(credentials)
        window.localStorage.setItem('loggedUser', JSON.stringify(user))
        dispatch({
            type: 'LOGIN',
            payload: user,
        })
    }
}

export const logout = () => {

    return async (dispatch) => {
        window.localStorage.removeItem('loggedUser')
        dispatch({
            type: 'LOGOUT',
        })
    }
}
export const checkStorage = () => {
    return async (dispatch) => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        const loggedUser = loggedUserJSON ? JSON.parse(loggedUserJSON) : null
        dispatch({
            type: 'CHECK_STORAGE',
            payload: loggedUser,
        })
    }
}


export default loginReducer