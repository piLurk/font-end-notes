<template>
	<div id="informationDeliveryDetails" class="informationDeliveryDetails pic_carousel_page">
		<el-form :model="formSend" :inline="true" ref="formSend" label-position="left" >
			<div class="info-part">
				<h3>信息交付</h3>
				<ul class="clearfix">
					<li>
						<p class="name">订单编号：</p>
						<div class="inp-box">
							<div>{{orderMsg.orderNumber}}</div> 
						</div>
					</li>
					<li>
						<p class="name">收房合同：</p>
						<div class="inp-box">
							<div>{{orderMsg.contractNumber}}</div> 
						</div>
					</li>
					<li>
						<p class="name">房源编号：</p>
						<div class="inp-box">
							<div>{{orderMsg.baseNumber}}</div> 
						</div>
					</li>
					<li>
						<p class="name">&nbsp;</p>
						<div class="inp-box">
							<div></div>
						</div>
					</li>
					<li class="li50">
						<p class="name">物业地址：</p>
						<div class="inp-box">
							<div>{{orderMsg.orderAddress}}</div> 
						</div>
					</li>
				</ul>
			</div>
			<!--房源详情选项卡 begin-->
			<div class="room-tabs">
				<ul>
					<li><a v-bind:class="(isActive=='0')?'cur':''" @click="afterConfiguration" href="javascript:void(0)">配置后</a></li>
					<li><a v-bind:class="(isActive=='1')?'cur':''" @click="beforeConfiguration" href="javascript:void(0)">配置前</a></li>
				</ul>
			</div>
			<!--房源详情选项卡 end-->
			<div class="dataBox afterConfig" v-bind:class="(isActive=='0')?'showit':'hideit'">
				<div class="roomArea">
					<ul>
						<li><a v-bind:class="(isActiveArea=='0')?'cur':''" @click="publicArea" href="javascript:void(0)">公共区域</a></li>
						<li><a v-bind:class="(isActiveArea=='1')?'cur':''" @click="bedroom" href="javascript:void(0)">卧室</a></li>
					</ul>
				</div>
				<div class="publicArea" v-bind:class="(isActiveArea=='0')?'showit':'hideit'">
					<ul class="file-ul">
						<li>
							<h3>客厅<p class="tip" v-if="orderType !== 2">必传项，至少上传1张</p></h3>
							<div class="item-box personAttach">
								<el-form-item prop="livingRoom_2" :rules="getPubImgRule(1)">
									<el-upload :with-credentials="true"  
										:disabled="readOnly" 
										:file-list="formSend['livingRoom_2']" 
										:before-upload="beforeUploadImage" 
										:data="picType['livingRoom_2']" list-type="picture-card" class="upload-demo" 
										:action="host+'/pic/upload?access_token='+token"
										:on-success="handleSuccessObj['livingRoom_2']"
										:on-error="handleError"
										:on-preview="handlePreview" 
										:on-remove="handleRemoveObj['livingRoom_2']">
									<i class="el-icon-plus"></i>
									</el-upload>
								</el-form-item>				
							</div>
						</li>
						<li>
							<h3>厨房<p class="tip" v-if="orderType !== 2">必传项，至少上传1张</p></h3>
							<div class="item-box personAttach">
								<el-form-item prop="kitchen_2" :rules="getPubImgRule(1)">
									<el-upload :with-credentials="true"  
										:disabled="readOnly" 
										:file-list="formSend['kitchen_2']" 
										:before-upload="beforeUploadImage" 
										:data="picType['kitchen_2']" list-type="picture-card" class="upload-demo" 
										:action="host+'/pic/upload?access_token='+token" 
										:on-success="handleSuccessObj['kitchen_2']"

										:on-preview="handlePreview"
										:on-remove="handleRemoveObj['kitchen_2']">
									<i class="el-icon-plus"></i>
									</el-upload>	
								</el-form-item>			
							</div>
						</li>
						<li>
							<h3>卫生间<p class="tip" v-if="orderType !== 2">必传项，至少上传1张</p></h3>
							<div class="item-box personAttach">
								<el-form-item prop="toilet_2" :rules="getPubImgRule(1)">
									<el-upload :with-credentials="true"  
									:disabled="readOnly" 
									:file-list="formSend['toilet_2']" 
									:before-upload="beforeUploadImage" 
									:data="picType['toilet_2']" list-type="picture-card" class="upload-demo" 
									:action="host+'/pic/upload?access_token='+token" 
									:on-success="handleSuccessObj['toilet_2']"

									:on-preview="handlePreview" 
									:on-remove="handleRemoveObj['toilet_2']">
									<i class="el-icon-plus"></i>
									</el-upload>
								</el-form-item>				
							</div>
						</li>
					</ul>
					<!--<div class="btn-wrap">
						<el-button v-if="!readOnly" @click="pageChange('query')" type="primary" style="padding: 8px 22px;">确认</el-button>
					</div>-->
				</div>
				<div class="bedroom" v-bind:class="(isActiveArea=='1')?'showit':'hideit'">
					<ul class="file-ul">
						<li v-for="(item,i) in RoomVo" v-if="item.sectionType==='卧室'" :key="i">
							<h3>{{item.sectionType+item.bedroomNum}}<p class="tip">必传项，至少上传1张</p></h3>
							<div class="item-box personAttach">
								<el-form-item :prop="'state_2_room'+(item.bedroomNum-0)" :rules="getImgCheck(1)">
									<el-upload :with-credentials="true"  
									:disabled="readOnly"
									:file-list="formSend['state_2_room'+(item.bedroomNum-0)]" 
									:before-upload="beforeUploadImage" 
									:data="picType['state_2_room'+(item.bedroomNum-0)]" list-type="picture-card" class="upload-demo" 
									:action="host+'/pic/upload?access_token='+token" 
									:on-success="handleSuccessObj['state_2_room'+(item.bedroomNum-0)]"

									:on-preview="handlePreview" 
									:on-remove="handleRemoveObj['state_2_room'+(item.bedroomNum-0)]">
									<i class="el-icon-plus"></i>
									</el-upload>
								</el-form-item>				
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="dataBox beforeConfig" v-bind:class="(isActive=='1')?'showit':'hideit'">
				<div class="roomArea">
					<ul>
						<li><a v-bind:class="(isActiveArea=='0')?'cur':''" @click="publicArea" href="javascript:void(0)">公共区域</a></li>
						<li><a v-bind:class="(isActiveArea=='1')?'cur':''" @click="bedroom" href="javascript:void(0)">卧室</a></li>
					</ul>
				</div>
				<div class="publicArea" v-bind:class="(isActiveArea=='0')?'showit':'hideit'">
					<ul class="file-ul">
						<li>
							<h3>户型图<p class="tip" v-if="orderType === 0">必传项，最多上传1张</p></h3>
							<div class="item-box personAttach">
							<el-form-item prop="roomtype" :rules="orderType !== 0 ?[]:getImgMaxCheck(1)">
									<el-upload :with-credentials="true"  
										:disabled="readOnly" 
										:file-list="formSend['roomtype']" 
										:before-upload="beforeUploadImage" 
										:data="picType['roomtype']" list-type="picture-card" class="upload-demo" 
										:action="host+'/pic/upload?access_token='+token" 
										:on-success="handleSuccessObj['roomtype']"

										:on-preview="handlePreview"
										:on-remove="handleRemoveObj['roomtype']">
										<i class="el-icon-plus"></i>
									</el-upload>
								</el-form-item>
							</div>
						</li>
						<li>
							<h3>客厅</h3>
							<div class="item-box personAttach">
									<el-upload :with-credentials="true"  
									:disabled="readOnly" 
									:file-list="formSend['livingRoom_1']" 
									:before-upload="beforeUploadImage" 
									:data="picType['livingRoom_1']" list-type="picture-card" class="upload-demo" 
									:action="host+'/pic/upload?access_token='+token" 

									:on-success="handleSuccessObj['livingRoom_1']"
									:on-preview="handlePreview" 
									:on-remove="handleRemoveObj['livingRoom_1']">
									<i class="el-icon-plus"></i>
									</el-upload>		
							</div>
						</li>
						<li>
							<h3>厨房</h3>
							<div class="item-box personAttach">
									<el-upload :with-credentials="true"  
									:disabled="readOnly" 
									:file-list="formSend['kitchen_1']" 
									:before-upload="beforeUploadImage" 
									:data="picType['kitchen_1']" list-type="picture-card" class="upload-demo" 
									:action="host+'/pic/upload?access_token='+token" 
									:on-success="handleSuccessObj['kitchen_1']"

									:on-preview="handlePreview" 
									:on-remove="handleRemoveObj['kitchen_1']">
									<i class="el-icon-plus"></i>
									</el-upload>		
							</div>
						</li>
						<li>
							<h3>卫生间</h3>
							<div class="item-box personAttach">
									<el-upload :with-credentials="true"  
									:disabled="readOnly" 
									:file-list="formSend['toilet_1']" 
									:before-upload="beforeUploadImage" 
									:data="picType['toilet_1']" list-type="picture-card" class="upload-demo" 
									:action="host+'/pic/upload?access_token='+token"
									:on-success="handleSuccessObj['toilet_1']"

									:on-preview="handlePreview" 
									:on-remove="handleRemoveObj['toilet_1']">
									<i class="el-icon-plus"></i>
									</el-upload>		
							</div>
						</li>
					</ul>
					<!--<div class="btn-wrap">
						<el-button v-if="!readOnly" @click="pageChange('query')" type="primary" style="padding: 8px 22px;">确认</el-button>
					</div>-->
				</div>
				<div class="bedroom" v-bind:class="(isActiveArea=='1')?'showit':'hideit'">
					<ul class="file-ul">
						<li v-for="(item,i) in RoomVo" v-if="item.sectionType==='卧室'" :key="i">
							<h3>{{item.sectionType+item.bedroomNum}}</h3>
							<div class="item-box personAttach">
									<el-upload :with-credentials="true"  
									:disabled="readOnly" 
									:file-list="formSend['state_1_room'+(item.bedroomNum-0)]" 
									:before-upload="beforeUploadImage" 
									:data="picType['state_1_room'+(item.bedroomNum-0)]" list-type="picture-card" class="upload-demo" 
									:action="host+'/pic/upload?access_token='+token" 
									:on-success="handleSuccessObj['state_1_room'+(item.bedroomNum-0)]"
									:on-preview="handlePreview" 
									:on-remove="handleRemoveObj['state_1_room'+(item.bedroomNum-0)]">
									<i class="el-icon-plus"></i>
									</el-upload>		
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="btn-wrap" v-if="!readOnly">
				<el-button v-if="!readOnly" @click="next('formSend')" type="primary">确认</el-button>
			</div>
		</el-form>
		<el-dialog v-model="dialogVisible" :title="dialogTile" class="dialog_large" size="large">
      <el-carousel @change="carouselChange" :autoplay="false"  ref="carouselRef">
        <el-carousel-item v-for="item in imgShowList" :key="item.title">
          <img width="100%"  :src="item.url" :alt="item.title">
        </el-carousel-item>
      </el-carousel>
		</el-dialog>
	</div>
