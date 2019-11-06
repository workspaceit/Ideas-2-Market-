import axios from 'axios'

// const API_ENDPOINT = 'http://localhost:8080/'
const API_ENDPOINT = 'http://58.84.34.65:8081/'

// export const ICV_ENDPOINT = 'http://localhost:4000'
export const ICV_ENDPOINT = 'http://58.84.34.65:4040'

// export const IMAGE_ENDPOINT = 'http://localhost:8080'
export const IMAGE_ENDPOINT = 'http://58.84.34.65:8081'

const apiEndpoint = axios.create({
  baseURL: API_ENDPOINT,
  /* other custom settings */
})

export default apiEndpoint
