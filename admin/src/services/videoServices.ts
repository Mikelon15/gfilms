import Services from './services'

const baseUrl = 'https://us-central1-gutiproduction-5a606.cloudfunctions.net/api'
// const devUrl = 'http://localhost:5000/gutiproduction-5a606/us-central1/api'

export default {
  getVimeoVideos: () => Services.get(`${baseUrl}/getVideos`),
  getYoutubeVideos: () => Services.get(`${baseUrl}/getYoutubeVideos`),
  getVideos: () => Services.get(`${baseUrl}/videos`),
  addVideo: (video: any) => Services.post(`${baseUrl}/videos`, video),
  removeVideo: (id: any) => Services.delete(`${baseUrl}/videos`, { data: { id } }),
  // text calls
  getResume: () => Services.get(`${baseUrl}/resume`),
  updateResume: (text: any) => Services.put(`${baseUrl}/resume`, { value: text }),
  getAboutMe: () => Services.get(`${baseUrl}/aboutme`),
  updateAboutMe: (text: any) => Services.put(`${baseUrl}/aboutme`, { value: text })
}
