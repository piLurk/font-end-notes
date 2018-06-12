<template>
	<div id="addOrder">
		<div class="searchfilter col4">
			<ul class="clearfix">
				<li>
					<p class="name">房源编号：</p>
					<div class="inpbox"><input type="text" @keydown.enter="keydownSearch" v-model.trim="baseNumber" placeholder="请输入" class="inp" /></div>
				</li>
        <li class="btnbox singlerow">
            <input type="button" class="surebtn" @click="orderQuery" value="查询" />
        </li>
			</ul>
		</div>
		<!--数据列表 begin-->
		<div class="dataBox">
			<div class="addBox">
				<div class="left_part">
					<el-button  :disabled="!(halfCheck || allCheck)" @click="addPeriod" type="primary">批量补单</el-button>
					<span class="tip">已选择<i>{{selectNum}}</i>条</span>	
				</div>
						
			</div>
			<div class="tableBox">
				<table class="modtable tableLoading addOrderLoading">
					<thead>
						<tr>
							<th width="40"><i :class="{checkinp:true,halfcheckbox:halfCheck,checkedbox:allCheck,}" @click="selectAll"></i></th>
							<th>订单类型</th>
							<th>合同编号</th>
							<th>物业地址</th>
							<th>房源编号</th>
							<th>相关房间</th>
							<th>合同生效日</th>
							<th>订单管家</th>
							<th>订单配置</th>
              <th>操作</th>
						</tr>
					</thead>
					<tbody>
						<template class="modtable" v-for="(item,i) in dataList">
								<tr>
									<td><i :class="{checkinp:true,checkedbox:item.checked}" @click="checkFun(item)"></i></td>
									<td>{{item.orderTypeName | blank}}</td>
									<td>{{item.contractNumber | blank}}</td>
									<td>{{(item.housingBaseMo && item.housingBaseMo.propertyAddress) || '---' }}</td>
									<td>{{(item.housingBaseMo && item.housingBaseMo.housingNumber) || '---'}}</td>
									<td>{{item.relatedRoom | blank}}</td>
									<td>{{(item.housePactMo && item.housePactMo.contractDate) | toDate}}</td>
									<td>{{item.orderSteward | blank}}</td>
                  <td>{{item.orderDeploy | blank}}</td>
									<td>
										<p class="typeControl">
											<a href="javascript:void(0)" @click="addSingle(item)" class="s-btn"><i></i>补单</a>
										</p>
									</td>
								</tr>
		                </template>
					  </tbody>	
                </table>
			</div>
		</div>
		<!--数据列表 end-->
		
		
	</div>
</template>
<script type="text/javascript">

import {
  getMissOrderList,
  addMissOrder
} from "../../api/ordermgmt";
import debounce from 'lodash/debounce'


