<template>
	<div class="addPages housePorperty">
		<el-form :model="formSend" :inline="true" ref="formSend" label-position="left" >
			<div class="info-part">
				<div class="info-part-inner">
					<h3>物品</h3>
					<div class="tableBox">
							<table class="modtable supplierTable" width="100%" border="0" cellpadding="0" cellspacing="0" >
								<thead>
									<tr>
										<th>物品名称</th>
										<th>品牌名称</th>
										<th>数量</th>
										<th>新旧程度</th>
										<th>使用状态</th>
										<th>备注</th>
										<th>核对</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(item,i) in formSend.listGoodsDeliveryInfo" v-if="item.type===1" :key="i">
										<td>{{item.itemName | blank}}</td>
										<td>{{item.itemBrand | blank}}</td>
										<td>{{item.itemNum | blank}}</td>
										<td>{{item.consumeLevel | blank}}</td>
										<td>{{useStatus[item.useStatus] | blank}}</td>
										<td>{{item.remark | blank}}</td>
										<td>
											<el-form-item
												:prop="'listGoodsDeliveryInfo.'+i+'.state'"
												:rules="rules.needSel">	
												<el-radio-group :disabled="readonly" v-model="item.state">
													<el-radio :label="0">有误</el-radio>
													<el-radio :label="1">确认</el-radio>
												</el-radio-group>
											</el-form-item>
											
										</td>
									</tr>
								</tbody>                  	
							</table>
					</div>
				</div>
			</div>
			<div class="info-part">
				<div class="info-part-inner">
					<h3>业主弃用物品</h3>
					<div class="tableBox">
							<table class="modtable supplierTable" width="100%" border="0" cellpadding="0" cellspacing="0" >
								<thead>
									<tr>
										<th>物品名称</th>
										<th>品牌名称</th>
										<th>数量</th>
										<th>新旧程度</th>
										<th>使用状态</th>
										<th>备注</th>
										<th>处理方式</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(item,i) in formSend.listGoodsDeliveryInfo" v-if="item.type===0" :key="i">
										<td>{{item.itemName | blank}}</td>
										<td>{{item.itemBrand | blank}}</td>
										<td>{{item.itemNum | blank}}</td>
										<td>{{item.consumeLevel | blank}}</td>
										<td>{{useStatus[item.useStatus] | blank}}</td>
										<td>{{item.remark | blank}}</td>
										<td>
											<el-form-item
										:prop="'listGoodsDeliveryInfo.'+i+'.state'"
										:rules="rules.needSel">
											<el-radio-group :disabled="readonly" v-model="item.state">
												<el-radio :label="0">弃用</el-radio>
												<el-radio :label="1">留用</el-radio>
											</el-radio-group>
											
											</el-form-item>
										</td>
									</tr>
								</tbody>                  	
							</table>
					</div>
				</div>
			</div>
			<div class="info-part">
				<div class="info-part-inner">
					<h3>生活费用信息</h3>
					<div class="tableBox">
							<table class="modtable supplierTable" width="100%" border="0" cellpadding="0" cellspacing="0" >
								<thead>
									<tr>
										<th>项目</th>
										<th>单价</th>
										<th>是否预付费</th>
										<th>表底示数</th>
										<th>卡显示余额</th>
										<th>是否结清</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(item,i) in formSend.listLifeCostInfo" :key="i">
										<td>{{item.name}}</td>
										<td>{{item.price+costUnit[item.name]}}</td>
										<td>
											<el-form-item>
												<el-select :disabled="readonly" size="small" style="width: 150px" v-model="item.isPrepay" placeholder="请选择">
													<el-option v-for="item in isHaves" :key="item.value" :label="item.name" :value="item.value">
													</el-option>
												</el-select>
											</el-form-item>
										</td>
										<td>
											<el-form-item :prop="'listLifeCostInfo['+i+'].tableNum'" :rules="rules.checkNum">
												<el-input :readonly="readonly" style="width: 150px" v-model="item.tableNum" placeholder="请输入">
													<template slot="append">{{getUnit(item.name)}}</template>
												</el-input>
											</el-form-item>
										</td>
										<td>
											<el-form-item :prop="'listLifeCostInfo['+i+'].cardBalance'" :rules="rules.checkNum">
												<el-input :readonly="readonly" style="width: 150px" v-model="item.cardBalance" placeholder="请输入">
													<template slot="append">元</template>
												</el-input>
											</el-form-item>
										</td>
										<td>
											<el-form-item>
												<el-select :disabled="readonly" size="small" style="width: 150px" v-model="item.state" placeholder="请选择">
													<el-option v-for="item in isHaves" :key="item.value" :label="item.name" :value="item.value">
													</el-option>
												</el-select>
											</el-form-item>
										</td>
									</tr>
								</tbody>                  	
							</table>
					</div>
				</div>
			</div>
			<ul class="file-ul">
				<li>
					<h3>电表照片<p  class="tip">非必传项，最多传3张</p></h3>
					<ul class="clearfix">
						<div class="item-box ele">
							<el-form-item prop="listPhotoInfo.ele" :rules="rules.checkImg">
								<el-upload :with-credentials="true" 
									:disabled="readonly"
									:file-list="formSend.listPhotoInfo.ele"
									limit="3"
									:before-upload="beforeUploadImage"
									:data="picType_ele" 
									list-type="picture-card" class="upload-demo" 
									:action="host+'/pic/upload?access_token='+token"
									:on-success="handleSuccess_1"
									:on-error="handleError"
									:on-preview="handlePreview"
									:on-remove="handleRemove_1">
								<i class="el-icon-plus"></i>
								</el-upload>
							</el-form-item>				
						</div>
						<li>
						</li>
					</ul>
				</li>
				<li>
					<h3>水表照片<p  class="tip">非必传项，最多传3张</p></h3>
					<ul class="clearfix">
						<div class="item-box water">
							<el-form-item prop="listPhotoInfo.water" :rules="rules.checkImg">
								<el-upload :with-credentials="true"
									:disabled="readonly"
									:file-list="formSend.listPhotoInfo.water"
									:before-upload="beforeUploadImage"
									:data="picType_water"
									list-type="picture-card"
									class="upload-demo" 
									:action="host+'/pic/upload?access_token='+token"
									:on-success="handleSuccess_2"
									:on-error="handleError"
									:on-preview="handlePreview"
									:on-remove="handleRemove_2">
								<i class="el-icon-plus"></i>
								</el-upload>
							</el-form-item>				
						</div>
						<li>
						</li>
					</ul>
				</li>
				<li>
					<h3>燃气照片<p  class="tip">非必传项，最多传3张</p></h3>
					<ul class="clearfix">
						<div class="item-box gas">
							<el-form-item prop="listPhotoInfo.gas" :rules="rules.checkImg">
								<el-upload 
									:with-credentials="true"
									:disabled="readonly"
									:file-list="formSend.listPhotoInfo.gas"
									:before-upload="beforeUploadImage"
									:data="picType_gas"
									list-type="picture-card" class="upload-demo"
									:action="host+'/pic/upload?access_token='+token"
									:on-success="handleSuccess_3"
									:on-error="handleError"
									:on-preview="handlePreview"
									:on-remove="handleRemove_3">
								<i class="el-icon-plus"></i>
								</el-upload>
							</el-form-item>				
						</div>
						<li>
						</li>
					</ul>
				</li>
			</ul>
			<div class="btn-wrap">
				<button type="button" v-if="!readonly && (this.orderFlow >=4 || this.orderFlow===2)" @click="next('formSend','housePic')" class="btn btn-primary">确认</button>
			</div>
		</el-form>
		<el-dialog v-model="dialogVisible" size="tiny">
	  		<img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
	</div>
