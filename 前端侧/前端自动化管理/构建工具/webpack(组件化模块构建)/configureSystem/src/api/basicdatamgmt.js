import http from './http'

// 获取所有供应商
export function getProviders(params, cb, errorCb) {
  return http.put('provider/all', params, cb, errorCb)
}

// 根据Id查供应商
export function getProviderByPkId(pkId, cb, errorCb) {
  return http.get(`provider/${pkId}`, cb, errorCb)
}

// 获取所有供应商类别
export function getSortName(cb, errorCb) {
  return http.get('sort/name', cb, errorCb)
}

// 编辑供应商
export function editProvider(param, cb, errorCb) {
  return http.put('provider', param, cb, errorCb)
}

// 新增供应商
export function addProvider(param, cb, errorCb) {
  return http.post('provider', param, cb, errorCb)
}

// 批量操作供应商（启用、停用、删除）
export function operProvider(operationType, providerIds, cb, errorCb) {
  return http.put(`provider/${operationType}/operate`, providerIds, cb, errorCb)
}

// 查询供应商列表
export function searchProviders(params, cb, errorCb) {
  return http.put('provider/all', params, cb, errorCb)
}

// 查询所有分类
export function getAllCategory(cb, errorCb) {
  return http.get('sort/all', cb, errorCb)
}

// 新增三级分类											
export function add3rdCategory(params, cb, errorCb) {
  return http.post('sort', params, cb, errorCb)
}

// 编辑三级分类
export function edit3rdCategory(params, cb, errorCb) {
  return http.put('sort', params, cb, errorCb)
}

// 停用/启用 分类
export function operCategory(type, id, cb, errorCb) {
  return http.put(`sort/${type}/operate?id=${id}`, {}, cb, errorCb)
}

// 删除分类											
export function deleteCategory(id, cb, errorCb) {
  return http.delete(`sort/${id}`, cb, errorCb)
}

// 查询分类下的物品
export function getSortGoods(params, cb, errorCb) {
  return http.put('goods/sort', params, cb, errorCb)
}

// 新增物品
export function addGoods(params, cb, errorCb) {
  return http.post('goods', params, cb, errorCb)
}

// 编辑物品
export function editGoods(params, cb, errorCb) {
  return http.put('goods', params, cb, errorCb)
}

// 根据物品ID查询物品
export function getGoodsById(id, cb, errorCb) {
  return http.get(`goods/${id}`, cb, errorCb)
}

// 根据删除/停用/启用/物品											
export function operGoodsByIds(type, ids, cb, errorCb) {
  return http.put(`goods/${type}/operate`, ids, cb, errorCb)
}

// 查询当前物品绑定的性质物品(配件/组装费)
export function getGoodsPro(params, cb, errorCb) {
  return http.get(`parts/${params.type}_${params.state}/goods?id=${params.id}&limit=${params.pageSize}&pageNum=${params.curr}`, cb, errorCb)
}

// 添加物品配件关系
export function addGoodsRelationship(params, cb, errorCb) {
  return http.post(`parts`, params, cb, errorCb)
}

// 编辑物品配件关系
export function editGoodsRelationship(params, cb, errorCb) {
  return http.put(`parts`, params, cb, errorCb)
}

// 根据id查 配件/组装费
export function getGoodsPartDetail(id, cb, errorCb) {
  return http.get(`parts/${id}`, cb, errorCb)
}

// 根据id 删除/停用/启用 配件/组装费
export function operGoodsPart(params, cb, errorCb) {
  return http.delete(`parts/${params.type}/operate?id=${params.id}`, cb, errorCb)
}

// 根据物品性质查询性质名称
export function getGoodsRelationship(params, cb, errorCb) {
  return http.get(`parts/${params.type}/name?id=${params.id}`, cb, errorCb)
}

// 根据id查 价格
export function getGoodsPriceDetail(id, cb, errorCb) {
  return http.get(`cost/${id}`, cb, errorCb)
}

// 查询物品价格
export function getGoodsPrice(params, cb, errorCb) {
  return http.get(`cost/${params.state}/goods?id=${params.id}&limit=${params.pageSize}&pageNum=${params.curr}`, cb, errorCb)
}

// 新增物品价格
export function addGoodsPrice(params, cb, errorCb) {
  return http.post(`cost`, params, cb, errorCb)
}

// 修改物品价格
export function editGoodsPrice(params, cb, errorCb) {
  return http.put(`cost`, params, cb, errorCb)
}

// 删除/停用/启用 价格
export function operGoodsPrice(params, cb, errorCb) {
  return http.put(`cost/${params.type}/operate?id=${params.id}`, {}, cb, errorCb)
}


/******************  匹配供应商  ******************/
// 查询商圈列表
export function getArea(params, cb, errorCb) {
  return http.get(`provider/${params.dataType}/area/${params.parentId}`, cb, errorCb)
}

// 查询楼盘信息列表
export function getHouses(params, cb, errorCb) {
  return http.put(`provider/premises`, params, cb, errorCb)
}

// 查询供应商列表
export function getHousesPrividers(housesId, cb, errorCb) {
  return http.get(`provider/house/${id}`, cb, errorCb)
}

// 删除楼盘供应商
export function delHousesPrividers(housesId, proId, cb, errorCb) {
  return http.delete(`provider/${housesId}/cancel/${proId}`, cb, errorCb)
}

// 更换楼盘供应商
export function changeHousesPrividers(housesId, oldProId, newProId, cb, errorCb) {
  return http.put(`provider/change/${newProId}`, {
    housesId: housesId,
    proId: oldProId
  }, cb, errorCb)
}

// 添加楼盘供应商
export function addHousesPrividers(housesId, proIds, cb, errorCb) {
  return http.post(`provider/house/${housesId}`, proIds, cb, errorCb)
}

// 复制楼盘供应商
export function copyHousesPrividers(housesId, proIds, cb, errorCb) {
  return http.put(`provider/copy/${housesId}`, proIds, cb, errorCb)
}

// 复制楼盘供应商
export function batchCopyHousesPrividers(params, cb, errorCb) {
  return http.put(`provider/copy`, params, cb, errorCb)
}

/******************  标配方案管理  ******************/
// 查询方案
export function getSolution(params, cb, errorCb) {
  return http.put('standard/all', params, cb, errorCb)
}

// 停用/启用/删除标配方案
export function operSolution(type, ids, cb, errorCb) {
  return http.post(`standard/${type}/operate`, ids, cb, errorCb)
}

// 新增标配方案
export function addSolution(params, cb, errorCb) {
  return http.post('standard', params, cb, errorCb)
}

// 根据ID查询标配方案
export function getSolutionById(id, cb, errorCb) {
  return http.get(`standard/${id}`, cb, errorCb)
}

// 查询标配方案下二级分类的物品
export function getSolutionL2Goods(standardId, sortId, cb, errorCb) {
  return http.get(`standard/goods?standardId=${standardId}&sortId=${sortId}`, cb, errorCb)
}

// 编辑标配方案
export function editSolution(params, cb, errorCb) {
  return http.put('standard', params, cb, errorCb)
}



// 


