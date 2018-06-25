import * as api from '@/api/managetenants'

const state = {
    allRenterInfo: [1,2,3],
    renterInfoCount: 0,
    baseinfo: {},
    renterEducationInformation: {},
    contractsCount: 1,
    contractsList: [],
    cancelcontractsCount: 1,
    cancelcontractsList: []
    // evaluationForm: {}
}

const getters = {
    allRenterInfo: state => state.allRenterInfo.map(t0 =>({
        rentUserName: t0.rentUserName,
        rentUserTel: t0.rentUserTel,
        houseName: t0.houseName,
        lastContractNo: t0.lastContractNo,
        belongSaler: t0.belongSaler,
        gmtCreate: t0.gmtCreate,
        signDate: t0.signDate,
        breakDate: t0.breakDate,
        id: t0.pkId
    })),
    renterInfoCount: state => state.renterInfoCount,
    baseinfo: state => state.baseinfo,
    renterEducationInformation: state => state.renterEducationInformation,
    contractsCount: state => state.contractsCount,
    contractsList: state => state.contractsList,
    cancelcontractsCount: state => state.cancelcontractsCount,
    cancelcontractsList: state => state.cancelcontractsList
    // evaluationForm: state => state.evaluationForm
}

const mutations = {
    GET_ALLRENTERINFO: (state, providers) => {
        state.allRenterInfo = providers.list
        state.renterInfoCount = providers.total
    },
    GET_BASICINFO: (state, providers) => {
        state.baseinfo = providers.baseinfo
        if(!!providers.renterEducationInformation){
            state.renterEducationInformation = providers.renterEducationInformation
        }else{
            state.renterEducationInformation = {
                education: '',
                enrollmentYear: '',
                graduationYear: '',
                school: '',
                educationType: '',
                educationVerificationCode: '',
                schoolVerificationCode: '',
                examineStatus: '',
                budget: ''
            }
        }
        // state.renterEducationInformation.examineStatus = 2;
    },
    GET_CONTRACTS: (state, providers) => {
        state.contractsCount = providers.total
        state.contractsList = providers.list
    },
    GET_CANCELCONTRACTS: (state, providers) => {
        state.cancelcontractsCount = providers.total
        state.cancelcontractsList = providers.list
    }
}

const actions = {
    // 获得所有租客
    GetRenterinfo({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            api.getRenterinfo(param).then(response => {
                commit('GET_ALLRENTERINFO', response.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 查询租客详情
    GetBasic({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            api.getBasic(param).then(response => {
                commit('GET_BASICINFO', response.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 查询租客合同信息
    GetContracts({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            api.getContracts(param).then(response => {
                commit('GET_CONTRACTS', response.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 查询租客解约信息
    GetCancelContracts({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            api.getCancelContracts(param).then(response => {
                commit('GET_CANCELCONTRACTS', response.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 学历审批接口
    WorkflowComplete({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            api.workflowComplete(param).then(response => {
                resolve()
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