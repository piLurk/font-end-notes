import * as api from '@/api/workbench'
const state = {
    goldRegion:{
        mouth:'01',
        region:'光谷',
        in:{
            target:'92',
            actual:'107',
            completionRate:'116.30'
        },
        out:{
            target:'428',
            actual:'350.5',
            completionRate:'81.89'
        }
    },
    goldGroup:{
        mouth:'01',
        list:[
            {
                region:'光谷',
                group:'金融港',
                areaManager:'吴超锋',
                totalScore:'1.79',
                in:{
                    target:'24',
                    actual:'34',
                    completionRate:'144.23',
                    score:'0.94'
                },
                out:{
                    target:'102',
                    actual:'99',
                    completionRate:'97.06',
                    score:'0.85'
                }
            },
            {
                region:'南湖',
                group:'珞狮南路',
                areaManager:'王文举',
                totalScore:'1.66',
                in:{
                    target:'19',
                    actual:'25',
                    completionRate:'131.58',
                    score:'0.86'
                },
                out:{
                    target:'95',
                    actual:'86.5',
                    completionRate:'91.05',
                    score:'0.80'
                }
            },
            {
                region:'硚口',
                group:'王家湾',
                areaManager:'李玉杰',
                totalScore:'1.59',
                in:{
                    target:'23',
                    actual:'32',
                    completionRate:'139.13',
                    score:'0.91'
                },
                out:{
                    target:'82',
                    actual:'64',
                    completionRate:'78.05',
                    score:'0.68'
                }
            }
        ]
    },
    goldKeeper:{
        mouth:'01',
        inList:[
            {
                name:'余振鹏',
                region:'光谷',
                group:'软件园',
                actual:'10',
                actualScore:'0.59',
                performance:'93739.26',
                performanceScore:'0.96',
                totalScore:'1.55'
            },
            {
                name:'刘思璐',
                region:'江汉',
                group:'汉西',
                actual:'8',
                actualScore:'0.47',
                performance:'97293.68',
                performanceScore:'1.00',
                totalScore:'1.47'
            },
            {
                name:'祁志扬',
                region:'光谷',
                group:'金融港',
                actual:'17',
                actualScore:'1.00',
                performance:'38631.36',
                performanceScore:'0.40',
                totalScore:'1.40'
            },
            {
                name:'韩高洲',
                region:'光谷',
                group:'软件园',
                actual:'15',
                actualScore:'0.88',
                performance:'27723.80',
                performanceScore:'0.28',
                totalScore:'1.16'
            },
            {
                name:'严贵松',
                region:'南湖',
                group:'珞狮南路',
                actual:'11',
                actualScore:'0.65',
                performance:'34736.70',
                performanceScore:'0.36',
                totalScore:'1.01'
            }
        ],
        outList:[
            {
                name:'唐钰淋',
                region:'硚口',
                group:'王家湾',
                actual:'29'
            },
            {
                name:'杨子强',
                region:'江岸',
                group:'后湖',
                actual:'26'
            },
            {
                name:'刘梓唯',
                region:'江汉',
                group:'汉西',
                actual:'22.5'
            },
            {
                name:'李庭博',
                region:'硚口',
                group:'古田',
                actual:'21'
            },
            {
                name:'江佳',
                region:'硚口',
                group:'王家湾',
                actual:'19'
            },
            {
                name:'肖金泰',
                region:'光谷',
                group:'鲁巷',
                actual:'19'
            }
        ]
    },
    allRemindNum: 0,
    remindList:{
        // tipsCount: 0,
        // timeOutCount: 0,
        // tips:[
        //     {
        //         id: 1,
        //         userName: '',
        //         tipsType: '',
        //         tipTime: '',
        //         readFlag: true
        //     }
        // ]
    },
    weekCount:1,
    briefList:{},
    performance:{
        rentRate:null,
        ganthRate:null,
        rentAchieveObjectiveNum:null,
        ganthCompleteRate:null,
        rentCompleteRate:null,
        ganthAchieveObjectiveNum:null,
        rentObjectiveNum:null,
        ganthObjectiveNum:null
    },
    termination:[],
    terminationRate:null,
    allAreaCount: 1,
    allGroupCount: 1,
    allRankList: [],
    gantherCount: 1,
    gantherList: [],
    rentCount: 1,
    rentList: [],
    newCustomCount: 1,
    newCustomList: [],
    rentAchievementList: [],
    ganthAchievementList: [],
    houseStateList: {},
}
const getters = {
    goldRegion: state => state.goldRegion,
    goldGroup: state => state.goldGroup,
    goldKeeper: state => state.goldKeeper,
    allRemindNum: state => state.allRemindNum,
    remindList: state => state.remindList,
    weekCount: state => state.weekCount,
    briefList: state => state.briefList,
    performance: state => state.performance,
    termination: state => state.termination,
    terminationRate: state => state.terminationRate,
    allAreaCount: state => state.allAreaCount,
    allGroupCount: state => state.allGroupCount,
    allRankList: state => state.allRankList,
    gantherCount: state => state.gantherCount,
    gantherList: state => state.gantherList,
    rentCount: state => state.rentCount,
    rentList: state => state.rentList,
    newCustomCount: state => state.newCustomCount,
    newCustomList: state => state.newCustomList,
    rentAchievementList: state => state.rentAchievementList,
    ganthAchievementList: state => state.ganthAchievementList,
    houseStateList: state => state.houseStateList,

}