export default {
	name:'addOrder',
	data(){
		return{
      baseNumber:'',
      _baseNumber:'',
			dataList:[],
	    pagination:{
        total:null,//数据总条数
        curr:1,//当前索引
        pageSize:10//每页显示条数
			},
	    dialogFormVisible: false,//补充工期窗口初始隐藏
			dialogState:'', //弹窗入口  singleDo单个补充,allDo批量补充
			contractNumber:'',//单个补充的contractNumber    
		}
	},
	methods:{
		checkFun(item){
			item.checked=!item.checked;
		},
		selectAll(){
			if(this.allCheck || this.halfCheck){
				//全选或者部分选
				for(let i of this.dataList){
					i['checked']=false;
				}
			}else{
				for(let i of this.dataList){
					i['checked']=true;
				}
			}
		},
		addPeriod(){
			this.dialogState = 'allDo';
			if(this.halfCheck || this.allCheck){
				this.confirmDia()
			}
		},
		addSingle(item){
      this.dialogState = 'singleDo';
			this.contractNumber=item.contractNumber;
      this.confirmDia()
		},
    confirmDia(){
      this.$confirm('确认补单', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then( () => {
          this.saveOutReason()
        })
    },
    getData(){
      var dataArr=[];
      if(this.dialogState === 'singleDo'){
        dataArr.push(this.contractNumber)
				return dataArr
      }
      
      for(let i of this.dataList){
        if(i.checked){
          dataArr.push(i.contractNumber)
        }
      }
      return dataArr
    },
		saveOutReason(){
      var data = this.getData();
      
      addMissOrder(
        data,
        providers => {
          this.$message({ type: "success", message: "补单成功！" });
          this.paginationReq();
        },
        () => this.$message({ type: "error", message: "补单失败！" })
      )	
		},
		paginationReq(){
			var that=this;
			this.$store.commit('SET_LOADING',{target:"addOrderLoading",state:true},{root:true});
			getMissOrderList(
				{
					baseNumber:this._baseNumber,
					limit:this.pagination.pageSize,
					pageNum:this.pagination.curr
				},
				data => {
					if(data === null){
						return
					}
					for(let i of data){
						i['checked']=false;
					}
					this.dataList=data;
					
				},
				() => {
					this.$message({ type: "error", message: "订单列表获取失败！" })
				}
			).finally(
				() => {
					this.$store.commit('SET_LOADING',{target:"addOrderLoading",state:false},{root:true});
				}
			)
		},
		pageGo(curr){
			if(this.pagination.curr === curr){
				return
			}
			this.pagination.curr=curr;
			this.paginationReq();
		},
		orderQuery:debounce(function(){
      // if ( !/^WH(\d{6}|\d{7}|\d{8})$/.test(this.contractNumber)) {
      //   this.$message.error('请输入正确的房源编号！')
      //   return
      // }
			this.pagination.curr=1;
      this._baseNumber = this.baseNumber;
			this.paginationReq();
		},300),
		pageChange(componentName,currentViewId,personId,permission){
			var obj={component:componentName,id:currentViewId,personId:personId};
			if (!!permission && permission==='readOnly') {
				obj['readOnly']=true;
			}else{
				obj['readOnly']=false;
			}
			this.$store.dispatch('itemArrAdd',obj);		
		},
		keydownSearch(){
			this.orderQuery();
		}
	},
	computed: {
		halfCheck(){
			if(this.selectNum === this.dataList.length || this.selectNum === 0){
				return false;
			}else{
				return true;
			}
		},
		selectNum(){
			var checkNum=0;
			for(let i of this.dataList){
				if(i.checked === true){
					checkNum++;
				}
			}
			return checkNum;
		},
		allCheck(){
			if(this.selectNum === this.dataList.length && this.selectNum!==0){
				return true
			}else{
				return false
			}
		}
	}
}
</script>

<style type="text/css" scoped>
	.dataBox .addBox{
		position: relative;
		margin-bottom:5px;
	}
	.dataBox .addBox .left_part{
		top:0px;
	}
	.dataBox .addBox .left_part .tip{
		padding-left: 25px;
		color: #999;
	}
	.dataBox .addBox .left_part .tip i{
		color: #3ba0ff;
		padding: 0 3px;
	}
	.modtable tr.active td{
		background-color: #3ba0ff;
		color: #fff;
	}

	.modtable tr > td:first-child, .modtable tr > th:first-child{padding: 0}
	.modtable tr.father>td.arrowTd{
		width: 40px;
	}
	.modtable tr.father td.separateTd a{color:#d1d1d1;}
	.modtable tr.father:hover td.separateTd .editSpan a{color:#3ba0ff; }
	.modtable tr.father:hover td.separateTd .changeSpan a{color:#0fd38a; }
	.modtable tr.father:hover td.separateTd .quitSpan a{color:#f6732b; }
	.modtable tr.father:hover td.separateTd .numberSpan a{color:#3ba0ff;}

	.modtable tr.father td.separateTd span:not(:last-child){
		margin-right: 8px;
	}

	.modtable tr.father+tr{
		display: none;
	}
	.modtable tr.father+tr>td{
		width: 100%;
		position: relative;
		top:-1px;
	}
	.modtable tr.father+tr>td table{
		border-collapse: collapse;
		width: 100%;
	}
	.modtable tr.father+tr>td table th{
		background-color: #ecf4ff;
		color: #a3b2c6;
	}
	.modtable tr.father.active+tr{
		display:table-row;
	}

	.modtable tr.father.active+tr>td{
		box-sizing: border-box;
	}
	.modtable tr.father.active+tr>td .table-inner{
		border:2px solid #3ba0ff;
		border-top: 0;
		margin-bottom: 3px;
	}
	.modtable tr.active td:last-child{
		display: table-cell;
	}
</style>