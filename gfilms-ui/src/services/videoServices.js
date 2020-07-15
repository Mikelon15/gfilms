import Services from './services'

const baseUrl = 'https://us-central1-gutiproduction-5a606.cloudfunctions.net/api'

export default {
  getAll () {
    return Services.get(`${baseUrl}/getVideos`)
  }
}