</template>

<script>
import {
	getHouseMsg_2,
	getHousePic,
} from "../../api/housemeasuremgmt";
import{
	setHousePic_1,
	setHousePic_2,
} from "../../api/ordermgmt";
function checkType(arr,type) {
	for(var i=0 ;i<arr.length;i++){
		if (arr[i]==type) {
			return true;
		}
	}
	return false;
}
const picTypeList={
	livingRoom_1:{photoType:3,photoSource:30,index:1,state:0},
	kitchen_1:{photoType:3,photoSource:31,index:1,state:0},
	toilet_1:{photoType:3,photoSource:32,index:1,state:0},
	roomtype:{photoType:3,photoSource:33,index:1,state:0},
	livingRoom_2:{photoType:3,photoSource:30,index:1,state:1},
	kitchen_2:{photoType:3,photoSource:31,index:1,state:1},
	toilet_2:{photoType:3,photoSource:32,index:1,state:1},
	bedroom:{photoType:3,photoSource:'',index:1}
}
const photoType=3;
const sectionTypeMap = {
  'livingRoom': '客厅',
  'kitchen':'厨房',
  'toilet':'卫生间'
}
	export default {
		name:'informationDeliveryDetails',
		data(){
			
			return{
				pageState:'',
				updateId:'',
				orderType:'',
				isActive: '0',
				isActiveArea: '0',
				orderMsg:{
					orderNumber:'---',
					contractNumber:'---',
					baseNumber:'---',
					orderAddress:'---',
					orderId:'',
					orderState:''
				},
				RoomVo:[],
				formSend:{
					roomtype:[],
					livingRoom_1:[],
					kitchen_1:[],
					toilet_1:[],
					livingRoom_2:[],
					kitchen_2:[],
					toilet_2:[],
				},
				dialogImageUrl:'',
        dialogVisible:false,
        dialogTile:'',
        imgShowList:[],
        imgIndex:'', // 点击图片在imgShowList中的位置

			}
		},
		computed:{
			readOnly:function(){
				return this.pageState === 'readOnly';
			},
			handleSuccessObj(){
				var obj={};
				for(let i in picTypeList){
					obj[i]=this.foo_s(i);
				}
				
				if(this.bedroomArr.length === 0){
					return obj;
				}
				for(let i=0;i<this.bedroomArr.length;i++){
					var tag=this.bedroomArr[i];
					obj['state_1_room'+tag]=this.foo_s('state_1_room'+tag);
					obj['state_2_room'+tag]=this.foo_s('state_2_room'+tag);
				}
				return obj;
			},
			handleRemoveObj(){
				var obj={};
				for(let i in picTypeList){
					obj[i]=this.foo_r(i);
				}
				if(this.bedroomArr.length === 0){
					return obj;
				}
				for(let i=0;i<this.bedroomArr.length;i++){
					var tag=this.bedroomArr[i];
					obj['state_1_room'+tag]=this.foo_r('state_1_room'+tag);
					obj['state_2_room'+tag]=this.foo_r('state_2_room'+tag);
				}
				return obj;
			},	
			bedroomArr:function(){
				let arr=[];
				if(this.RoomVo === undefined){
					return arr;
				}
				for(let i of this.RoomVo){
					if(i.sectionType==='卧室'){
						arr.push(i.bedroomNum - 0)
					}
				}
				return arr;
			},
			picType:function(){
				var obj={
					livingRoom_1:picTypeList.livingRoom_1,
					kitchen_1:picTypeList.kitchen_1,
					toilet_1:picTypeList.toilet_1,
					roomtype:picTypeList.roomtype,
					livingRoom_2:picTypeList.livingRoom_2,
					kitchen_2:picTypeList.kitchen_2,
					toilet_2:picTypeList.toilet_2,
				};
				if(this.bedroomArr.length === 0){
					return obj;
				}
				return this.getBedRoomPicType(obj)
				
      },
      imgList(){
        // 一个四个可视part
        const listObj = {
          'state_1_public':[], //配置前公共区域
          'state_1_bedroom':[], //配置前卧室
          'state_2_public':[], //配置后公共区域
          'state_2_bedroom':[] //配置后卧室
        };

        var stateName ='', state = '',  // 配置前后
            areaName = '', area = '', // 公共区域或卧室
            sectionTypeName ='', // 区域名字
            formSend = this.formSend;

        for(let key in formSend){
          if(key === 'roomtype') {
            //户型图，属于 配置前-公共区域-户型图
            formSend[key].map( (item, i) => {
              listObj['state_1_public'].push({
                title:'配置前-公共区域-户型图' + '(' + (i+1) +')',
                url: item.url
              })
            }); 
            continue;
          }

          if(key.indexOf('_1') !== -1) {
            stateName = '配置前';
            state = 1;
          }else {
            stateName = '配置后';
            state = 2;
          }
          if( key.indexOf('room') !== -1 ) {
            areaName = '卧室' ;
            area = 'bedroom';
          } else {
            areaName =  '公共区域';
            area = 'public'
          }

          if(areaName === '公共区域') {
            for(let sectionKey in sectionTypeMap) {
              if(key.indexOf(sectionKey) !== -1) {
                sectionTypeName = sectionTypeMap[sectionKey];
              }
            }
          }else{
            // 卧室
            var rNum = key.split('room')[1]; 
            sectionTypeName = '卧室' + '0' + rNum;
          }

          var targetKey = 'state_' + state + '_' + area;
          var targetTitle = stateName + '-' + areaName + '-' + sectionTypeName;

          formSend[key].map( (item, i) => {
            listObj[targetKey].push({
              title:targetTitle + '(' + (i+1) +')',
              url: item.url
            })
          }); 

        }

        return listObj
      }
		},
		methods:{
			getPubImgRule(n){
				return this.orderType !== 2?this.getImgCheck(n):[]
			},
			getImgMaxCheck(n){
				return (rule,value,cb) =>{
					if(value.length === 0){
						return cb(new Error('请上传图片！'));
					}else if(value.length > n){
						return cb(new Error(`最多上传${n}张照片！`));
					}else{
						cb();
					}
				}
			},
			getBedRoomPicType(obj){
				for(let i=0;i<this.bedroomArr.length;i++){
					var tag=this.bedroomArr[i]
					let _obj={
						photoType:picTypeList.bedroom.photoType,
						index:picTypeList.bedroom.index,
						photoSource:300+tag,
					}
					obj['state_1_room'+tag]={..._obj,state:0};
					obj['state_2_room'+tag]={..._obj,state:1};
				}
				return obj;
			},
			handleError(){
				this.$message.error('上传图片失败！');
			},
			getImgCheck(min){
				var checkImg=(rule,value,cb) =>{
					if(value.length===0){
						return cb(new Error('请上传图片'));
					}else if(value.length<min){
						cb(new Error(`必传项，至少上传1张min}张`));
					}else{
						cb();
					}
				};
				return {validator:checkImg}
			},
			afterConfiguration(){
				this.isActive = '0';
			},
			beforeConfiguration(){
				this.isActive = '1';
			},
			publicArea(){
				this.isActiveArea = '0';
			},
			bedroom(){
				this.isActiveArea = '1';
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
			handlePreview(file) {
        var state,area;
        if(file.state === 0) {
          //配置前
          state = 1;
        }else {
          // 配置后
          state = 2;
        }
        if(file.photoSource > 300) {
          //卧室
          area = 'bedroom';
        }else {
          //公共区域
          area = 'public';
        }
        var targetKey = 'state_' + state + '_' + area;
        this.imgShowList = this.imgList[targetKey];

        this.imgIndex = this.imgShowList.findIndex( (item) => {
          return item.url === file.url
        });

        this.dialogTile = this.imgShowList[this.imgIndex].title;
        this.dialogVisible = true;
        
        // 在 el-carousel组件内部方法都初始化后再调用，避免初始化bug
        setTimeout(() => {
          this.$refs['carouselRef'].setActiveItem(this.imgIndex)
        }, 0);
        

				
      },
      carouselChange(index) {
        this.dialogTile = this.imgShowList[index].title;
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
				this.$refs[formName].validate((valid) => {
					if(valid){
						var orderPkId=this.orderMsg.orderId;
						var listPhotoInfo=[];
						var data=JSON.parse(JSON.stringify(this.formSend))
						for(let item in data){
							var arr=data[item];
							arr.forEach(function(_item,k){
								_item['photoUrl']=_item['url'];
								_item['sort']=k+1;
								_item.photoType=photoType;
								
								if(_item.photoSource>100 && _item.photoSource<110){
									_item.photoSource=_item.photoSource+200;
								}
								if(_item.photoSource>=0 && _item.photoSource<10){
									_item.photoSource=_item.photoSource+30;
								}
								delete _item['url'];
								delete _item['index'];
							})
							listPhotoInfo=listPhotoInfo.concat(arr);
						}
						var dataSend={
							orderPkId:orderPkId,
							listPhotoInfo:listPhotoInfo,
						}
						if(this.orderMsg.operateState===0){
							setHousePic_1(
								dataSend,
								providers => {
									this.$message({type:'success',message: "照片设置成功！"});
									this.$store.dispatch("itemArrRemove", {
										id: this.$route.name,
										to: {
										id: "informationDelivery",
										name: "信息交付管理",
										params: {updateId:(new Date()).getTime()}
									}
									});
								},
								(message) => this.$message({ type: "error", message:message.indexOf('@') !== -1?message.split('@')[1]:"照片设置失败！" })
							);
						}else{
							setHousePic_2(
								dataSend,
								providers => {
									this.$message({type:'success',message: "照片编辑成功！"});
									this.$store.dispatch("itemArrRemove", {
										id: this.$route.name,
										to: {
										id: "informationDelivery",
										name: "信息交付管理",
										params: {updateId:(new Date()).getTime()}
									}
									});
								},
								(message) => this.$message({ type: "error", message:message.indexOf('@') !== -1?message.split('@')[1]:"照片编辑失败！" })
							);
						}
					}
				})
			},
			get_2(){
				getHouseMsg_2(
					this.orderMsg.orderId,
					providers => {
						this.RoomVo=providers.RoomVo;
						if(this.orderMsg.operateState===1){
							//编辑图片
							this.getPhotos([3]);
						}else{
							this.getPhotos([0,1]);
						}
					},
					(message) => this.$message({ type: "error", message:"卧室信息获取失败！" })
				);
			},
			getPhotos(type){
				var foreignKey=this.orderMsg.orderId;
				var picData={foreignKey:foreignKey,types:type};
				getHousePic(
					picData,
					providers => {
						for(let i of providers){
							i['url']=i['photoUrl'];
							if(i.photoSource===30 || i.photoSource===0){
								i.state===1?this.formSend.livingRoom_2.push(i):this.formSend.livingRoom_1.push(i)
								continue
							}
							if(i.photoSource===31 || i.photoSource===1){
								i.state===1?this.formSend.kitchen_2.push(i):this.formSend.kitchen_1.push(i)
								continue
							}
							if(i.photoSource===32 || i.photoSource===2){
								i.state===1?this.formSend.toilet_2.push(i):this.formSend.toilet_1.push(i)
								continue
							}
							if(i.photoSource===33 || i.photoSource===3){
								this.formSend.roomtype.push(i)
								continue
							}
							if(i.photoSource>300 && i.photoSource<400){
								var str=i.state===1?'state_2_room'+(i.photoSource -300):'state_1_room'+(i.photoSource -300);
								if(str in this.formSend){
									this.formSend[str].push(i);
								}
							}else if(i.photoSource>100 && i.photoSource<200){
								var str=i.state===1?'state_2_room'+(i.photoSource -100):'state_1_room'+(i.photoSource -100);
								if(str in this.formSend){
									this.formSend[str].push(i);
								}
							}
						}
						for(let i in this.picType){
							this.picType[i].index = this.formSend[i].length;
						}	
					},
					(message) => this.$message({ type: "error", message:"图片获取失败！" })
				)
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
						var num = this.RoomVo[i].bedroomNum - 0;
						var attr1='state_1_room'+num;
						var attr2='state_2_room'+num;
						this.$set(this.formSend,attr1,[]);
						this.$set(this.formSend,attr2,[]);
					}
					
				}
			}
		},
		activated(){
			var updateId=this.$route.params.pkId+this.$route.params.pageState;
			this.orderType = this.$route.params.orderType;
			if(this.updateId !== updateId){
				var params=this.$route.params;
				//this.orderMsg = this.$route.params;
				this.orderMsg={
					orderNumber:params.orderNumber,
					contractNumber:params.contractNumber,
					baseNumber:params.baseNumber,
					orderAddress:params.orderAddress,
					orderId:params.pkId,
					orderState:params.orderState, //订单状态
					operateState:params.operateState //录入图片0，或编辑图片1
				}
				this.pageState=params.pageState;
				for(let i in this.formSend){
					this.formSend[i]=[];
				}
				this.get_2();
				this.updateId=updateId;
			}
		},
		
		beforeMount(){
			
		},
		
	}
