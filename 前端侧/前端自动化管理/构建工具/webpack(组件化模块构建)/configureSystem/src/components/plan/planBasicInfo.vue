<template>
  <div class="create_content">
    <!--合同基本信息 begin-->
    <div class="item">
      <h3>合同基本信息</h3>
      <ul class="item_ul clearfix">
        <li>
          <span class="tit">房源编号：</span>
          <span class="content">{{ordersPlanDetail.propertyVo.propertyNumber}}</span>
        </li>
        <li>
          <span class="tit">收房产品：</span>
          <span class="content">{{ordersPlanDetail.houseTypeName | blank}}</span>
        </li>
        <li>
          <span class="tit">产品版本：</span>
          <span class="content">{{ordersPlanDetail.propertyVo.productRelease | blank}}</span>
        </li>
        <li style="width: 50%">
          <span class="tit">物业地址：</span>
          <span class="content">{{ordersPlanDetail.propertyVo.propertyAddress | blank}}</span>
        </li>
      </ul>
    </div>
    <!--合同基本信息 end-->

    <!--配置相关信息 begin-->
    <div class="item">
      <h3>配置相关信息</h3>
      <ul class="item_ul clearfix">
        <li style="width: 100%;padding-bottom:20px;" v-if="!isStandard && $route.name!=='completedCheckDetail'">
          <span class="tit">配置项目：</span>
          <span class="content" v-if="$route.params.oper!=='create' && ordersPlanDetail.deployDetailsVos">
            <span v-if="$route.params.oper==='view'">{{ordersPlanDetail.deployDetailsVos[0].sortName}}</span>
            <el-select filterable v-else v-model="ordersPlanDetail.deployDetailsVos[0]" value-key="sortId" placeholder="请选择" @change="selectSort" :disabled="$route.params.oper==='edit'">
              <el-option v-for="(item, index) in level2UsedTreeList" :key="item.sortId" :value="item" :label="item.sortName">
              </el-option>
            </el-select>
          </span>
          <span class="content" v-if="$route.params.oper==='create'">
            <el-select filterable v-model="sortObj" value-key="sortId" placeholder="请选择" @change="selectSort">
              <el-option v-for="(item, index) in level2UsedTreeList" :key="item.sortId" :value="item" :label="item.sortName">
              </el-option>
            </el-select>
          </span>
        </li>
        <li>
          <span class="tit">配置类型：</span>
          <span class="content">{{ordersPlanDetail.deployTypeName | blank}}</span>
        </li>
        <li>
          <span class="tit">宽带是否首次安装：</span>
          <span class="content">{{ordersPlanDetail.propertyVo.isInstall | ifOrNot}}</span>
        </li>
        <li>
          <span class="tit">宽带是否集中办理：</span>
          <span class="content">{{ordersPlanDetail.propertyVo.isUse | ifOrNot}}</span>
        </li>
        <li>
          <span class="tit">是否有燃气：</span>
          <span class="content">{{ordersPlanDetail.propertyVo.isGas | ifOrNot}}</span>
        </li>
        <li style="width: 100%">
          <span class="tit">预计配置周期：</span>
          <span class="content">{{ordersPlanDetail.timeString | blank}}</span>
        </li>
        <li v-if="isCheck" style="width: 100%">
          <span class="tit">标准配置周期：</span>
          <span class="content">{{ordersPlanDetail.standardPeriod | blank | toDay}}</span>
        </li>
      </ul>
      <!--表数据 begin-->
      <div class="tableBox pdlr35 pdtb15" style="width: auto;">
        <table class="modtable" width="100%" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <th>功能区间</th>
            <th>装修风格</th>
            <th>使用面积</th>
            <th>是否有暖气</th>
            <th>是否能装空调</th>
            <th>朝向</th>
            <th>是否有独卫</th>
            <th>独卫面积</th>
            <th>阳台类型</th>
            <th>阳台面积</th>
          </tr>
          <tr v-for="(room, index) in ordersPlanDetail.propertyVo.roomVos" :key="index">
            <td>{{(room.sectionType || '') + (room.bedroomNum || '')}}</td>
            <td>{{room.houseStyle | blank}}</td>
            <td>{{room.houseArea ? room.houseArea + ' m²' : '---'}}</td>
            <td>{{room.isHeating | ifOrNot}}</td>
            <td>{{room.isConditioner | ifOrNot}}</td>
            <td>{{room.houseOrientation | blank}}</td>
            <td>{{room.isToilet | ifOrNot}}</td>
            <td>{{room.toiletArea ? room.toiletArea + ' m²' : '---'}}</td>
            <td>{{room.balconyType | blank}}</td>
            <td>{{room.balconyArea ? room.balconyArea + ' m²' : '---'}}</td>
          </tr>
        </table>
      </div>
      <!--表数据 end-->
    </div>
    <!--配置相关信息 end-->

    <!--供应商选择 begin-->
    <div class="item">
      <h3>供应商选择</h3>
      <ul class="item_ul clearfix">
        <li v-for="(provider, index) in ordersPlanDetail.propertyVo.providerVos" :key="index">
          <span class="tit">{{provider.providerTypeName}}供应商：</span>
          <span class="content">{{provider.proName}}</span>
        </li>
      </ul>
    </div>
    <!--供应商选择 end-->
  </div>
</template>


<script type="text/javascript">

export default {
  name: 'planBasicInfo',
  props: ['ordersPlanDetail', 'isCheck'],
  data() {
    return {
      sortObj: {}
    }
  },
  computed: {
    level2UsedTreeList() {
      return this.$store.getters.level2UsedTree.map(ele => ({
        sortId: ele.id,
        sortName: ele.sortName
      }))
    },
    isStandard() {
      try {
        return this.ordersPlanDetail.deployTypeName.indexOf('标准') > -1
          ? true
          : false
      } catch (error) {
        return this.$route.params.type === 0
      }
    }
  },
  methods: {
    selectSort(val) {
      const hasProvider = this.ordersPlanDetail.propertyVo.providerVos.some(
        provider => provider.classifyId === val.sortId
      )
      if (!hasProvider) {
        this.$message.error(`该楼盘没有 ${val.sortName} 供应商，此分类下物品无效`)
      }
      this.$emit('change', val)
    }
  }
}
</script>

<style scoped>
/* create_content*/
.create_content .item .item_ul li {
  box-sizing: border-box;
  height: 40px;
  line-height: 40px;
  width: 360px;
  float: left;
  padding-left: 35px;
}
.create_content .item .item_ul li .tit {
  color: #a3b2c6;
  /* padding-left: 35px; */
}
.create_content .item .item_ul li .content {
  display: inline-block;
  color: #151515;
}
table.modtable > tr > td,
table.modtable > tr > th {
  text-align: center;
}
</style>



             