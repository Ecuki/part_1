import axios from 'axios'
import { useState } from 'react';

const useResource = (baseUrl) => {
  const [token, setToken] = useState(null);
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState({});
  const [sucsess, setSucsess] = useState({});

  const setNewToken = (newToken) => setToken(`Bearer ${newToken}`)

  const get = async (id) => {
    try {
      const response = await axios.get(`${baseUrl}/${id}`)
      setData(response.data)
    } catch (error) {
      setErrors({ ...errors, get: error.response.data.error })
    }
  }

  const getAll = async () => {
    try {
      const response = await axios.get(baseUrl)
      setData(response.data)
    } catch (error) {
      setErrors({ ...errors, getAll: error.response.data.error })
    }
  }

  const create = async (newObject) => {
    const config = { headers: { Authorization: token } }

    try {
      const response = await axios.post(baseUrl, newObject, config)
      setData([...data, response.data])
      setSucsess({ ...sucsess, create: ` added successfuly` })
    } catch (error) {
      setErrors({ ...errors, create: error?.response.data.error })
    }

  }

  const update = async (id, newObject) => {
    const config = { headers: { Authorization: token } }
    try {
      const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
      const newData = data.map(d => (d.id === response.data.id ? response.data : d))
      setData([...newData])
      setSucsess({ ...sucsess, update: ` updated successfuly` })
    } catch (error) {
      setErrors({ ...errors, update: error.response.data.error })
    }
  }
  const remove = async id => {
    const config = {
      headers: {
        Authorization: token
      }
    }
    try {
      await axios.delete(`${baseUrl}/${id}`, config)
      const newData = data.filter(d => d.id !== id)
      setData([...newData])
      setSucsess({ ...sucsess, remove: ` removed successfuly` })
    } catch (error) {

      setErrors({ ...errors, remove: error.response.data.error })

    }

  }


  return [{ data, errors, sucsess }, { get, getAll, create, update, remove, setNewToken }]
}

export default useResource