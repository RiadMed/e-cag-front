import axios from 'axios'

export default axios.create({
      withCredentials: true,
      baseURL: 'http://localhost:8099/auth-api',

    //withCredentials: false,
   //baseURL: 'http://localhost:8091',
  //  baseURL: 'https://networkapp.djezzy.dz:8091',
    headers: {
        'Content-type': 'application/json'
    }
})