const mutations = {
    GET_REMINDNUM: (state, providers) => {
        state.allRemindNum = providers.count;
    },
    GET_REMINDLIST:(state, providers) => {
        state.remindList = providers;
    },
    READREMIND:(state, providers) => {

    },
    GET_WEEKCOUNT:(state, providers) => {
        state.weekCount = providers.weekCount;
    },
    SEE_WEEKBRIEF:(state, providers) => {
        state.briefList = providers;
    },
    GET_PERFORMANCE:(state, providers) => {
        state.performance = providers
    },
    GET_TERMINATION:(state, providers) => {
        if(providers.cancelTypes !== null){
            var obj={};
            providers.cancelTypes.map((item) => {
                obj[item.dicCode]={
                    dicName:item.dicName,
                    cancelCount:null,
                }
            })
            state.termination = obj
        }   
    },
    GET_TERMINATION_DATA:(state, providers) => {
        providers.cancelCounts.map( (item) =>{
            state.termination[item.cancelType]['cancelCount']=item.cancelCount;
        })
        state.terminationRate=providers.ratio;
    },
    GET_ALLRANKCOUNT:(state, providers) => {
        state.allAreaCount = providers.areaCount;
        state.allGroupCount = providers.groupCount;
    },
    GET_ALLRANKLIST:(state, providers) => {
        state.allRankList = providers.ranks;
    },
    GET_GANTHERRANKCOUNT:(state, providers) => {
        state.gantherCount = providers.count;
    },
    GET_GANTHERRANKLIST:(state, providers) => {
        state.gantherList = providers.ranks;
    },
    GET_RENTRANKCOUNT:(state, providers) => {
        state.rentCount = providers.count;
    },
    GET_RENTRANKLIST:(state, providers) => {
        state.rentList = providers.ranks;
    },
    GET_NEWCUSTOMCOUNT:(state, providers) => {
        state.newCustomCount = providers.count;
    },
    GET_NEWCUSTOMLIST:(state, providers) => {
        state.newCustomList = providers.newCustoms;
    },
    GET_RENTACHIEVEMENT:(state, providers) => {
        state.rentAchievementList = providers.rankRecords;
    },
    GET_GANTHACHIEVEMENT:(state, providers) => {
        state.ganthAchievementList = providers;
    },
    GET_HOUSESTATE:(state, providers) => {
        state.houseStateList = providers;
    },
}

