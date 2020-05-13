const initialNotification = { isShow: false, message: '', color: '' }
let timer
const notificationReducer = (state = initialNotification, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.payload
    case 'HIDE_NOTIFICATION':
      return action.payload
    default:
      return state
  }
}

export const setNotificaton = (message, color, seconds) => {
  return async (dispatch) => {
    dispatch({
      type: 'SHOW_NOTIFICATION',
      payload: { isShow: true, message, color },
    })
    clearTimeout(timer)
    await new Promise(
      () =>
        (timer = setTimeout(
          () =>
            dispatch({
              type: 'HIDE_NOTIFICATION',
              payload: { isShow: false, message: '', color: '' },
            }),
          seconds * 1000
        ))
    )
  }
}

export default notificationReducer