</script>

<style scoped>
	.informationDeliveryDetails .info-part{
		background: #fff;
	}
	/*.informationDeliveryDetails .info-part:not(:first-child){
		margin-top: 30px;
	}*/
	.informationDeliveryDetails .info-part{
		padding-top: 10px;
	}
	.informationDeliveryDetails .info-part h3{
		border-left: 3px solid #4db3ff;
		padding-left: 21px;
		margin:8px 0 15px 0;
	}
	.informationDeliveryDetails .info-part ul{
		padding-bottom: 15px;
	}
	.informationDeliveryDetails .info-part ul li{
		position: relative;
		width: 25%;
		box-sizing: border-box;
		float: left;
		padding:0 2% 0 2%;
		margin: 5px 0;
		line-height: 34px;
	}
	.informationDeliveryDetails .info-part ul li.li50{
		width: 50%;
	}
	.informationDeliveryDetails .info-part ul li p.name{
		width: 85px;
		float: left;
		color: rgb(163, 178, 198);
	}
	.informationDeliveryDetails .info-part ul li .inp-box{
		margin-left:85px; 
	}
	.informationDeliveryDetails .info-part ul li.long .inp-box{
		margin-left:135px;
		position: relative;
	}
	

	.informationDeliveryDetails .info-part ul li.strip{
		width: 100%;
	}
	.informationDeliveryDetails .info-part ul li.long p.name{
		width: 135px;
	}
	.informationDeliveryDetails .info-part ul li.middle .inp-box{
		margin-left: 90px;
		position: relative;
	}
	.informationDeliveryDetails .info-part ul li.middle p.name{
		width: 90px;
	}
	.informationDeliveryDetails .info-part ul li .warning-info{
		position: absolute;
		bottom: -27px;
		color: red;
		font-size: 12px;
	}
	.room-tabs { height: 42px; background-color: #F2F4F8; border-left: 1px solid #CBD2D4;margin-top: 10px;}
	.room-tabs ul li { float: left; line-height: 40px; height: 40px; font-size: 16px;border-right: 1px solid #CBD2D4;border-top: 1px solid #CBD2D4;border-bottom: 1px solid #CBD2D4; }
	.room-tabs ul li a { color: #333; display: block;width:168px;height:40px;font-size:16px;text-align: center;background-color: #F5F7F7;}
	.room-tabs ul li a.cur{ border-top: 3px solid #3ba0ff; height: 39px; line-height: 39px;border-bottom: 0;background-color: #fff;}
	.room-tabs ul>span{display: inline-block;width: -moz-calc(100% - 1184px);width: -webkit-calc(100% - 1184px);width: -calc(100% - 1184px);border-bottom: 1px solid #CBD2D4;height: 41px;}
	.room-tabs ul li a .small {font-size: 14px;}
	.room-tabs ul li a:hover {color: #3ba0ff;}
	.showit{display: block;}
	.hideit{display: none;}
	.roomArea{ height: 33px;margin-top: 20px;margin-left: 20px; }
	.roomArea ul li { float: left; line-height: 33px; height: 33px; }
	.roomArea ul li a { color: #333; display: block;width:110px;height:33px;font-size:14px;text-align: center;background-color: #F5F7F7;}
	.roomArea ul li a.cur{ background-color: rgba(59,160,255,1);color: #FFF;}
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
		padding-bottom: 45px;
		background: #FFFFFF;
	}
	.btn-wrap button{
		padding: 8px 22px;
	}
	 .el-upload-list--picture-card .download{
		position: absolute;
		bottom: 0px;
		left: 5px;
		z-index: 10000;
	}
	
</style>