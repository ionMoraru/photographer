import axios from 'axios';

// const url = "https://agile-forest-62857.herokuapp.com";
const url = "http://localhost:8080";

export default {
    images: {
        getSliderImages: () =>  axios.get(`${url}/api/v1/slider`),
        getCollectionsName: () =>  axios.get(`${url}/api/v1/collections`),
        getImages: (params) => axios.get(`${url}/api/v1/collections/images`, { params }),
    },
    contact: {
        sendEmail: (message) => axios.post(`${url}/api/v1/contact`, { message })
    }

}