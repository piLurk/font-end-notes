<template>
	<div class="addPages">
		<el-form :model="formSend" :inline="true" ref="formSend" label-position="left" >
			<div class="info-part">
				<div class="info-part-inner">
					<h3>房间信息</h3>
                    <ul class="clearfix">
						<li>
							<el-form-item :label="宽带是否集中办理" :prop="'listRoomInfo['+i+'].theirHouse'" :rules="rules.needSel">
								<el-select filterable v-model="item.theirHouse" placeholder="请选择">
									<el-option v-for="(item,key) in isHaves"  :label="item.name" :value="item.name" :key="key"></el-option>
								</el-select>
							</el-form-item>
						</li>
                        <li>
							<el-form-item :label="宽带是否首次安装" :prop="'listRoomInfo['+i+'].theirHouse'" :rules="rules.needSel">
								<el-select filterable v-model="item.theirHouse" placeholder="请选择">
									<el-option v-for="(item,key) in isHaves"  :label="item.name" :value="item.name" :key="key"></el-option>
								</el-select>
							</el-form-item>
						</li>
					</ul>
					<div class="tableBox">
						<table class="modtable supplierTable" width="100%" border="0" cellpadding="0" cellspacing="0" >
							<thead>
								<tr>
									<th width="80">功能区间</th>
									<th>说明</th>
									<th>使用面积</th>
									<th>装修风格</th>
									<th>是否有暖气</th>
									<th>是否能装空调</th>
									<th>朝向</th>
									<th>是否有独卫</th>
									<th>独卫面积</th>
									<th>阳台类型</th>
									<th>阳台面积</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item , i) in formSend.listRoomInfo"  :key="i">
									<template v-if="item.sectionType==='卧室'">
										<td>{{item.sectionType+item.bedroomNum}}</td>
										<td>{{item.remark}}</td>
										<td>
											<el-form-item :prop="'listRoomInfo.'+i+'.houseArea'" :rules='rules.checkNum'>
												<el-input v-model.number="item.houseArea" placeholder="请输入">
													<template slot="append">m²</template>
												</el-input>
											</el-form-item>
										</td>
										<td>
											<el-form-item :prop="'listRoomInfo['+i+'].houseStyle'" :rules="rules.needSel">
												<el-select filterable class="warning" v-model="item.houseStyle" placeholder="请选择">
													<el-option v-for="(item,key) in houseStyles"  :label="item.name" :value="item.name" :key="key"></el-option>
												</el-select>
											</el-form-item>
										</td>
										<td>
											<el-form-item :prop="'listRoomInfo['+i+'].isHeating'" :rules="rules.needSel">
												<el-select filterable class="warning" v-model="item.isHeating" placeholder="请选择">
													<el-option v-for="(item,key) in isHaves"  :label="item.name" :value="item.value" :key="key"></el-option>
												</el-select>
											</el-form-item>
										</td>
										<td>
											<el-form-item :prop="'listRoomInfo['+i+'].isConditioner'" :rules="rules.needSel">
												<el-select filterable class="warning" v-model="item.isConditioner" placeholder="请选择">
													<el-option v-for="(item,key) in isHaves"  :label="item.name" :value="item.value" :key="key"></el-option>
												</el-select>
											</el-form-item>
										</td>
										<td>
											<el-form-item :prop="'listRoomInfo['+i+'].houseOrientation'" :rules="rules.needSel">
												<el-select filterable class="warning" v-model="item.houseOrientation" placeholder="请选择">
													<el-option v-for="(item,key) in houseOrientations"  :label="item.name" :value="item.name" :key="key"></el-option>
												</el-select>
											</el-form-item>
										</td>
										<td>
											<el-form-item :prop="'listRoomInfo['+i+'].isToilet'" :rules="rules.needSel">
												<el-select filterable class="warning" @change="item.toiletArea = item.isToilet===0?'':item.toiletArea" v-model="item.isToilet" placeholder="请选择">
													<el-option v-for="(item,key) in isHaves"   :label="item.name" :value="item.value" :key="key"></el-option>
												</el-select>
											</el-form-item>
										</td>
										<td>
											<template v-if="item.isToilet === 0">
												<el-form-item>
													<el-input :readonly="(pageState==='readOnly')" :disabled="true"   v-model.number="item.toiletArea" placeholder="请输入">
															<template slot="append">m²</template>
													</el-input>
												</el-form-item>
											</template>
											<template v-else>
												<el-form-item :prop="'listRoomInfo['+i+'].toiletArea'" :rules="rules.checkNum">
													<el-input :readonly="(pageState==='readOnly')" v-model.number="item.toiletArea" placeholder="请输入">
														<template slot="append">m²</template>
													</el-input>
												</el-form-item>
											</template>
											
										</td>
										<td>
											<el-form-item :prop="'listRoomInfo['+i+'].balconyType'" :rules="rules.needSel">
												<el-select filterable class="warning" v-model="item.balconyType" placeholder="请选择">
													<el-option v-for="(item,key) in balconyTypes"  :label="item.name" :value="item.name" :key="key"></el-option>
												</el-select>
											</el-form-item>
										</td>
										<td>
											<el-form-item :prop="'listRoomInfo['+i+'].balconyArea'" :rules="rules.checkNum">
												<el-input :readonly="(pageState==='readOnly')"  v-model.number="item.balconyArea" placeholder="请输入">
													<template slot="append">m²</template>
												</el-input>
											</el-form-item>
										</td>
									</template>
									<template v-else-if="item.sectionType!=='卫生间'">
										<td>{{item.sectionType+item.bedroomNum}}</td>
										<td>{{item.remark}}</td>
										<td>
											<el-form-item :prop="'listRoomInfo['+i+'].houseArea'"  :rules='rules.checkNum'>	
												<el-input v-model.number="item.houseArea" placeholder="请输入">
													<template slot="append">m²</template>
												</el-input>
											</el-form-item>
										</td>
									</template>
									<template v-else>
										<td>{{item.sectionType+item.bedroomNum}}</td>
										<td>
											<el-form-item :prop="'listRoomInfo['+i+'].remark'" :rules='rules.needSel'>
												<el-select filterable v-model="item.remark" placeholder="请选择">
													<el-option v-for="(item,key) in remarks"  :label="item.name" :value="item.name" :key="key"></el-option>
												</el-select>
											</el-form-item>
										</td>
										<td>
											<el-form-item :prop="'listRoomInfo['+i+'].houseArea'" :rules="rules.checkNum">	
												<el-input v-model.number="item.houseArea" placeholder="请输入">
													<template slot="append">m²</template>
												</el-input>
											</el-form-item>
										</td>
									</template>
								</tr>
							</tbody>            	
						</table>
					</div>
					<h3 v-if="formSend.listRoomInfo.length!==0" class="no_border">请选择独卫所属房间</h3>
					
					<ul class="clearfix">
						<li v-for="(item , i) in formSend.listRoomInfo" v-if="item.sectionType==='卫生间'" :key="i">
							<el-form-item :label="item.sectionType+item.bedroomNum+'所属房间'" :prop="'listRoomInfo['+i+'].theirHouse'" :rules="rules.needSel">
								<el-select filterable v-model="item.theirHouse" placeholder="请选择">
									<el-option v-for="(item,key) in theirHouses"  :label="item.name" :value="item.name" :key="key"></el-option>
								</el-select>
							</el-form-item>
						</li>
					</ul>
				</div>
			</div>
			<div class="info-part">
				<div class="info-part-inner">
					<h3>变更记录</h3>
					<div class="tableBox">
						<table class="modtable supplierTable" width="100%" border="0" cellpadding="0" cellspacing="0" >
							<thead>
								<tr>
									<th width="80">功能区间</th>
									<th>说明</th>
									<th>使用面积</th>
									<th>装修风格</th>
									<th>是否有暖气</th>
									<th>是否能装空调</th>
									<th>朝向</th>
									<th>是否有独卫</th>
									<th>独卫面积</th>
									<th>阳台类型</th>
									<th>阳台面积</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item , i) in formSend.listRoomInfo"  :key="i">
									<template v-if="item.sectionType==='卧室'">
										<td>{{item.sectionType+item.bedroomNum}}</td>
										<td>{{item.remark}}</td>
										<td>
											<el-form-item :prop="'listRoomInfo.'+i+'.houseArea'" :rules='rules.checkNum'>
												<el-input v-model.number="item.houseArea" placeholder="请输入">
													<template slot="append">m²</template>
												</el-input>
											</el-form-item>
										</td>
										<td>
											<el-form-item :prop="'listRoomInfo['+i+'].houseStyle'" :rules="rules.needSel">
												<el-select filterable class="warning" v-model="item.houseStyle" placeholder="请选择">
													<el-option v-for="(item,key) in houseStyles"  :label="item.name" :value="item.name" :key="key"></el-option>
												</el-select>
											</el-form-item>
										</td>
										<td>
											<el-form-item :prop="'listRoomInfo['+i+'].isHeating'" :rules="rules.needSel">
												<el-select filterable class="warning" v-model="item.isHeating" placeholder="请选择">
													<el-option v-for="(item,key) in isHaves"  :label="item.name" :value="item.value" :key="key"></el-option>
												</el-select>
											</el-form-item>
										</td>
										<td>
											<el-form-item :prop="'listRoomInfo['+i+'].isConditioner'" :rules="rules.needSel">
												<el-select filterable class="warning" v-model="item.isConditioner" placeholder="请选择">
													<el-option v-for="(item,key) in isHaves"  :label="item.name" :value="item.value" :key="key"></el-option>
												</el-select>
											</el-form-item>
										</td>
										<td>
											<el-form-item :prop="'listRoomInfo['+i+'].houseOrientation'" :rules="rules.needSel">
												<el-select filterable class="warning" v-model="item.houseOrientation" placeholder="请选择">
													<el-option v-for="(item,key) in houseOrientations"  :label="item.name" :value="item.name" :key="key"></el-option>
												</el-select>
											</el-form-item>
										</td>
										<td>
											<el-form-item :prop="'listRoomInfo['+i+'].isToilet'" :rules="rules.needSel">
												<el-select filterable class="warning" @change="item.toiletArea = item.isToilet===0?'':item.toiletArea" v-model="item.isToilet" placeholder="请选择">
													<el-option v-for="(item,key) in isHaves"   :label="item.name" :value="item.value" :key="key"></el-option>
												</el-select>
											</el-form-item>
										</td>
										<td>
											<template v-if="item.isToilet === 0">
												<el-form-item>
													<el-input :readonly="(pageState==='readOnly')" :disabled="true"   v-model.number="item.toiletArea" placeholder="请输入">
															<template slot="append">m²</template>
													</el-input>
												</el-form-item>
											</template>
											<template v-else>
												<el-form-item :prop="'listRoomInfo['+i+'].toiletArea'" :rules="rules.checkNum">
													<el-input :readonly="(pageState==='readOnly')" v-model.number="item.toiletArea" placeholder="请输入">
														<template slot="append">m²</template>
													</el-input>
												</el-form-item>
											</template>
											
										</td>
										<td>
											<el-form-item :prop="'listRoomInfo['+i+'].balconyType'" :rules="rules.needSel">
												<el-select filterable class="warning" v-model="item.balconyType" placeholder="请选择">
													<el-option v-for="(item,key) in balconyTypes"  :label="item.name" :value="item.name" :key="key"></el-option>
												</el-select>
											</el-form-item>
										</td>
										<td>
											<el-form-item :prop="'listRoomInfo['+i+'].balconyArea'" :rules="rules.checkNum">
												<el-input :readonly="(pageState==='readOnly')"  v-model.number="item.balconyArea" placeholder="请输入">
													<template slot="append">m²</template>
												</el-input>
											</el-form-item>
										</td>
									</template>
									<template v-else-if="item.sectionType!=='卫生间'">
										<td>{{item.sectionType+item.bedroomNum}}</td>
										<td>{{item.remark}}</td>
										<td>
											<el-form-item :prop="'listRoomInfo['+i+'].houseArea'"  :rules='rules.checkNum'>	
												<el-input v-model.number="item.houseArea" placeholder="请输入">
													<template slot="append">m²</template>
												</el-input>
											</el-form-item>
										</td>
									</template>
									<template v-else>
										<td>{{item.sectionType+item.bedroomNum}}</td>
										<td>
											<el-form-item :prop="'listRoomInfo['+i+'].remark'" :rules='rules.needSel'>
												<el-select filterable v-model="item.remark" placeholder="请选择">
													<el-option v-for="(item,key) in remarks"  :label="item.name" :value="item.name" :key="key"></el-option>
												</el-select>
											</el-form-item>
										</td>
										<td>
											<el-form-item :prop="'listRoomInfo['+i+'].houseArea'" :rules="rules.checkNum">	
												<el-input v-model.number="item.houseArea" placeholder="请输入">
													<template slot="append">m²</template>
												</el-input>
											</el-form-item>
										</td>
									</template>
								</tr>
							</tbody>            	
						</table>
					</div>
					
					
				</div>
			</div>
			<div class="btn-wrap">
				<button type="button" v-if="!(pageState==='readOnly') && (this.orderFlow >=4 || this.orderFlow===1)" @click="next('formSend','housePorperty')" class="btn btn-primary">保存并下一步</button>
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
const picType={
	photoType:2,	//照片类型
	photoSource:20,//功能区域
	index:1,	//照片序号
}
import {
  getHouseMsg_1,
  getHouseMsg_2,
  setHouseMsg_1,
  setHouseMsg_2,
} from "../../api/housemeasuremgmt";
function checkType(arr,type) {
	for(var i=0 ;i<arr.length;i++){
		if (arr[i]==type) {
			return true;
		}
	}
	return false;
}
	export default{
		name:'houseInfoEdit',
		props:['pkId','addPageId','pageState'],
		data(){
			var checkNum=(rule , value, cb) =>{
				if(!value){                                                                       `	`
					return cb(new Error('输入不能为空！'))
				}
				if(!/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value)){
					return cb(new Error('请输入大于0的数字值'))
				}else{
					cb();
				}
			};
			var checkImg=(rule,value,cb) =>{
				if(value.length===0){
					return cb(new Error('请上传图片'));
				}else{
					cb();
				}
			};
			var needSel=(rule,value,cb) =>{
				if(value===null || value ===''){
					return cb(new Error('请选择'))
				}else{
					cb();
				}
			}
			return {
				houseStyles:[{name:'可可',value:0},{name:'起司',value:1},{name:'原麦',value:2}],
				isHaves:[{name:'是',value:1},{name:'否',value:0}],
				houseOrientations:[{name:'东',value:0},{name:'南',value:1},{name:'西',value:2},{name:'北',value:3},{name:'东南',value:4},{name:'西北',value:5},{name:'东北',value:6},{name:'西南',value:7}],
				balconyTypes:[{name:'无',value:0},{name:'封闭式',value:1},{name:'开放式',value:2}],
				remarks:[{name:'独卫',value:0},{name:'小合用卫生间',value:1},{name:'大合用卫生间',value:2}],
				formSend:{
					orderPkId:'',
					listRoomInfo:[],
					propertyInfo:{
						isUse:'',
						isInstall:'',
						isGas:'',
						orientation:'',
						family:'',
					},
					listPhotoInfo:[],
				},
				rules:{
					checkNum:{validator:checkNum,trigger:'blur'},
					needSel:{validator:needSel,trigger:'change'},
					checkImg:{validator:checkImg}
				},
				picType:picType,
				dialogVisible:false,
				dialogImageUrl:'',

			}	
		},
		methods:{
			...mapActions([
				'getHouseMeasure'
			]),
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
			handleRemove(file, fileList) {
				this.picType.index--;
				for(let i=0;i<this.formSend.listPhotoInfo.length;i++){
					if(this.formSend.listPhotoInfo[i].url === file.url){
						this.formSend.listPhotoInfo.splice(i,1);
						break;
					}
				}
			},
			handlePreview(file) {
		        this.dialogImageUrl = file.url;
        		this.dialogVisible = true;
			},
			handleSuccess(res,file,fileList){

				var obj=JSON.parse(JSON.stringify(picType));
				delete obj['index'];
				obj['url']=res.data.url;
				this.formSend.listPhotoInfo.push(obj);
				this.picType.index+=1;
			},
			isToiletChange(item){
				if(item.istoilet === 0){
					item.toiletArea='';
				}
			},
			next(formName,componentName){
				this.$refs[formName].validate((valid) => {
					if(valid){
						alert(valid)
						var data=JSON.parse(JSON.stringify(this.formSend));
						for(let i =0;i<data.listPhotoInfo.length;i++){
							data.listPhotoInfo[i]['photoUrl']=data.listPhotoInfo[i]['url'];
							data.listPhotoInfo[i]['sort']=i+1;
							delete data.listPhotoInfo[i]['url'];
						}
						if(this.orderFlow<2){
							setHouseMsg_1(
								data,
								providers => {
									this.$message({type:'success',message: "房屋信息设置成功！"});
									this.getHouseMeasure(this.pkId);
									this.$emit('next',componentName);
								},
								() => this.$message({ type: "error", message: "房屋信息设置失败！" })
							);
						}else{
							setHouseMsg_2(
								data,
								providers => {
									this.$message({type:'success',message: "房屋信息修改成功！"});
									this.$emit('next',componentName);
								},
								() => this.$message({ type: "error", message: "房屋信息修改失败！" })
							);
						}
						
					}else{
						return false;
					}
				})
			},
		},
		computed:{
			...mapGetters([
				'orderFlow'
			]),
			theirHouses:function(){
				var arr=[];
				if(this.formSend.listRoomInfo === undefined){
					return arr;
				}
				for(let i=0;i<this.formSend.listRoomInfo.length;i++){
					if(this.formSend.listRoomInfo[i].sectionType==='卧室'){
						var name=this.formSend.listRoomInfo[i].sectionType+this.formSend.listRoomInfo[i].bedroomNum;
						arr.push({name:name,value:i});
					}
				}
				return arr;
			},
		},
		created:function(){
			// this.pageId='personInfo'+this.currentViewId;
		},
		beforeMount:function(){
			
			this.formSend.orderPkId=this.pkId;
			if(this.orderFlow<2){
				//配置系统没有录入，从业务系统里取
				getHouseMsg_1(
					this.pkId,
					providers => {
						this.formSend.listRoomInfo=providers.roomVos;
						this.formSend.propertyInfo.family=providers.family;
						 	
					},
					() => this.$message({ type: "error", message: "房屋信息获取失败！" })
				)
			}else{
				//从配置系统里取数据
				getHouseMsg_2(
					this.pkId,
					providers => {
						for(let i of providers.RoomVo){
							this.formSend.listRoomInfo.push(i);
						}
						this.formSend.propertyInfo=providers.PropertyInfo;
						for(let i of providers.URL){
							let obj={
								photoType:2,	//照片类型
								photoSource:20,//功能区域
								url:i
							}
							this.formSend.listPhotoInfo.push(obj);
						}      		
						this.picType.index=providers.URL.length+1;
					},
					() => this.$message({ type: "error", message: "房屋信息获取失败！" })
				)
			}
	
			
		},
		
		
	}

</script>

<style type="text/css" scoped>
	.tableBox{padding: 15px 24px;box-sizing: border-box;}
	.addPages .info-part{
		background-color: #f2f4f8;
	}

	.addPages .info-part h3.no_border{border-left: none;padding-left: 24px;}
	.addPages .info-part ul.long li{
		min-width:400px;
	}
	.addPages .info-part ul li p.name{
		color:#576578;
	}
</style>
<style type="text/css">
	.inp-box input.error{
		border-color: red;
		box-shadow: 0 0 3px 0 rgba(255,0,0,0.8);
	}
	.inp-box input.error:hover{
		border-color: red;
	}
</style>
