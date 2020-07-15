import axios from 'axios'

const baseUrl = 'https://us-central1-gutiproduction-5a606.cloudfunctions.net'

export default axios.create({ baseUrl })
