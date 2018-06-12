<template>
	<div class="addPages">
		<el-form :model="formSend" :inline="true" ref="formSend" label-position="left" >
			<div class="info-part">
				<div class="info-part-inner">
					<h3>房间信息</h3>
					<div class="tableBox">
						<table class="modtable supplierTable">
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
												<el-input :readonly="readonly" v-model="item.houseArea" placeholder="请输入">
													<template slot="append">m²</template>
												</el-input>
											</el-form-item>
										</td>
										<td>
											<el-form-item :prop="'listRoomInfo['+i+'].houseStyle'" :rules="rules.needSel">
												<el-select :disabled="readonly" v-model="item.houseStyle" placeholder="请选择">
													<el-option v-for="(item,key) in houseStyles"  :label="item.name" :value="item.name" :key="key"></el-option>
												</el-select>
											</el-form-item>
										</td>
										<td>
											<el-form-item :prop="'listRoomInfo['+i+'].isHeating'" :rules="rules.needSel">
												<el-select :disabled="readonly" v-model="item.isHeating" placeholder="请选择">
													<el-option v-for="(item,key) in isHaves"  :label="item.name" :value="item.value" :key="key"></el-option>
												</el-select>
											</el-form-item>
										</td>
										<td>
											<el-form-item :prop="'listRoomInfo['+i+'].isConditioner'" :rules="rules.needSel">
												<el-select :disabled="readonly" v-model="item.isConditioner" placeholder="请选择">
													<el-option v-for="(item,key) in isHaves"  :label="item.name" :value="item.value" :key="key"></el-option>
												</el-select>
											</el-form-item>
										</td>
										<td>
											<el-form-item :prop="'listRoomInfo['+i+'].houseOrientation'" :rules="rules.needSel">
												<el-select :disabled="readonly" v-model="item.houseOrientation" placeholder="请选择">
													<el-option v-for="(item,key) in houseOrientations"  :label="item.name" :value="item.name" :key="key"></el-option>
												</el-select>
											</el-form-item>
										</td>
										<td>
											<el-form-item :prop="'listRoomInfo['+i+'].isToilet'" :rules="rules.needSel">
												<el-select :disabled="readonly" 
													@change="itemIsToiletChange(item)" v-model="item.isToilet" placeholder="请选择">
													<el-option v-for="(item,key) in isHaves"   :label="item.name" :value="item.value" :key="key"></el-option>
												</el-select>
											</el-form-item>
										</td>
										<td>
											<el-form-item :prop="'listRoomInfo['+i+'].toiletArea'" :rules="item.isToilet === 0?rules.noCheck:rules.checkNum">
												<el-input :disabled="item.isToilet === 0" :readonly="readonly" v-model="item.toiletArea" placeholder="请输入">
													<template slot="append">m²</template>
												</el-input>
											</el-form-item>
										</td>
										<td>
											<el-form-item :prop="'listRoomInfo['+i+'].balconyType'" :rules='rules.needSel'>
												<el-select :disabled="readonly" v-model="item.balconyType" 
													@change="itemBalconyTypeChange(item)" placeholder="请选择">
													<el-option v-for="(item,key) in balconyTypes"  :label="item.name" :value="item.name" :key="key"></el-option>
												</el-select>
											</el-form-item>
										</td>
										<td>
											<el-form-item :prop="'listRoomInfo['+i+'].balconyArea'" :rules="item.balconyType === '无'?rules.noCheck:rules.checkNum">
												<el-input :readonly="readonly" :disabled="item.balconyType === '无'"  v-model="item.balconyArea" placeholder="请输入">
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
												<el-input :readonly="readonly" v-model="item.houseArea" placeholder="请输入">
													<template slot="append">m²</template>
												</el-input>
											</el-form-item>
										</td>
										<td colspan="8"></td>
									</template>
									<template v-else>
										<td>{{item.sectionType+item.bedroomNum}}</td>
										<td>
											<el-form-item :prop="'listRoomInfo['+i+'].remark'" :rules='rules.needSel'>
												<el-select :disabled="readonly" @change="changeBelong(item)" v-model="item.remark" placeholder="请选择">
													<el-option v-for="(item,key) in remarks"  :label="item.name" :value="item.name" :key="key"></el-option>
												</el-select>
											</el-form-item>
										</td>
										<td>
											<el-form-item :prop="'listRoomInfo['+i+'].houseArea'" :rules="rules.checkNum">	
												<el-input :readonly="readonly" v-model="item.houseArea" placeholder="请输入">
													<template slot="append">m²</template>
												</el-input>
											</el-form-item>
										</td>
										<td colspan="8"></td>
									</template>
								</tr>
							</tbody>            	
						</table>
					</div>
					<h3 v-if="tolitBed!==0" class="no_border">请选择独卫所属房间</h3>
					
					<ul class="clearfix">
						<li v-for="(item , i) in formSend.listRoomInfo" v-if="item.sectionType==='卫生间' && item.remark==='独卫'" :key="i">
							<el-form-item :label="item.sectionType+item.bedroomNum+'所属房间'" :prop="'listRoomInfo['+i+'].theirHouse'" :rules="item.remark==='独卫'?rules.needSel:[]">
								<el-select :disabled="readonly" v-model="item.theirHouse" placeholder="请选择">
									<el-option v-for="(item,key) in theirHouses"  :label="item.name" :value="item.name" :key="key"></el-option>
								</el-select>
							</el-form-item>
						</li>
					</ul>
				</div>
			</div>
			
			<div class="info-part">
				<div class="info-part-inner">
					<h3>房源信息</h3>
					<ul class="clearfix long">
						<li>
							<el-form-item label="宽带是否集中处理" prop="propertyInfo.isUse" :rules="rules.needSel">
								<el-select :disabled="readonly" v-model="formSend.propertyInfo.isUse" placeholder="请选择">
									<el-option v-for="(item,key) in isHaves"  :label="item.name" :value="item.value" :key="key"></el-option>
								</el-select>
							</el-form-item>
						</li>
						<li>
							<el-form-item label="宽带是否首次安装" prop="propertyInfo.isInstall" :rules="rules.needSel">
								<el-select :disabled="readonly" v-model="formSend.propertyInfo.isInstall" placeholder="请选择">
									<el-option v-for="(item,key) in isHaves"  :label="item.name" :value="item.value" :key="key"></el-option>
								</el-select>
							</el-form-item>
						</li>
					</ul>
					<ul class="clearfix">
						<li>
							<el-form-item label="是否有燃气" prop="propertyInfo.isGas" :rules="rules.needSel">
								<el-select :disabled="readonly" v-model="formSend.propertyInfo.isGas" placeholder="请选择">
									<el-option v-for="(item,key) in isHaves"  :label="item.name" :value="item.value" :key="key"></el-option>
								</el-select>
							</el-form-item>
						</li>
						<li>
							<el-form-item label="房屋朝向" prop="propertyInfo.orientation" :rules="rules.needSel">
								<el-select :disabled="readonly" filterable v-model="formSend.propertyInfo.orientation" placeholder="请选择">
									<el-option v-for="(item,key) in houseOrientations"  :label="item.name" :value="item.name" :key="key"></el-option>
								</el-select>
							</el-form-item>
						</li>
						<li style="width:100%;">
							<p class="name">户型：</p>
							<p class="content">{{formSend.propertyInfo.family}}</p>
						</li>
					</ul>
					
				</div>
			</div>
			<ul class="file-ul">
				<li>
					<h3>闭水试验照片<p  class="tip">{{houseTypeName === '精装'?'必传项，至少上传1张照片':''}}</p></h3>
						<div class="item-box personAttach">
							<template v-if="houseTypeName === '精装'">
								<el-form-item prop="listPhotoInfo" :rules="rules.checkImg">
									<el-upload :with-credentials="true"
										:disabled="readonly"
										:file-list="formSend.listPhotoInfo"
										:on-success="handleSuccess" 
										:on-error="handleError"
										:before-upload="beforeUploadImage" 
										:data="picType" list-type="picture-card" class="upload-demo" 
										:action="host+'/pic/upload?access_token='+token" :on-preview="handlePreview" :on-remove="handleRemove">
										<i class="el-icon-plus"></i>
									</el-upload>
								</el-form-item>	
							</template>
							<template v-else>
								<el-upload :with-credentials="true"  
									:file-list="formSend.listPhotoInfo"
									:on-success="handleSuccess" 
									:on-error="handleError"
									:before-upload="beforeUploadImage" 
									:data="picType" list-type="picture-card" class="upload-demo" 
									:action="host+'/pic/upload?access_token='+token" :on-preview="handlePreview" :on-remove="handleRemove">
									<i class="el-icon-plus"></i>
								</el-upload>
							</template>
									
						</div>
				</li>
			</ul>
			<div class="btn-wrap">
				<button type="button" v-if="!readonly && (this.orderFlow >=4 || this.orderFlow===1)" @click="next('formSend','housePorperty')" class="btn btn-primary">保存并下一步</button>
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
const photoState=0;
import {
  getHouseMsg_1,
  getHouseMsg_2,
  setHouseMsg_1,
  setHouseMsg_2,
} from "../../api/housemeasuremgmt";
import {
	houseStyles,
	houseOrientations,
	isHaves,
	balconyTypes,
	tolitTypes
} from "../public/options.config"

