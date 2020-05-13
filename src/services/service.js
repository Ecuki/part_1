import axios from 'axios'


const service = (baseUrl) => {
  const setToken = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      return `Bearer ${loggedUser.token}`
    } else {
      return `Bearer `
    }
  }
  const get = async (id) => {
    const config = { headers: { Authorization: setToken() } }
    const response = await axios.get(`${baseUrl}/${id}`, config)
    return response.data
  }

  const getAll = async () => {
    const config = { headers: { Authorization: setToken() } }
    const response = await axios.get(baseUrl, config)
    return response.data
  }

  const create = async newObject => {
    const config = { headers: { Authorization: setToken() } }
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  }

  const update = async (id, newObject) => {
    const config = { headers: { Authorization: setToken() } }
    const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
    return response.data
  }

  const remove = async id => {
    const config = { headers: { Authorization: setToken() } }
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
  }
  return {
    get,
    getAll,
    create,
    update,
    remove,
    setToken
  }
}


export default service
