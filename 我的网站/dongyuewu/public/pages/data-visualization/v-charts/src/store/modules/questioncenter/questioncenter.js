
import { getQuestionTypes } from '@/api/questioncenter'

const questioncenter = {
  namespaced: true,
  state: {
    questionTypes:[]
  },
  getters: {
    questionTypes( state ) {
      return state.questionTypes
    }
  },
  mutations: {
    
  },
  actions: {
    getAllquestionType({ state, dispatch }) {
      getQuestionTypes({
        cb(questionTypes) {
          state.questionTypes = questionTypes;
        },
        errorCb() {
          dispatch("sendMessage", {
            type:'error',
            message: '问题类型列表获取失败！'
          }, {root: true})
        }
      })
    }
  }

} 

export default questioncenter