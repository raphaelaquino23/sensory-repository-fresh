import axios from 'axios';
const baseUrl = 'http://localhost:3081/api/register';

const create = (newObject: any) => {
  const request = axios.post(baseUrl, newObject);
  return request.then(response => response.data);
}

export default { create };