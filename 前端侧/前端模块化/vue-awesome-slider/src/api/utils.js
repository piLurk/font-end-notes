import axios from 'axios'


export function setHeader(options){
  Object.keys(options).map( (attr) => {
    axios.defaults.headers[attr] = options[attr];
  })
}

