import axios from 'axios'
const baseUrl = 'http://localhost:3081/api/campaign'
const uploadUrl = 'http://localhost:3081/api/campaigninformation'
const registerUrl = 'http://localhost:3081/api/campaignsignup'
const uploadFileUrl = 'http://localhost:3081/api/upload'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (newObject:any) => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const upload = (newObject:any) => {
  const request = axios.post(uploadUrl, newObject)
  return request.then(response => response.data)
}

const uploadFile = (newObject:any) => {
  const request = axios.post(uploadFileUrl, newObject)
  return request.then(response => response.data)
}

const registerCampaign = (newObject: any) => {
  const request = axios.post(registerUrl, newObject)
  return request.then(response => response.data)
}

const update = (newObject:any) => {
  const request = axios.put(`${baseUrl}`, newObject)
  return request.then(response => response.data)
}

const remove = (id:number) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export default { getAll, create, upload, update, remove, registerCampaign }