
import { Message } from 'element-ui'
const message = {
  actions: {
    sendMessage({},{type, message}){
      Message({
        type,
        message
      })
    }
  }
}
export default message