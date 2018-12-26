import axios from 'axios';

let url;
const env = process.env.REACT_APP_STAGE;

switch (env) {
  case 'dev':
    url = 'http://localhost:8080';
    break;
  case 'production':
    url = 'https://agile-forest-62857.herokuapp.com';
    break;
  default:
    url = 'https://agile-forest-62857.herokuapp.com';
}

export default {
  images: {
    getSliderImages: () => axios.get(`${url}/api/v1/slider`),
    getCollectionsName: () => axios.get(`${url}/api/v1/collections`),
    getImages: params => axios.get(`${url}/api/v1/collections/images`, { params }),
  },
  contact: {
    sendEmail: message => axios.post(`${url}/api/v1/contact`, { message }),
  },
};
