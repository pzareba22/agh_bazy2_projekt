// First we need to import axios.js
import axios from "axios";
// Next we make an 'instance' of it

const ngrokAddress = 'http://ffbd-195-150-192-250.ngrok.io'
const useNgrokAddress = true;

const axiosInstance = axios.create({
  // .. where we make our configurations
  baseURL: useNgrokAddress ? ngrokAddress : "http://localhost:3000",
});

// Where you would set stuff like your 'Authorization' header, etc ...
// instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

// Also add/ configure interceptors && all the other cool stuff

export default axiosInstance;
