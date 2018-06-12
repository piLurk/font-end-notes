<template>
	<div class="addPages housePic">
		<el-form :model="formSend" :inline="true" ref="formSend" label-position="left" >
			<ul class="tap_change clearfix" @click="changePart">
				<li data-show="public" :class="{active:partShow==='public'}">公共区域</li>
				<li data-show="bedroom" :class="{active:partShow==='bedroom'}">卧室</li>
			</ul>
			<ul class="file-ul" v-show="partShow==='public'">
				<li>
					<h3>客厅<p  class="tip">必传项，至少上传1张照片</p></h3>
					<ul class="clearfix">
						<div class="item-box personAttach">
							<el-form-item prop="livingRoom" :rules="rules.checkImg">
								<el-upload 
									:with-credentials="true"
									:disabled="readonly" 
									:file-list="formSend['livingRoom']" 
									:before-upload="beforeUploadImage" 
									:data="picType['livingRoom']" list-type="picture-card" class="upload-demo" 
									:action="host+'/pic/upload?access_token='+token"
									:on-success="handleSuccessObj['livingRoom']"
									:on-error="handleError"
									:on-preview="handlePreview" 
									:on-remove="handleRemoveObj['livingRoom']">
									<i class="el-icon-plus"></i>
								</el-upload>
							</el-form-item>				
						</div>
						<li>
						</li>
					</ul>
				</li>
				<li>
					<h3>厨房<p  class="tip">必须传，至少上传1张照片</p></h3>
					<ul class="clearfix">
						<div class="item-box personAttach">
							<el-form-item prop="kitchen" :rules="rules.checkImg">
								<el-upload :with-credentials="true"  
									:disabled="readonly" 
									:file-list="formSend['kitchen']" 
									:before-upload="beforeUploadImage" 
									:data="picType['kitchen']" list-type="picture-card" class="upload-demo" 
									:action="host+'/pic/upload?access_token='+token" 
									:on-success="handleSuccessObj['kitchen']" 
									:on-error="handleError"
									:on-preview="handlePreview" 
									:on-remove="handleRemoveObj['kitchen']">
									<i class="el-icon-plus"></i>
								</el-upload>
							</el-form-item>		
						</div>
						<li>
						</li>
					</ul>
				</li>
				<li>
					<h3>卫生间<p  class="tip">必须传，至少上传1张照片</p></h3>
					<ul class="clearfix">
						<div class="item-box personAttach">
							<el-form-item prop="toilet" :rules="rules.checkImg">
								<el-upload
									:with-credentials="true"  
									:disabled="readonly" 
									:file-list="formSend['toilet']" 
									:before-upload="beforeUploadImage" 
									:data="picType['toilet']" list-type="picture-card" class="upload-demo" 
									:action="host+'/pic/upload?access_token='+token"
									:on-success="handleSuccessObj['toilet']" 
									:on-error="handleError"
									:on-preview="handlePreview" 
									:on-remove="handleRemoveObj['toilet']">
									<i class="el-icon-plus"></i>
								</el-upload>
							</el-form-item>				
						</div>
						<li>
						</li>
					</ul>
				</li>
				<li>
					<h3>户型图<p  class="tip">非必传，最多上传1张照片</p></h3>
					<ul class="clearfix">
						<div class="item-box personAttach">
							<el-form-item prop="roomtype" :rules="getImgCheck(1)">
								<el-upload
									:with-credentials="true"  
									:disabled="readonly" 
									:file-list="formSend['roomtype']"
									:before-upload="beforeUploadImage" 
									:data="picType['roomtype']" list-type="picture-card" class="upload-demo" 
									:action="host+'/pic/upload?access_token='+token"
									:on-success="handleSuccessObj['roomtype']" 
									:on-error="handleError"
									:on-preview="handlePreview" 
									:on-remove="handleRemoveObj['roomtype']">
									<i class="el-icon-plus"></i>
								</el-upload>
							</el-form-item>			
						</div>
						<li>
						</li>
					</ul>
				</li>
			</ul>
			<ul class="file-ul" v-show="partShow==='bedroom'">
				<li v-for="(item,i) in RoomVo" v-if="item.sectionType==='卧室'" :key="i">
					<h3>{{item.sectionType+item.bedroomNum}}<p  class="tip">必传项，至少上传1张照片</p ></h3>
					<ul class="clearfix">
						<div class="item-box personAttach">
							<el-form-item :prop="'room'+(item.bedroomNum-0)" :rules="rules.checkImg">
								<el-upload
									:with-credentials="true"
									:disabled="readonly"
									:file-list="formSend['room'+(item.bedroomNum-0)]"
									:before-upload="beforeUploadImage"
									:data="picType['room'+(item.bedroomNum-0)]" list-type="picture-card" class="upload-demo" 
									:action="host+'/pic/upload?access_token='+token"
									:on-success="handleSuccessObj[i>=3?i+2:i+1]"
									:on-error="handleError"
									:on-preview="handlePreview"
									:on-remove="handleRemoveObj[i>=3?i+2:i+1]">
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
				<button type="button" v-if="!readonly && (this.orderFlow >=4 || this.orderFlow===3)" @click="next('formSend') " class="btn btn-primary">确认</button>
			</div>
		</el-form>
		<el-dialog v-model="dialogVisible" size="tiny">
	  		<img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
	</div>
