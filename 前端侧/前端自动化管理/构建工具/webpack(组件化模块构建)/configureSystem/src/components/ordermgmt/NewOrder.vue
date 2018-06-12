<template>
	<div class="create_content content-right">
		<div class="topItem">
			<i>收房合同号：&nbsp;</i>
			<div class="inp-box">
				<input style="width:250px" @keydown.enter="keydownSearch" type="text" v-model.trim="contractNumber" placeholder="请输入">
				<div class="errorBox" v-text="contractError"></div>
			</div>
			<button @click="orderQuery" class="btn btn-primary">查询</button>
		</div>
		<div class="content">
			<!--合同基本信息 begin-->
			<div class="item">
				<h3>合同基本信息</h3>
				<ul class="item_ul clearfix">
					<li>
						<span class="tit">房源编号：</span>
						<span class="content">{{orderDetail.propertyVo.propertyNumber | blank}}</span>
					</li>
					<li>
						<span class="tit">收房产品：</span>
						<span class="content">{{orderDetail.houseTypeName | blank}}</span>
					</li>
					<li>
						<span class="tit">产品版本：</span>
						<span class="content">{{orderDetail.propertyVo.productRelease | blank }}</span>
					</li>
					<li style="width: 50%">
						<span class="tit">物业地址：</span>
						<span class="content">{{orderDetail.propertyVo.propertyAddress | blank }}</span>
					</li>
				</ul>
			</div>
			<!--合同基本信息 end-->

			<!--配置相关信息 begin-->
			<div class="item">
				<h3>配置相关信息</h3>
				<ul class="item_ul clearfix">
					<li style="width: 100%;padding-bottom:20px;">
						<span class="tit">配置项目：</span>
						<span class="content">
							<el-select filterable v-model="sortObj" value-key="sortId" placeholder="请选择" @change="selectSort">
								<el-option v-for="(item, index) in level2UsedTreeList" :key="item.sortId" :value="item" :label="item.sortName">
								</el-option>
							</el-select>
						</span>
					</li>
					<li>
						<span class="tit">配置类型：</span>
						<span class="content">{{orderDetail.deployTypeName | blank}}</span>
					</li>
					<li>
						<span class="tit">宽带是否首次安装：</span>
						<span class="content">{{isHavesArr[orderDetail.propertyVo.isInstall] | blank}}</span>
					</li>
					<li>
						<span class="tit">宽带是否集中办理：</span>
						<span class="content">{{isHavesArr[orderDetail.propertyVo.isUse] | blank }}</span>
					</li>
					<li>
						<span class="tit">是否有燃气：</span>
						<span class="content">{{isHavesArr[orderDetail.propertyVo.isGas] | blank }}</span>
					</li>
					<li style="width: 100%">
						<span class="tit">预计配置周期：</span>
						<span class="content">{{orderDetail.timeString | blank}}</span>
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
						<tr v-for="(room, index) in orderDetail.propertyVo.roomVos" :key="index">
							<td>{{room.sectionType + (room.bedroomNum?room.bedroomNum:'')}}</td>
							<td>{{room.houseStyle | blank}}</td>
							<td>{{room.houseArea ? room.houseArea + ' m²': '---'}}</td>
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
					<li v-for="(provider, index) in orderDetail.propertyVo.providerVos" :key="index">
						<span class="tit">{{provider.providerTypeName}}供应商：</span>
						<span class="content">{{provider.proName}}</span>
					</li>
				</ul>
			</div>
			<!--供应商选择 end-->
			<!-- 下单原因start -->
			<div class="item">
				<h3>下单原因</h3>
				<div class="reasonBox">
					<i class="name">理由原因：</i>
					<div class="inp-box">
						<el-input :class="{errorInp:remarkActive && getRemarkErrorMsg!==''}" @blur="exceedRemarkBlur" ref="exceedRemark" v-model="orderDetail.exceedRemark" placeholder="请输入（50字以内）"></el-input>
						<div class="errorBox" v-show="remarkActive">{{getRemarkErrorMsg}}</div>
					</div>
				</div>
			</div>
			<!-- 下单原因end -->
			<!-- 新建补充方案 -->
			<div v-if="additionalSortObj.pkId">
				<edit-table1 v-on:updateForm="listenUpdateForm" :parent-item="additionalSortObj" :update="update" :sort-id="additionalSortObj.pkId" :roomVos="roomVos" :roomOptions="roomOptions"></edit-table1>
				<div class="btnbar">
					<!-- <input type="button" value="保存配置方案" class="surebtn" @click="submit"> -->
          <el-button type="primary" :loading="buttonLoading" @click="submit">保存配置方案</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions } = createNamespacedHelpers('newOrder')
import EditTable1 from './parts/editTable.1.vue'
import { saveConfPlan } from '../../api/projectplan'
import debounce from 'lodash/debounce'
const isIntegrity = ele =>
  ele.sortId &&
  ele.goodsId &&
  ele.key &&
  !isNaN(ele.number) &&
  ele.number !== '' &&
  ele.number !== null &&
  ele.number !== undefined &&
  ele.functionType

