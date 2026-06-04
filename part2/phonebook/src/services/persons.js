import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = personObj => {
    const request = axios.post(baseUrl, personObj)
    return request.then(response => response.data)
}

const deleteObj = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, personObj) => {
    const request = axios.put(`${baseUrl}/${id}`, personObj)
    return request.then(response => response.data)
}

export default { getAll, create, deleteObj, update }