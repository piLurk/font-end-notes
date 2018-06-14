import request from './request'


// ---- 问题分类管理
// 新增问题分类 
export function addQuestionType(options) {
  return request({
    url:'cmsQuestionType/addCmsQuestionType',
    method:'post',
    ...options
  })
} 


//分页查询问题分类列表
export function getQuestionTypeList(options) {
  return request({
    url:'cmsQuestionType/listCmsQuestionTypeByPage',
    method:'post',
    ...options
  })
} 

// 切换问题分类状态
export function toggleQuestionTypeState(options) {
  return request({
    url:'/cmsQuestionType/stopOrStartCmsQuestionType',
    method:'post',
    ...options
  })
} 


//获取问题分类(回显)
export function getQuestionType(options) {
  return request({
    url:'cmsQuestionType/editorCmsQuestionType',
    method:'get',
    ...options
  })
} 
//编辑问题分类(保存)
export function saveQuestionType(options) {
  return request({
    url:'cmsQuestionType/saveCmsQuestionType',
    ...options
  })
} 
//停、复用问题分类
export function stopOrStartQuestionType(options) {
  return request({
    url:'cmsQuestionType/stopOrStartCmsQuestionType',
    method:'post',
    ...options
  })
} 

// ---- 问题列表


//分页问题列表
export function getQuestionList(options) {
  return request({
    url:'/cmsQuestion/listCmsQuestionByPageAndCondition',
    method:'post',
    ...options
  })
} 
 // 获取所有问题分类

 export function getQuestionTypes(options) {
  return request({
    url:'/cmsQuestion/listCmsQuestionType',
    method:'get',
    ...options
  })
 }
//新增问题
export function addQuestion(options) {
  return request({
    url:'cmsQuestion/addCmsQuestion',
    method:'post',
    ...options
  })
} 

//删除问题
export function deleteQuestion(options) {
  return request({
    url:'cmsQuestion/deleteCmsQuestion',
    method:'post',
    ...options
  })
} 
//编辑问题(回显)
export function getQuestionDetail(options) {
  return request({
    url:'cmsQuestion/editorCmsQuestion',
    method:'get',
    ...options
  })
} 
//编辑问题(保存)
export function editQuestion(options) {
  return request({
    url:'cmsQuestion/saveCmsQuestion',
    method:'post',
    ...options
  })
} 