const actions = {
    GetRemindNum({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            api.getRemindNum(param).then(response => {
                commit('GET_REMINDNUM', response.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    GetRemindList({ commit, state }, param){
        return new  Promise((resolve,reject)=>{
            api.getRemindList(param).then(response=>{
                commit('GET_REMINDLIST', response.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    ReadRemind({ commit, state }, param){
        return new  Promise((resolve,reject)=>{
            api.readRemind(param).then(response=>{
                commit('NEW_MESSAGE', {message:response.data.message})
            }).catch(error => {
                reject(error)
            })
        })
    },
    ReadAllRemind({ commit, state }, param){
        return new  Promise((resolve,reject)=>{
            api.readAllRemind(param).then(response=>{
                commit('NEW_MESSAGE', {message:response.data.message})
            }).catch(error => {
                reject(error)
            })
        })
    },
    GetWeekCount({ commit, state }, param){
        return new  Promise((resolve,reject)=>{
            api.getWeekCount(param).then(response=>{
                commit('GET_WEEKCOUNT', response.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    SeeWeekBrief({ commit, state }, param){
        return new  Promise((resolve,reject)=>{
            api.seeWeekBrief(param).then(response=>{
                commit('SEE_WEEKBRIEF', response.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    GetPerformance({commit ,state}, userId){
        return new  Promise((resolve,reject)=>{
            api.getPerformance(userId).then(response=>{
                commit('GET_PERFORMANCE', response.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    GetTermination({commit , dispatch, state}, userId){
        return new  Promise((resolve,reject)=>{
            api.getTermination(userId).then(response=>{
                commit('GET_TERMINATION', response.data);
                dispatch('GetTerminationData',userId);
            }).catch(error => {
                reject(error)
            })
        })
    },
    GetTerminationData({commit ,state}, userId){
        return new  Promise((resolve,reject)=>{
            api.getTerminationData(userId).then(response=>{
                commit('GET_TERMINATION_DATA', response.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    CountAllAchievementRank({ commit, state }, param){
        return new Promise((resolve,reject)=>{
            api.countAllAchievementRank(param).then(response=>{
                commit('GET_ALLRANKCOUNT', response.data)
            }).catch(error=>{
                reject(error)
            })
        })
    },
    ListAllAchievementRank({ commit, state }, param){
        return new Promise((resolve,reject)=>{
            api.listAllAchievementRank(param).then(response=>{
                commit('GET_ALLRANKLIST', response.data)
            }).catch(error=>{
                reject(error)
            })
        })
    },
    CountGantherAchievementRank({ commit, state }, param){
        return new Promise((resolve,reject)=>{
            api.countGantherAchievementRank(param).then(response=>{
                commit('GET_GANTHERRANKCOUNT', response.data)
            }).catch(error=>{
                reject(error)
            })
        })
    },
    ListGatherAchievementRank({ commit, state }, param){
        return new Promise((resolve,reject)=>{
            api.listGatherAchievementRank(param).then(response=>{
                commit('GET_GANTHERRANKLIST', response.data)
            }).catch(error=>{
                reject(error)
            })
        })
    },
    CountRentAchievementRank({ commit, state }, param){
        return new Promise((resolve,reject)=>{
            api.countRentAchievementRank(param).then(response=>{
                commit('GET_RENTRANKCOUNT', response.data)
            }).catch(error=>{
                reject(error)
            })
        })
    },
    ListRentAchievementRank({ commit, state }, param){
        return new Promise((resolve,reject)=>{
            api.listRentAchievementRank(param).then(response=>{
                commit('GET_RENTRANKLIST', response.data)
            }).catch(error=>{
                reject(error)
            })
        })
    },
    CountNewCustom({ commit, state }, param){
        return new Promise((resolve,reject)=>{
            api.countNewCustom(param).then(response=>{
                commit('GET_NEWCUSTOMCOUNT', response.data)
            }).catch(error=>{
                reject(error)
            })
        })
    },
    ListNewCustom({ commit, state }, param){
        return new Promise((resolve,reject)=>{
            api.listNewCustom(param).then(response=>{
                commit('GET_NEWCUSTOMLIST', response.data)
            }).catch(error=>{
                reject(error)
            })
        })
    },
    ViewRentAchievement({ commit, state }, param){
        return new Promise((resolve,reject)=>{
            api.viewRentAchievement(param).then(response=>{
                commit('GET_RENTACHIEVEMENT', response.data)
            }).catch(error=>{
                reject(error)
            })
        })
    },
    ViewGanthAchievement({ commit, state }, param){
        return new Promise((resolve,reject)=>{
            api.viewGanthAchievement(param).then(response=>{
                commit('GET_GANTHACHIEVEMENT', response.data)
            }).catch(error=>{
                reject(error)
            })
        })
    },
    ViewHouseState({ commit, state }, param){
        return new Promise((resolve,reject)=>{
            api.viewHouseState(param).then(response=>{
                commit('GET_HOUSESTATE', response.data)
            }).catch(error=>{
                reject(error)
            })
        })
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}