import Services from './services';

const baseUrl = 'https://us-central1-gutiproduction-5a606.cloudfunctions.net/api';
// const baseUrl = 'http://localhost:5000/gutiproduction-5a606/us-central1/api';
export default {
    getAll() {
        return Services.get(`${baseUrl}/getVideos`);
    }
}