import axios from 'axios';

export default axios.create({
  baseURL: `https://raw.githubusercontent.com/DyslexicDcuk/transformers-api/master/db.json`
});