</template>
<script type="text/javascript">
import { createNamespacedHelpers } from 'vuex';
const { mapGetters, mapActions } = createNamespacedHelpers('measureAdd');
import {
  getHouseProperty_1,
  getHouseProperty_2,
  setHouseProperty_1,
  setHouseProperty_2,
} from "../../api/housemeasuremgmt";
const photoState=0;
let eleObj={
	photoType:2,	//照片类型
	photoSource:21,//功能区域
	index:1,
}
let waterObj={
	photoType:2,	//照片类型
	photoSource:22,//功能区域
	index:1,
}
let gasObj={
	photoType:2,	//照片类型
	photoSource:23,//功能区域
	index:1,
}
function checkType(arr,type) {
	for(var i=0 ;i<arr.length;i++){
		if (arr[i]==type) {
			return true;
		}
	}
	return false;
}
const unitObj={'水':'吨','电':'度','燃气':'m³'}
const form ={
	orderPkId:'',
	listGoodsDeliveryInfo:[],
	listLifeCostInfo:[
		
	],
	listPhotoInfo:{
		ele:[],
		water:[],
		gas:[]
	}
}
export default{
		name:'housePorperty',
		props:['pkId','addPageId','readonly','orderFlow'],
		data(){
			var checkNum=(rule , value, cb) =>{
				if(value === '' || value === null){
					cb();
				}
				if(!/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value)){
					cb(new Error('输入值只能为非负数！'))
				}else{
					cb();
				}
			};
			var checkImg=(rule,value,cb) =>{
				if(value.length===0){
					return cb();
				}else if(value.length > 3){
					return cb(new Error('最多上传三张图片'));
				}else{
					cb();
				}
			};
			return{
				pageId:'',
				useStatus:{'0':'不使用','1':'正常'},
				costUnit:{'电':'元/度','水':'元/吨','燃气':'元/m³'},
				isHaves:[{name:'是',value:0},{name:'否',value:1}],
				dialogImageUrl: '',
				dialogVisible: false,
				formSend:JSON.parse(JSON.stringify(form)),
				rules:{
					checkImg:{validator:checkImg},
					needSel:[{required:true,message:'请选择'}],
					checkNum:{validator:checkNum,trigger:'blur,change'},
				},
				picType_ele:eleObj,
				picType_water:waterObj,
				picType_gas:gasObj,
			}
		},
		methods:{
			...mapActions([
				'getHouseMeasure'
			]),
			getUnit(name){
				return unitObj[name];
			},
			handlePreview(file) {
					this.dialogImageUrl = file.url;
					this.dialogVisible = true;
			},
			handleError(){
				this.$message.error('上传图片失败！');
			},
			resErrorHandle(file,fileList){
				this.$message.error('图片上传失败！')
					var index = fileList.findIndex( (ele) =>{
						return file.uid === ele.uid;
					} )
					fileList.splice(index,1)
			},
			handleSuccess_1(res,file,fileList){
				if(res.code !== 200){
					this.resErrorHandle(file,fileList);
				}else{
					var obj=JSON.parse(JSON.stringify(this.picType_ele));
					obj['url']=res.data.url;
					this.formSend.listPhotoInfo.ele.push(obj);
					this.picType_ele.index+=1;	
				}
			},
			handleRemove_1(file, fileList) {
				this.picType_ele.index--;
				var arr=this.formSend.listPhotoInfo.ele;
				for(let i=0;i<arr.length;i++){
					if(arr[i].url === file.url){
						arr.splice(i,1);
						break;
					}
				}
			},
			handleSuccess_2(res,file,fileList){
				if(res.code !== 200){
					this.resErrorHandle(file,fileList);
				}else{
					var obj=JSON.parse(JSON.stringify(this.picType_water));
					obj['url']=res.data.url;
					this.formSend.listPhotoInfo.water.push(obj);
					this.picType_water.index+=1;
				}
			},
			handleRemove_2(file, fileList) {
				this.picType_water.index--;
				var arr=this.formSend.listPhotoInfo.water;
				for(let i=0;i<arr.length;i++){
					if(arr[i].url === file.url){
						arr.splice(i,1);
						break;
					}
				}
			},
			handleSuccess_3(res,file,fileList){
				if(res.code !== 200){
					this.resErrorHandle(file,fileList);
				}else{
					var obj=JSON.parse(JSON.stringify(this.picType_gas));
					obj['url']=res.data.url;
					this.formSend.listPhotoInfo.gas.push(obj);
					this.picType_gas.index+=1;	
				}
			},
			handleRemove_3(file, fileList) {
				this.picType_gas.index--;
				var arr=this.formSend.listPhotoInfo.gas;
				for(let i=0;i<arr.length;i++){
					if(arr[i].url === file.url){
						arr.splice(i,1);
						break;
					}
				}
			},
			beforeUploadImage(file) {
					const isImage = checkType(['image/jpeg','image/bmp','image/png'],file.type);
					const isLt10M = file.size / 1024 / 1024 < 10;
					if (!isImage) {
						
						this.$message.error('上传文件只能是指定格式!')
					}
					if (!isLt10M) {
						this.$message.error('上传文件大小不能超过 10MB!');
					}
					return isImage && isLt10M;
			},
			get_1(){
				//配置系统没有录入，从业务系统里取
				getHouseProperty_1(
					this.pkId,
					providers => {
						this.formSend.listGoodsDeliveryInfo=providers.goodsDeliveryInfo;
						var state=photoState;
						this.formSend.listLifeCostInfo=providers.lifeCostInfo;
					},
					(message) => this.$message({ type: "error", message:"房屋信息获取失败！" })
				)
			},
			get_2(){
				//从配置系统里取数据
				getHouseProperty_2(
					this.pkId,
					providers => {
						this.formSend.listGoodsDeliveryInfo=providers.GoodsDeliveryInfo;
						var state=photoState;
						this.formSend.listLifeCostInfo=providers.LifeCostInfo;
						for(let i of providers.DUrl){
							let obj={
								photoType:2,	//照片类型
								photoSource:21,//功能区域
								state:state,
								url:i
							}
							this.formSend.listPhotoInfo.ele.push(obj);
						}
						for(let i of providers.SUrl){
							let obj={
								photoType:2,	//照片类型
								photoSource:22,//功能区域
								state:state,
								url:i
							}
							this.formSend.listPhotoInfo.water.push(obj);
						} 
						for(let i of providers.RUrl){
							let obj={
								photoType:2,	//照片类型
								photoSource:23,//功能区域
								state:state,
								url:i
							}
							this.formSend.listPhotoInfo.gas.push(obj);
						} 
						this.picType_ele.index=providers.DUrl.length+1;
						this.picType_water.index=providers.SUrl.length+1;
						this.picType_gas.index=providers.RUrl.length+1;
						
					},
					(message) => this.$message({ type: "error", message:"房屋信息获取失败！" })
				)
			},
			next(formName,componentName){
				
				this.$refs[formName].validate((valid) => {
					
					if(valid){
						var data=JSON.parse(JSON.stringify(this.formSend));
						data.listPhotoInfo=data.listPhotoInfo.ele.concat(data.listPhotoInfo.water,data.listPhotoInfo.gas);
						var arr=data.listPhotoInfo;
						var flag_1=1,flag_2=1,flag_3=1;
						for(let i =0;i<arr.length;i++){
							delete arr[i]['index'];
							arr[i]['photoUrl']=arr[i]['url'];
							if(arr[i].photoSource===21){
								arr[i]['sort']=flag_1;
								flag_1++;	
							}else if(arr[i].photoSource===22){
								arr[i]['sort']=flag_2;
								flag_2++;
							}else if(arr[i].photoSource===23){
								arr[i]['sort']=flag_3;
								flag_3++;
							}
							delete arr[i]['url'];
						}
						if(this.orderFlow<3){
							setHouseProperty_1(
								data,
								providers => {
									this.$message({type:'success',message: "房屋信息设置成功！"});
									this.getHouseMeasure(this.pkId);
									this.$emit('next',componentName);
								},
								(message) => this.$message({ type: "error", message:"房屋信息设置失败！" })
							);
						}else{
							setHouseProperty_2(
								data,
								providers => {
									this.$message({type:'success',message: "房屋信息编辑成功！"});
									this.$emit('next',componentName);
								},
								(message) => this.$message({ type: "error", message:"房屋信息编辑失败！" })
							);
						}
						
					}else{
						return false;
					}
				})
			},
		},
		activated(){
			if(this.pageId !==this.addPageId){
				if(!!this.$refs['formSend']){
					this.$refs['formSend'].resetFields();
				}
				this.formSend=JSON.parse(JSON.stringify(form));
				this.formSend.orderPkId=this.pkId;
				if(this.orderFlow<3){
					this.get_1();
				}else{
					this.get_2();
				}
				this.pageId=this.addPageId;
			}
		}
	}