const roomOptions = {
  detailsId: null,
  sortId: null,
  goodsId: null,
  number: null,
  priceSource: '管家单倍业绩',
  height: null,
  startDate: null,
  endDate: null,
  actualNum: null,
  key: 'disposition',
  actualHeight: null,
  pid: null,
  sortName: null,
  goodsName: null,
  unit: null,
  unitPrice: null
}
function isEmptyObject(e) {
  var t
  for (t in e) return !1
  return !0
}
export default {
  name: 'newOrder',
  components: {
    'edit-table1': EditTable1
  },
  data() {
    return {
      contractError: '',
      sortObj: {},
      isHavesArr: ['否', '是'],
      roomOptions: [{ ...roomOptions }],
      contractNumber: '',
      reason: '',
      additionalSortObj: {
        pkId: '',
        sortName: ''
      },
      formDate: [],
      remarkActive: false,
      buttonLoading: false,
      update: false // 子组件向上传递数据
    }
  },
  computed: {
    ...mapGetters({
      orderDetail: 'ordersPlanDetail'
    }),
    roomVos() {
      return this.orderDetail.propertyVo.roomVos.map(item => ({
        functionType: item.sectionType + item.bedroomNum,
        ...roomOptions
      }))
    },
    level2UsedTreeList() {
      return this.$store.getters.level2UsedTree.map(ele => ({
        sortId: ele.id,
        sortName: ele.sortName
      }))
    },
    getRemarkErrorMsg() {
      if (!this.orderDetail) {
        return ''
      }
      if (
        this.orderDetail.exceedRemark === '' ||
        this.orderDetail.exceedRemark === null
      ) {
        return '输入不能为空！'
      } else if (this.orderDetail.exceedRemark.length > 50) {
        return '输入不能超过50个字！'
      } else {
        return ''
      }
    }
  },
  methods: {
    ...mapActions(['getOrderDetail', 'updatePage']),
    selectSort(val) {
      const hasProvider = this.orderDetail.propertyVo.providerVos.some(
        provider => provider.classifyId === val.sortId
      )
      //判断是否为空对象
      const isEmpty = isEmptyObject(val)
      if (!hasProvider && !isEmpty) {
        this.$message.error(`该楼盘没有 ${val.sortName} 供应商，此分类下物品无效`)
      }
      if (!isEmpty) {
        this.listenAdditionalSortId(val)
      }
    },
    listenAdditionalSortId(val) {
      this.additionalSortObj.pkId = val.sortId
      this.additionalSortObj.sortName = val.sortName
    },
    orderQuery: debounce(function() {
      if (/^WH(\d{6}|\d{7}|\d{8})$/.test(this.contractNumber)) {
        this.contractError = ''
      } else {
        this.contractError = '请输入正确的收房合同号！'
        return
      }
      this.sortObj = {}
      this.remarkActive = false
      this.getOrderDetail(this.contractNumber)
    }, 300),
    keydownSearch() {
      this.orderQuery()
    },
    listenUpdateForm(val) {
      this.formDate.push(val)
      this.update = false
      let _putFn, mess
      _putFn = saveConfPlan
			mess = '生成'
			let sendDateLoading = this.$loading({ fullscreen: true, text: '提交中' })
      _putFn(
        this.getFormatFormDate(),
        d => {
          this.update = false
          this.$message.success(`订单生成成功`)
          this.$store.dispatch('itemArrRemove', {
            id: this.$route.name,
            to: {
              id: 'orderQuery',
              name: '订单查询',
              params: { updateId: new Date().getTime() }
            }
          })
        },
        d => {
          this.update = false
          this.$message.error(`订单生成失败`)
        }
      ).finally(_ => sendDateLoading.close())
    },
    submit: debounce(function() {
      this.remarkActive = true
      if (this.getRemarkErrorMsg !== '') {
        return
      }

      this.buttonLoading = true
      setTimeout(() => {
        this.buttonLoading = false
      }, 3000)

      this.update = true
      this.formDate = []
      setTimeout(() => {
        this.update = false
      })
    }, 300),
    getFormatFormDate() {
      const deployDetailsVos = this.formDate.map((sortItem, sortIndex) => ({
        pkId: sortItem.pkId,
        sortId: this.additionalSortObj.sortId || sortItem.sortId,
        deployId: sortItem.deployId,
        modify: true,
        deployParticularMap: {
          goods: sortItem.deployParticularMap.goods,
          rooms: sortItem.deployParticularMap.rooms
        }
      }))
      const {
        pkId,
        deployType,
        exceedRemark,
        contractNumber
      } = this.orderDetail
      return {
        pkId,
        deployType,
        exceedRemark,
        contractNumber,
        deployDetailsVos
      }
    },
    exceedRemarkBlur() {
      this.remarkActive = true
    }
  },
  created() {
    if (!this.level2UsedTree || this.level2UsedTree.length === 0) {
      this.$store.dispatch('getAllCategory')
    }
  },
  beforeMount() {
    this.updatePage()
  }
}
</script>

<style scoped>
/* create_content*/
.create_content {
  min-height: 100%;
  background-color: #fff;
}
.create_content .item .item_ul li {
  height: 40px;
  line-height: 40px;
  width: 25%;
  float: left;
}
.create_content .item .item_ul li .tit {
  color: #a3b2c6;
  padding-left: 35px;
}
.create_content .item .item_ul li .content {
  display: inline-block;
  color: #151515;
}
table.modtable > tr > td,
table.modtable > tr > th {
  text-align: center;
}
.topItem {
  height: 56px;
  line-height: 56px;
  margin-left: 30px;
  padding: 20px 0;
  border-bottom: 1px solid #f2f4f8;
}
.topItem button {
  margin-left: 20px;
}
.reasonBox {
  padding: 30px;
}
.reasonBox i.name {
  width: 95px;
}
.reasonBox .inp-box {
  display: inline-block;
  width: calc(100% - 100px);
  position: relative;
  padding-bottom: 20px;
}
.reasonBox .el-input {
  width: 100%;
}
.reasonBox .inp-box .errorBox {
  position: absolute;
  bottom: 3px;
  color: #ff4949;
}
.btn-wrap {
  padding-bottom: 45px;
  padding-top: 20px;
  text-align: center;
}
.inp-box {
  position: relative;
  display: inline-block;
}
.errorBox {
  color: #ff4949;
  position: absolute;
  line-height: 10px;
}
</style>

             