</template>
<script type="text/javascript">
import {
	getHouseMeasure,
	getHouseMsg_2,
	setHousePic_1,
	setHousePic_2,
	getHousePic,
} from "../../api/housemeasuremgmt";
const photoState=0;
const picTypeList={
	livingRoom:{photoType:0,photoSource:0,index:1},
	kitchen:{photoType:0,photoSource:1,index:1,},
	toilet:{photoType:0,photoSource:2,index:1,},
	roomtype:{photoType:0,photoSource:3,index:1,},
	bedroomObj:{photoType:1,photoSource:'',index:1,}
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
		name:"housePic",
		props:['pkId','addPageId','readonly','orderFlow'],
		data(){
			var checkImg=(rule,value,cb) =>{
				if(value.length===0){
					return cb(new Error('请上传图片'));
				}else{
					cb();
				}
			};
			return{
				pageId:'',
				RoomVo:[],
				mydata:'',
				formSend:{
					livingRoom:[],
					kitchen:[],
					toilet:[],
					roomtype:[],
				},
				rules:{
					checkImg:{validator:checkImg},
				},
				handleRemoveObj:{
					'livingRoom':this.foo_r('livingRoom'),
					'kitchen':this.foo_r('kitchen'),
					'toilet':this.foo_r('toilet'),
					'roomtype':this.foo_r('roomtype'),
					'1':this.foo_r('room1'),
					'2':this.foo_r('room2'),
					'3':this.foo_r('room3'),
					'5':this.foo_r('room5'),
					'6':this.foo_r('room6'),
					'7':this.foo_r('room7'),
					'8':this.foo_r('room8'),
					'9':this.foo_r('room9'),
				},
				handleSuccessObj:{
					'livingRoom':this.foo_s('livingRoom'),
					'kitchen':this.foo_s('kitchen'),
					'toilet':this.foo_s('toilet'),
					'roomtype':this.foo_s('roomtype'),
					'1':this.foo_s('room1'),
					'2':this.foo_s('room2'),
					'3':this.foo_s('room3'),
					'5':this.foo_s('room5'),
					'6':this.foo_s('room6'),
					'7':this.foo_s('room7'),
					'8':this.foo_s('room8'),
					'9':this.foo_s('room9'),
				},
				public:"",
				partShow:'public',
				dialogImageUrl: '',
        		dialogVisible: false,
			}
		},
		computed:{
			bedroomNum:function(){
				let allNum=0;
				if(this.RoomVo === undefined){
					return allNum;
				}
				for(let i of this.RoomVo){
					if(i.sectionType==='卧室'){
						allNum++;
					}
				}
				return allNum;
			},
			picType:function(){
				var obj={
					livingRoom:picTypeList.livingRoom,
					kitchen:picTypeList.kitchen,
					toilet:picTypeList.toilet,
					roomtype:picTypeList.roomtype
				};
				if(this.bedroomNum === 0){
					return obj;
				}
				for(let i=0;i<this.bedroomNum;i++){
					var tag=i>=3?(i+1):i;
					let _obj={
						photoType:picTypeList.bedroomObj.photoType,
						index:picTypeList.bedroomObj.index,
						photoSource:(tag+1)<10?'10'+(tag+1)-0:'1'+(tag+1)-0,
					}
					obj['room'+(tag+1)]=_obj;
				}
				return obj;
			},
		},
		methods:{
			getImgCheck(n){
				return (rule,value,cb) =>{
					if(value.length > n){
						return cb(new Error(`最多上传${n}张照片！`));
					}else{
						cb();
					}
				}
			},
			foo_s(attr){
				return (res,file,fileList) =>{
					if(res.code !== 200){
						this.$message.error('图片上传失败！')
						var index = fileList.findIndex( (ele) =>{
							return file.uid === ele.uid;
						} )
						fileList.splice(index,1)
					}else{
						var obj=JSON.parse(JSON.stringify(this.picType[attr]));
						obj['url']=res.data.url;
						this.formSend[attr].push(obj);
						this.picType[attr].index+=1;
					}
				}
			},
			foo_r(attr){
				return (file, fileList) =>{
					var delUrl=file.url;
					this.picType[attr].index--;
					var arr=this.formSend[attr];
					for(let i=0;i<arr.length;i++){
						if(arr[i].url === delUrl){
							arr.splice(i,1);
							break;
						}
					}
				}
			},
			changePart($event){
				if ($event.target.nodeName==='LI') {
					this.partShow=$($event.target).data('show');
				}
			},
			handleError(){
				this.$message.error('上传图片失败！');
			},
		    handlePreview(file) {
		        this.dialogImageUrl = file.url;
        		this.dialogVisible = true;
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
			next(formName){
				this.$refs.formSend.validate((valid) => {
					if(valid){
						var orderPkId=this.pkId;
						var listPhotoInfo=[];
						var data=JSON.parse(JSON.stringify(this.formSend))
						for(let item in data){
							var arr=data[item];
							arr.forEach(function(_item,k){
								_item['photoUrl']=_item['url'];
								_item['sort']=k+1;
								_item['state']=photoState;
								delete _item['url'];
								delete _item['index'];
							})
							listPhotoInfo=listPhotoInfo.concat(arr);
						}
						var dataSend={
							orderPkId:orderPkId,
							listPhotoInfo:listPhotoInfo,
						}
						if(this.orderFlow<4){
							setHousePic_1(
								dataSend,
								providers => {
									this.$message({type:'success',message: "量房照片设置成功！"});
									getHouseMeasure(this.pkId);
									this.$store.dispatch("itemArrRemove", {
										id: this.$route.name,
										to: {
										id: "houseMeasureQuery",
										name: "量房订单查询",
										params: {updateId:(new Date()).getTime()}
									}
									});
								},
								(message) => this.$message({ type: "error", message:"量房照片设置失败！" })
							);
						}else{
							setHousePic_2(
								dataSend,
								providers => {
									this.$message({type:'success',message: "量房照片编辑成功！"});
									this.$store.dispatch("itemArrRemove", {
										id: this.$route.name,
										to: {
										id: "houseMeasureQuery",
										name: "量房订单查询",
										params: {updateId:(new Date()).getTime()}
									}
									});
								},
								(message) => this.$message({ type: "error", message:"量房照片编辑失败！" })
							);
						}

					}
					
				});
				
			}

		},
		watch:{
			RoomVo:function() {
				if(this['RoomVo'].length === 0){
					return;
				}
				var num=0;
				for(let i=0;i<this.RoomVo.length;i++){
					
					if(this.RoomVo[i].sectionType === '卧室'){
						num+=1;
						num= num===4?num+=1:num;
						var attr='room'+num;
						this.$set(this.formSend,attr,[]);
					}
					
				}
			}
		},
		activated(){
			if(this.pageId !==this.addPageId){
				if(!!this.$refs['formSend']){
					this.$refs['formSend'].resetFields();
				}
				for(let i in this.formSend){
					this.formSend[i] = [];
				}
				var that=this;
				getHouseMsg_2(
					this.pkId,
					providers => {
						this.RoomVo=providers.RoomVo;
						if(this.orderFlow>=4){
							getPhotos(that);
						}
					},
					(message) => this.$message({ type: "error", message:"卧室信息获取失败！" })
				);
				function getPhotos(that){
					var foreignKey=that.pkId;
					var picData={foreignKey:foreignKey};
					getHousePic(
						picData,
						providers => {
							for(let i of providers){
								i['url']=i['photoUrl'];
								if(i.photoType===0 && i.photoSource===0){
									that.formSend.livingRoom.push(i);
								}
								if(i.photoType===0 && i.photoSource===1){
									that.formSend.kitchen.push(i);
								}
								if(i.photoType===0 && i.photoSource===2){
									that.formSend.toilet.push(i);
								}
								if(i.photoType===0 && i.photoSource===3){
									that.formSend.roomtype.push(i);

								}
								if(i.photoType===1 && i.photoSource>100 && i.photoSource<110){
									var str='room'+(i.photoSource -100);
									that.formSend[str].push(i);
								}
							}
							for(let i in that.picType){
								that.picType[i].index = that.formSend[i].length;
							}	
							

						},
						(message) => that.$message({ type: "error", message:"量房照片获取失败！" })
					)
				}
				this.pageId = this.addPageId;
			}
		}
	}

</script>
<style type="text/css" scoped>
	.addPages .info-part{
		background-color: #f2f4f8;
	}
	.tap_change{
		padding:10px 33px;
	}
	.tap_change li{
		line-height: 33px;
		height: 33px;
		width: 110px;
		float: left;
		text-align: center;
		background-color: #F6F8F8;
		cursor: pointer;
	}
	.tap_change li.active{
		background-color: #3BA0FF;
		color: #fff;
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
	 .file-ul h3{border-left: 3px solid #4db3ff;padding-left: 30px;margin-bottom: 25px;}
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