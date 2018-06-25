import * as api from '@/api/clue'

const state = {
	offcialRenterBespeakVO: {},
	renterEducationInformation1: {}
}

const getters = {
    offcialRenterBespeakVO: state => state.offcialRenterBespeakVO,
    renterEducationInformation1: state => state.renterEducationInformation1
}

const mutations = {
    RENTERBESPEAK: (state, providers) => {
        state.offcialRenterBespeakVO = providers.offcialRenterBespeakVO
        if(!!providers.renterEducationInformation){
            state.renterEducationInformation1 = providers.renterEducationInformation
        }else{
            state.renterEducationInformation1 = {
                education: '',
                enrollmentYear: '',
                graduationYear: '',
                school: '',
                educationType: '',
                budget: ''
            }
        }
    }
}

const actions = {
    // 查询线索详情
    RenterBespeak({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            api.renterBespeak(param).then(response => {
                commit('RENTERBESPEAK', response.data)
            }).catch(error => {
                reject(error)
            })
        })
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}