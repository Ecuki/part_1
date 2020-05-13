import axios from 'axios'

const baseUrl = '/api/anecdotes'

let token = null;

const setToken = newToken => token = `Bearer ${newToken}`

const get = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (anecdote) => {
  const config = { headers: { Authorization: token } }

  const response = await axios.post(baseUrl, anecdote, config)
  return response.data
}

const update = async (id, anecdote) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.put(`${baseUrl}/${id}`, anecdote, config)
  return response.data
}
const remove = async id => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { get, getAll, create, update, remove, setToken }