const form = {
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
}
function checkType(arr,type) {
	for(var i=0 ;i<arr.length;i++){
		if (arr[i]==type) {
			return true;
		}
	}
	return false;
}
	export default{
		name:"houseMsg",
		props:['pkId','addPageId','readonly'],
		data(){
			var checkNum=(rule , value, cb) =>{
				if(value===''){                                                                       `	`
					return cb(new Error('输入不能为空！'))
				}
				if(!/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value)){

					return cb(new Error('输入值不能小于0！'))
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
			var noCheck= (rule,value,cb) => {
				cb();
			}
			return {
				pageId:'',
				houseStyles:houseStyles,
				isHaves:isHaves,
				houseOrientations:houseOrientations,
				balconyTypes:balconyTypes,
				remarks:tolitTypes,
				formSend:JSON.parse(JSON.stringify(form)),
				rules:{
					checkNum:{validator:checkNum,trigger:'blur'},
					needSel:{validator:needSel,trigger:'change'},
					checkImg:{validator:checkImg},
					noCheck:{validator:noCheck}
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
			itemIsToiletChange(item){
				if(item.isToilet === 0){
					item.toiletArea = item.toiletArea===''? null:'';
				}
			},
			itemBalconyTypeChange(item){
				if(item.balconyType ==='无'){
					item.balconyArea = item.balconyArea === ''? null: '';
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
				if(res.code !== 200){
					this.$message.error('图片上传失败！')
					var index = fileList.findIndex( (ele) =>{
						return file.uid === ele.uid;
					} )
					fileList.splice(index,1)
				}else{
					var obj=JSON.parse(JSON.stringify(picType));
					delete obj['index'];
					obj['url']=res.data.url;
					this.formSend.listPhotoInfo.push(obj);
					this.picType.index+=1;
				}
				
			},
			handleError(){
				this.$message.error('上传图片失败！');
			},
			isToiletChange(item){
				if(item.istoilet === 0){
					item.toiletArea='';
				}
			},
			changeBelong(item){
				item.theirHouse=null;
			},
			next(formName,componentName){
				this.$refs[formName].validate((valid) => {
					if(valid){
						var data=JSON.parse(JSON.stringify(this.formSend));
						for(let i =0;i<data.listPhotoInfo.length;i++){
							data.listPhotoInfo[i]['photoUrl']=data.listPhotoInfo[i]['url'];
							data.listPhotoInfo[i]['sort']=i+1;
							data.listPhotoInfo[i]['state']=photoState;
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
								(message) => this.$message({ type: "error", message:message.indexOf('@') !== -1?message.split('@')[1]:"房屋信息设置失败！" })
							);
						}else{
							setHouseMsg_2(
								data,
								providers => {
									this.$message({type:'success',message: "房屋信息修改成功！"});
									this.$emit('next',componentName);
								},
								(message) => this.$message({ type: "error", message:"房屋信息修改失败！" })
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
				'orderFlow',
				'houseTypeName'
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
			tolitBed(){
				var num=0;
				for(let i of this.formSend.listRoomInfo){
					if(i.remark==='独卫'&& i.sectionType==='卫生间'){
						num++;
					}
				}
				return num;
			}
		},
		activated(){
			if(this.pageId !==this.addPageId){
				if(!!this.$refs['formSend']){
					this.$refs['formSend'].resetFields();
				}
				this.formSend=JSON.parse(JSON.stringify(form));
				this.formSend.orderPkId=this.pkId;
				if(this.orderFlow<2){
					//配置系统没有录入，从业务系统里取
					getHouseMsg_1(
						this.pkId,
						providers => {
							var roomVos=providers.roomVos;
							var bedRooms=[],tolit=[],other=[];
							for(let i of roomVos){
								if(i.sectionType === '卧室'){
									bedRooms.push(i);
								}else if(i.sectionType === '卫生间'){
									tolit.push(i)
								}else{
									other.push(i);
								}
							}
							roomVos=bedRooms.concat(other,tolit);
							this.formSend.listRoomInfo=roomVos;
							this.formSend.propertyInfo.family=providers.family;
						},
						(message) => this.$message({ type: "error", message:"房屋信息获取失败！" })
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
						(message) => this.$message({ type: "error", message:"房屋信息获取失败！" })
					)
				}
				this.pageId=this.addPageId;
			}
		}
		
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
