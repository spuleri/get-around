import axios from 'axios';
import baseURL from './config';

// Define the axios http client
const httpClient = axios.create({
  baseURL,
  timeout: 1000,
  headers: {}
});

// Http client functions are defined in this object
const HttpClient = {

  fetchLanguagesAsync(callback) {
    httpClient.get('/languages')
      .then((res) => {
        console.log(res);
        callback(res.data, undefined);
      })
      .catch((err) => {
        console.log(err);
        callback(undefined, err);
      });
  },

  translate(text, from, to, callback) {
    httpClient.post('/translate', { text, from, to })
      .then((res) => {
        console.log(res);
        callback(res.data.translation, undefined);
      })
      .catch((err) => {
        console.log(err);
        callback(undefined, err);
      });
  }
};

export default HttpClient;