</script>
<style type="text/css" scoped>
	.addPages .info-part{
		background-color: #f2f4f8;
	}
</style>
<style type="text/css">
	.tableBox{padding: 15px 24px;box-sizing: border-box;}
	 .file-ul .tip{
		font-size: 12px;
		color: #8391a5;
		margin-top: 7px;
		display: inline-block;
		font-weight: normal;
		padding-left: 20px;
	}
	 .file-ul{padding-bottom: 50px;}
	 .file-ul .item-box{padding-left: 20px;padding-bottom: 30px;}
	 .file-ul>li{padding-top: 25px;}
	 .file-ul h3{border-left: 3px solid #4db3ff;padding-left: 30px;margin-bottom: 25px;color: #333;}
	 .file-ul>li.file .el-upload-list>li{
		display: inline-block;
		width: 105px;
		padding: 0 10px;
		margin-top: 15px;
		vertical-align: top;
	}
	 .file-ul>li.file .el-upload-list>li a.el-upload-list__item-name{
		width: 80px;
		height: 125px;
		box-sizing: border-box;
		background: url(/static/images/file.png) no-repeat;
		background-size: contain;
		padding-top: 95px;
	}
	 .file-ul>li.file .el-icon-close{
		top:0;
		right: 10px;
	}
	 .file-ul>li.file .el-upload-list__item-status-label{
		top:-6px;
		right: 10px
	}
	 .file-ul>li.file .el-icon-document{
		display: none;
	}
	 .file-ul>li.file .el-upload-list__item:hover{
		background-color: #fff;
	}
	 .file-ul>li.file .el-upload-list__item.is-success .el-upload-list__item-name:hover{

	}
	 .btn-wrap{
		text-align: center;
		margin-bottom: 45px;
	}
	 .el-upload-list--picture-card .download{
		position: absolute;
		bottom: 0px;
		left: 5px;
		z-index: 10000;
	}
</style>
<style type="text/css">
	.el-upload-list__item .el-progress{
		display: none !important;
	}
</style>