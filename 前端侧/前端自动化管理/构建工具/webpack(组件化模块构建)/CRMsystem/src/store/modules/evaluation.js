import * as api from '@/api/evaluation'

const state = {
    all: [1,2,3],
    total: 0,
    evaluationForm: {},
    label: [],
    
}
const getters = {
    all: state => state.all.map(t0 =>({
        renterName: t0.renterName,
        renterTel: t0.renterTel,
        stewardName: t0.stewardName,
        departmentName: t0.departmentName,
        contractNumber: t0.contractNumber,
        houseName: t0.houseName,
        evaluateTime: t0.evaluateTime,
        evaluateStatus: t0.evaluateStatus,
        evaluateContent: t0.evaluateContent,
        evaluateLabel: t0.evaluateLabel,
        evaluateScore: t0.evaluateScore,
        evaluateLabelList: t0.evaluateLabelList,
        id: t0.id,
        contractId: t0.contractId,
        gmtModified:t0.gmtModified,
        serviceName: t0.serviceName,
        auditDate: t0.auditDate
    })),
    total: state => state.total,
    evaluationForm: state => state.evaluationForm,
    label: state => state.label
}

const mutations = {
    GET_ALLEVALUATION: (state, providers) => {
        state.all = providers.list;
        state.total = providers.total
    },
    GET_EVALUATIONBYID: (state, providers) => {
        state.evaluationForm = {
            renterName: providers.renterName,
            renterTel: providers.renterTel,
            stewardName: providers.stewardName,
            departmentName: providers.departmentName,
            contractNumber: providers.contractNumber,
            houseName: providers.houseName,
            evaluateTime: providers.evaluateTime,
            evaluateStatus: providers.evaluateStatus,
            evaluateContent: providers.evaluateContent,
            evaluateLabel: providers.evaluateLabel,
            evaluateScore: providers.evaluateScore && Number(providers.evaluateScore),
            evaluateLabelList: providers.evaluateLabelList,
            
        };
    },
    GET_EVALUATELABEL: (state, providers) => {
        state.label = providers;
    },
    // MERGE_EVALUATE: (state, providers) => {
    //     console.log(providers.message)
    // },
    // SAVE_EVALUATE: (state, providers) => {
    //     console.log(providers.message)
    // }
}

const actions = {
    // 获得所有评价
    GetEvaluation({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            api.getEvaluation(param).then(response => {
                commit('GET_ALLEVALUATION', response.data);
                resolve(true);
            }).catch(error => {
                reject(error)
            })
        })
    },
    GetEvaluationById({ commit }, id) {
        return new Promise((resolve, reject) => {
            api.getEvaluation(id). then(response => {
                commit('GET_EVALUATIONBYID', response.data.list[0])
            }).catch(error => {
                reject(error)
            })
        })
    },
    GetEvaluateLabel({ commit }) {
        return new Promise((resolve, reject) => {
            api.getEvaluateLabel(). then(response => {
                commit('GET_EVALUATELABEL', response.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    MergeEvaluate({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            api.mergeEvaluate(param). then(response => {
                commit('NEW_MESSAGE', {message:response.message});
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    SaveEvaluate({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            api.saveEvaluate(param). then(response => {
                commit('NEW_MESSAGE', {message:response.message});
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    ExportEvaluate({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            api.exportEvaluate(param). then(response => {
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