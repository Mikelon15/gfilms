import Services from './services'

const baseUrl = 'https://us-central1-gutiproduction-5a606.cloudfunctions.net/api'

export default {
  getVideos: () => Services.get(`${baseUrl}/videos`),
  getResume: () => Services.get(`${baseUrl}/resume`),
  getAboutMe: () => Services.get(`${baseUrl}/aboutme`)
}
