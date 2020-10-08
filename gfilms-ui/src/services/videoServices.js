import Services from './services'

const baseUrl = 'https://us-central1-gutiproduction-5a606.cloudfunctions.net/api'

export default {
  getAll: () => Services.get(`${baseUrl}/getVideos`),
  getYoutube: () => Services.get(`${baseUrl}/getYoutubeVideos`)
}
