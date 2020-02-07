/*eslint-disable */

import Api from './api';

const api = new Api({
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

export default api
