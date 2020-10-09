import Services from './services'

const baseUrl = 'https://us-central1-gutiproduction-5a606.cloudfunctions.net/api'

export default {
  getVimeoVideos: () => Services.get(`${baseUrl}/getVideos`),
  getYoutubeVideos: () => Services.get(`${baseUrl}/getYoutubeVideos`)
}
