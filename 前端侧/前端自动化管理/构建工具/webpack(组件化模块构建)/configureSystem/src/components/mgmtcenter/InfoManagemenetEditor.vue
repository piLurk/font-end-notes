<template>

	<div id="infoManagementEditor" class="addPages pic_carousel_page">
		<div class="wrap">
			<el-form :model="formSend" :inline="true" ref="formSend" label-position="left" >
				<div class="info-part">
					<div class="info-part-inner">
						<h3>订单信息</h3>
						<ul class="clearfix inpWrap orderPart">
							<li class="long">
								<p class="name">订单编号：</p>
								<div class="inp-box">
									{{orderNumber}}
								</div>
							</li>
							<li>
								<p class="name">收房合同：</p>
								<div class="inp-box">
									{{contractNumber}}
								</div>
							</li>
              <li>
								<p class="name">房源编号：</p>
								<div class="inp-box">
									{{baseNumber}}
								</div>
							</li>
              <li>
								<p class="name">物业地址：</p>
								<div class="inp-box">
									{{orderAddress}}
								</div>
							</li>
						</ul>
						<h3>编辑房屋信息</h3>
						<ul class="inpWrap clearfix">
							<li class="long">
								<el-form-item label="宽带是否集中处理" prop="propertyInfo.isUse" :rules="rules.needSel">
									<el-select filterable v-model="formSend.propertyInfo.isUse" placeholder="请选择">
										<el-option v-for="(item,key) in isHaves"  :label="item.name" :value="item.value" :key="key"></el-option>
									</el-select>
								</el-form-item>
							</li>
							<li>
								<el-form-item label="宽带是否首次安装" prop="propertyInfo.isInstall" :rules="rules.needSel">
									<el-select filterable v-model="formSend.propertyInfo.isInstall" placeholder="请选择">
										<el-option v-for="(item,key) in isHaves"  :label="item.name" :value="item.value" :key="key"></el-option>
									</el-select>
								</el-form-item>
							</li>
						</ul>
						<div v-if="orderTypeName==='新收订单'">
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
														<el-input v-model="item.houseArea" placeholder="请输入">
															<template slot="append">m²</template>
														</el-input>
													</el-form-item>
												</td>
												<td>
													<el-form-item :prop="'listRoomInfo['+i+'].houseStyle'" :rules="rules.needSel">
														<el-select v-model="item.houseStyle" placeholder="请选择">
															<el-option v-for="(item,key) in houseStyles"  :label="item.name" :value="item.name" :key="key"></el-option>
														</el-select>
													</el-form-item>
												</td>
												<td>
													<el-form-item :prop="'listRoomInfo['+i+'].isHeating'" :rules="rules.needSel">
														<el-select v-model="item.isHeating" placeholder="请选择">
															<el-option v-for="(item,key) in isHaves"  :label="item.name" :value="item.value" :key="key"></el-option>
														</el-select>
													</el-form-item>
												</td>
												<td>
													<el-form-item :prop="'listRoomInfo['+i+'].isConditioner'" :rules="rules.needSel">
														<el-select v-model="item.isConditioner" placeholder="请选择">
															<el-option v-for="(item,key) in isHaves"  :label="item.name" :value="item.value" :key="key"></el-option>
														</el-select>
													</el-form-item>
												</td>
												<td>
													<el-form-item :prop="'listRoomInfo['+i+'].houseOrientation'" :rules="rules.needSel">
														<el-select filterable v-model="item.houseOrientation" placeholder="请选择">
															<el-option v-for="(item,key) in houseOrientations"  :label="item.name" :value="item.name" :key="key"></el-option>
														</el-select>
													</el-form-item>
												</td>
												<td>
													<el-form-item :prop="'listRoomInfo['+i+'].isToilet'" :rules="rules.needSel">
														<el-select  
															@change="itemIsToiletChange(item)" v-model="item.isToilet" placeholder="请选择">
															<el-option v-for="(item,key) in isHaves"   :label="item.name" :value="item.value" :key="key"></el-option>
														</el-select>
													</el-form-item>
												</td>
												<td>
													<el-form-item :prop="'listRoomInfo['+i+'].toiletArea'" :rules="item.isToilet === 0?rules.noCheck:rules.checkNum">
														<el-input :disabled="item.isToilet === 0" :readonly="(pageState==='readOnly')" v-model="item.toiletArea" placeholder="请输入">
															<template slot="append">m²</template>
														</el-input>
													</el-form-item>											
												</td>
												<td>
													<el-form-item :prop="'listRoomInfo['+i+'].balconyType'" :rules="rules.needSel">
														<el-select filterable v-model="item.balconyType" 
															@change="itemBalconyTypeChange(item)" placeholder="请选择">
															<el-option v-for="(item,key) in balconyTypes"  :label="item.name" :value="item.name" :key="key"></el-option>
														</el-select>
													</el-form-item>
												</td>
												<td>
													<el-form-item :prop="'listRoomInfo['+i+'].balconyArea'" :rules="item.balconyType === '无'?rules.noCheck:rules.checkNum">
														<el-input :disabled="item.balconyType === '无'" :readonly="(pageState==='readOnly')"  v-model="item.balconyArea" placeholder="请输入">
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
														<el-input v-model="item.houseArea" placeholder="请输入">
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
														<el-select  @change="item.theirHouse=null" v-model="item.remark" placeholder="请选择">
															<el-option v-for="(item,key) in remarks"  :label="item.name" :value="item.name" :key="key"></el-option>
														</el-select>
													</el-form-item>
												</td>
												<td>
													<el-form-item :prop="'listRoomInfo['+i+'].houseArea'" :rules="rules.checkNum">	
														<el-input v-model="item.houseArea" placeholder="请输入">
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
									<el-form-item :label="item.sectionType+item.bedroomNum+'所属房间'" :prop="'listRoomInfo['+i+'].theirHouse'" :rules="rules.needSel">
										<el-select filterable v-model="item.theirHouse" placeholder="请选择">
											<el-option v-for="(item,key) in theirHouses"  :label="item.name" :value="item.name" :key="key"></el-option>
										</el-select>
									</el-form-item>
								</li>
							</ul>
						</div>
					</div>
					
				</div>
        <div class="info-part">
          <div class="info-part-inner">
            <h3>编辑图片信息</h3>
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
                    <el-form-item prop="listPhotoInfo.livingRoom_2" :rules="getPubImgRule(1)">
                      <el-upload :with-credentials="true"  
                        :disabled="readOnly" 
                        :file-list="formSend.listPhotoInfo['livingRoom_2']" 
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
                    <el-form-item prop="listPhotoInfo.kitchen_2" :rules="getPubImgRule(1)">
                      <el-upload :with-credentials="true"  
                        :disabled="readOnly" 
                        :file-list="formSend.listPhotoInfo['kitchen_2']" 
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
                    <el-form-item prop="listPhotoInfo.toilet_2" :rules="getPubImgRule(1)">
                      <el-upload :with-credentials="true"  
                      :disabled="readOnly" 
                      :file-list="formSend.listPhotoInfo['toilet_2']" 
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
                    <el-form-item :prop="'listPhotoInfo.'+'state_2_room'+(item.bedroomNum-0)" :rules="getImgCheck(1)">
                      <el-upload 
											:with-credentials="true"  
                      :disabled="readOnly"
                      :file-list="formSend.listPhotoInfo['state_2_room'+(item.bedroomNum-0)]" 
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
						<div class="btn-wrap">
							<el-button type="primary" @click="saveHouseInfo">保存</el-button>
						</div>
          </div>
					
        </div>
				<div class="info-part">
					<div class="info-part-inner">
						<h3>变更记录</h3>
						<div class="tableBox">
							<table class="modtable supplierTable" width="100%" border="0" cellpadding="0" cellspacing="0" >
								<thead>
									<tr>
										<th>序号</th>
										<th>变更时间</th>
										<th>变更人</th>
										<th>变更内容</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(item,i) in infoChangeList" :key="i">
										<td>{{i+1}}</td>
										<td>{{new Date(item.date-0).getBJTime()}}</td>
										<td>{{item.userId}}</td>
										<td>{{item.content}}</td>
									</tr>
								</tbody>                  	
							</table>
						</div>
					</div>
				</div>
			</el-form>
			
		</div>
		

		<el-dialog v-model="dialogVisible" :title="dialogTile" class="dialog_large" size="large">
      <el-carousel @change="carouselChange" :autoplay="false"  ref="carouselRef">
        <el-carousel-item v-for="item in imgShowList" :key="item.title">
          <img width="100%"  :src="item.url" :alt="item.title">
        </el-carousel-item>
      </el-carousel>
		</el-dialog>
	</div>
</template>
<script type="text/javascript">
import {
  getHouseMsg_2,
} from "../../api/housemeasuremgmt";
import {
  getInfoChangeList,
  saveInfoChangeList,
  getHousePic
} from "../../api/mgmtcenter";
import {
	houseStyles,
	houseOrientations,
	isHaves,
	balconyTypes,
	tolitTypes,
	houseInfoItems,
} from "../public/options.config"
const isHavesArr=['否','是'];

const picTypeList={
	// livingRoom_1:{photoType:3,photoSource:30,index:1,state:0},
	// kitchen_1:{photoType:3,photoSource:31,index:1,state:0},
	// toilet_1:{photoType:3,photoSource:32,index:1,state:0},
	// roomtype:{photoType:3,photoSource:33,index:1,state:0},
	livingRoom_2:{photoType:3,photoSource:30,index:1,state:1},
	kitchen_2:{photoType:3,photoSource:31,index:1,state:1},
	toilet_2:{photoType:3,photoSource:32,index:1,state:1},
	bedroom:{photoType:3,photoSource:'',index:1}
}
function checkType(arr,type) {
	for(var i=0 ;i<arr.length;i++){
		if (arr[i]==type) {
			return true;
		}
	}
	return false;
}
const sectionTypeMap = {
  'livingRoom': '客厅',
  'kitchen':'厨房',
  'toilet':'卫生间'
}

	export default{
		name:"infoManagementEditor",
		props:['isAddPage','addpersonId','personId','currentViewId','readOnly'],
		data(){
			var checkNum=(rule , value, cb) =>{
				if(value === ''){
					return cb(new Error('输入不能为空！'))
				}
				if(!/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value)){
					return cb(new Error('输入值不能小于0！'))
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
			};
			var noCheck= (rule,value,cb) => {
				cb();
			}
			return {
				isHaves:isHaves,
				pageState:'',
				orderPkId:'',
				orderType:'',
        orderTypeName:'',
        orderNumber:'', // 订单编号
        contractNumber:'', //收房合同
        baseNumber:'',//房源编号
        orderAddress:'',//物业地址
				updateId:'',
				houseStyles:houseStyles,
				houseOrientations:houseOrientations,
				balconyTypes:balconyTypes,	
				remarks:tolitTypes,
				RoomVo:[], //房间列表			
				formSend:{
					orderPkId:'',
					listRoomInfo:[],
					propertyInfo:{
						isUse:'',
						isInstall:'',
					},
					listPhotoInfo: {
						livingRoom_2:[],
						kitchen_2:[],
						toilet_2:[],
					}
        },
				preForm:{
					listRoomInfo:[],
					propertyInfo:{
						isUse:'',//是否集中处理
						isInstall:'',//是否首次安装
					},
					listPhotoInfo: {
						livingRoom_2:[],
						kitchen_2:[],
						toilet_2:[],
					}
				},
				rules:{
					checkNum:{validator:checkNum,trigger:'blur'},
					needSel:{validator:needSel,trigger:'change'},
					noCheck:{validator:noCheck}
				},
				infoChangeList:[],
				departoptions:[],
				departoptionId:'',
				pickerOptions0: {
		          disabledDate(time) {
		            return time.getTime() < Date.now() - 8.64e7;
		          }
				},
				canSubmitAlone:true,
        activeWrong:false,
        isActiveArea:0, // 公共区域
        dialogVisible:false,
        dialogTile:'',
        imgShowList:[],
        imgIndex:'', // 点击图片在imgShowList中的位置
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
						this.$set(this.formSend.listPhotoInfo,attr1,[]);
						this.$set(this.formSend.listPhotoInfo,attr2,[]);
					}
					
				}
			}
		},
		computed:{
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
					// livingRoom_1:picTypeList.livingRoom_1,
					// kitchen_1:picTypeList.kitchen_1,
					// toilet_1:picTypeList.toilet_1,
					// roomtype:picTypeList.roomtype,
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

        
      	var listPhotoInfo = this.formSend.listPhotoInfo;

        for(let key in listPhotoInfo){
					if(key === 'roomtype') {
            //户型图，属于 配置前-公共区域-户型图
            listPhotoInfo[key].map( (item, i) => {
              listObj['state_1_public'].push({
                title:'配置前-公共区域-户型图' + '(' + (i+1) +')',
                url: item.url
              })
            }); 
            continue;
          }
          var {targetKey, targetTitle} = this.getKeyAndTile(key);

          listPhotoInfo[key].map( (item, i) => {
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
			getKeyAndTile(key) {
				var stateName ='', state = '',  // 配置前后
            areaName = '', area = '', // 公共区域或卧室
            sectionTypeName =''; // 区域名字

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
				return {targetKey, targetTitle}
			},
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
			saveHouseInfo(){
				var preForm=JSON.parse(JSON.stringify(this.preForm));
				var nowForm=JSON.parse(JSON.stringify(this.formSend));
				this.$refs['formSend'].validate((valid) => {
					if(valid){
						var data={};
						data['changeList']=[];
						if(preForm.propertyInfo.isUse!==nowForm.propertyInfo.isUse){
							data.changeList.push('宽带是否集中处理由{'+(!preForm.propertyInfo.isUse && preForm.propertyInfo.isUse!==0 ?'':isHavesArr[preForm.propertyInfo.isUse])+'}变更为{'+isHavesArr[nowForm.propertyInfo.isUse]+'}')
						}
						if(preForm.propertyInfo.isInstall!==nowForm.propertyInfo.isInstall){
							data.changeList.push('宽带是否首次安装由{'+(!preForm.propertyInfo.isInstall && preForm.propertyInfo.isInstall!==0?'':isHavesArr[preForm.propertyInfo.isInstall])+'}变更为{'+isHavesArr[nowForm.propertyInfo.isInstall]+'}')
						}
						for(let  item of preForm.listRoomInfo){
							var i = preForm.listRoomInfo.indexOf(item);
							for(let k in item){
								if(nowForm.listRoomInfo[i][k] !==item[k]){
									//独卫所属房间
									if(k === 'theirHouse'){
										data.changeList.push(item.sectionType+item.bedroomNum+'所属房间'+'由{'+(!item[k] && item[k]!==0?'':item[k])+'}变更为{'+nowForm.listRoomInfo[i][k]+'}');
										continue;
									}
									//变动功能区间
									if(houseInfoItems[k].isBoolean){
										data.changeList.push(item.sectionType+item.bedroomNum+houseInfoItems[k].text+'由{'+(!item[k] && item[k] !==0?'':isHavesArr[item[k]])+'}变更为{'+isHavesArr[nowForm.listRoomInfo[i][k]]+'}')
									}else{
										data.changeList.push(item.sectionType+item.bedroomNum+houseInfoItems[k].text+'由{'+(!item[k] && item[k]!==0?'':item[k])+'}变更为{'+nowForm.listRoomInfo[i][k]+'}');
									}
								}
							}
						}
						var prelistPhotoInfo = preForm.listPhotoInfo,
								nowlistPhotoInfo = nowForm.listPhotoInfo;
						
						var photoChangeList = [];
						for(let key in nowlistPhotoInfo) {
							
							let {targetTitle} = this.getKeyAndTile(key);
							
							if( prelistPhotoInfo[key].length ===  nowlistPhotoInfo[key].length ){
								// 是否存在一个在现有图片列表对于原图片图片列表中找不到。
								var flag = nowlistPhotoInfo[key].some((item, index) => {

									// 原图片列表中所有都不等这个url
									return prelistPhotoInfo[key].every( (preItem) => {
										return preItem.url !== item.url
									})
								});
								if(flag) {
									photoChangeList.push(`${targetTitle}的图片发生变更`)
								}
							}else {
								photoChangeList.push(`${targetTitle}的图片发生变更`)
							}
						}
						nowForm.orderPkId=this.orderPkId;

						if(photoChangeList.length > 0) {
							// 图片变更，上传图片，否则不传
							var listPhotoInfo = [];
							for(let item in nowForm.listPhotoInfo){
								nowForm.listPhotoInfo[item].map( (pic, index) => {
									pic['photoUrl'] = pic.url;
									pic['sort'] = index + 1;
									listPhotoInfo.push( pic )
								} )
							}
							nowForm.listPhotoInfo = listPhotoInfo;
							data.changeList.push(...photoChangeList);
						}else{
							delete nowForm.listPhotoInfo
						}

						
						data={...data,...nowForm};
						saveInfoChangeList(
							data,
							providers => {
								this.$message({type:'success',message:'房屋信息修改成功！'});
								this.$store.dispatch("itemArrRemove", {
									id: this.$route.name,
									to: {
										id: "infoManagementQuery",
										name: "房屋信息变更列表页",
										params: {}
									}
								});
							},
							(message) => this.$message({ type: "error", message:message.indexOf('@') !== -1?message.split('@')[1]: "房屋信息修改失败！" })
						)
							}
				})
			},
			get_2(){
				getHouseMsg_2(
					this.orderPkId,
					providers => {
						this.$refs['formSend'].resetFields();
						var RoomVo=providers.RoomVo.map(ele=>({
							sectionType: ele.sectionType,
							bedroomNum:ele.bedroomNum,
							remark: ele.remark,
							theirHouse:ele.theirHouse,
							houseArea:ele.houseArea,
							houseStyle:ele.houseStyle,
							isHeating:ele.isHeating,
							isConditioner:ele.isConditioner,
							houseOrientation:ele.houseOrientation,
							isToilet:ele.isToilet,
							toiletArea:ele.toiletArea,
							balconyType:ele.balconyType,
							balconyArea:ele.balconyArea,
						}))
						this.formSend.listRoomInfo=RoomVo;
						this.RoomVo = RoomVo;
						this.preForm.listRoomInfo=JSON.parse(JSON.stringify(RoomVo));
						this.formSend.propertyInfo.isUse=providers.PropertyInfo.isUse;
						this.formSend.propertyInfo.isInstall=providers.PropertyInfo.isInstall;
						this.formSend.propertyInfo.pkId=providers.PropertyInfo.pkId;
						this.formSend.propertyInfo.orderId=providers.PropertyInfo.orderId;
						this.preForm.propertyInfo.isUse=providers.PropertyInfo.isUse;
						this.preForm.propertyInfo.isInstall=providers.PropertyInfo.isInstall;

						//获取图片
						this.getPhotos();
						
					},
					(message) => console.error(message)
				);
			},
			getInfoChangeList(){
				getInfoChangeList(
					{orderId:this.orderPkId},
					providers => {
						this.infoChangeList=providers;
					},
					() => this.$message({ type: "error", message:message.indexOf('@') !== -1?message.split('@')[1]: "房屋信息变更记录获取失败！" })
				)
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
						this.formSend.listPhotoInfo[attr].push(obj);
						this.picType[attr].index+=1;
					}
				}
			},
			foo_r(attr){
				return (file, fileList) =>{
					var delUrl=file.url;
					this.picType[attr].index--;
					var arr=this.formSend.listPhotoInfo[attr];
					for(let i=0;i<arr.length;i++){
						if(arr[i].url === delUrl){
							arr.splice(i,1);
							break;
						}
					}
				}
      },
      
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
      getPhotos(type){
				let pkId = this.orderPkId;
				getHousePic(
					pkId,
					providers => {	
						var items = providers && providers.configPhotos || [];
						for(let i of items){
							i['url']=i['photoUrl'];
							if(i.photoSource===30 || i.photoSource===0){
								i.state===1?this.formSend.listPhotoInfo.livingRoom_2.push(i):this.formSend.listPhotoInfo.livingRoom_1.push(i)
								continue
							}
							if(i.photoSource===31 || i.photoSource===1){
								i.state===1?this.formSend.listPhotoInfo.kitchen_2.push(i):this.formSend.listPhotoInfo.kitchen_1.push(i)
								continue
							}
							if(i.photoSource===32 || i.photoSource===2){
								i.state===1?this.formSend.listPhotoInfo.toilet_2.push(i):this.formSend.listPhotoInfo.toilet_1.push(i)
								continue
							}
							if(i.photoSource>300 && i.photoSource<400){
								var str=i.state===1?'state_2_room'+(i.photoSource -300):'state_1_room'+(i.photoSource -300);
								if(str in this.formSend.listPhotoInfo){
									this.formSend.listPhotoInfo[str].push(i);
								}
							}else if(i.photoSource>100 && i.photoSource<200){
								var str=i.state===1?'state_2_room'+(i.photoSource -100):'state_1_room'+(i.photoSource -100);
								if(str in this.formSend.listPhotoInfo){
									this.formSend.listPhotoInfo[str].push(i);
								}
							}
						}

						//原图片列表 
						this.preForm.listPhotoInfo = JSON.parse(JSON.stringify(this.formSend.listPhotoInfo));

						for(let i in this.picType){
							this.picType[i].index = this.formSend.listPhotoInfo[i].length;
						}	
					},
					(message) => this.$message({ type: "error", message:"图片获取失败！" })
				)
			}
		},
		activated(){
			var updateId=this.$route.params.pkId+this.$route.pageState;
			if(updateId !== this.updateId){
				this.orderPkId=this.$route.params.pkId;
				this.pageState = this.$route.params.pageState;
        this.orderTypeName=this.$route.params.orderTypeName;
        this.orderType = this.$route.params.orderType;
        this.orderNumber  = this.$route.params.orderNumber;
        this.contractNumber = this.$route.params.contractNumber; 
        this.baseNumber = this.$route.params.baseNumber; 
        this.orderAddress = this.$route.params.orderAddress;
				this.get_2();
				this.getInfoChangeList();
				this.updateId=updateId;
			}
		}
		
	}
</script>

<style type="text/css" scoped>
	.white-line{height: 20px;width: 100%;background-color: #fff;}
	.tableBox{padding: 15px 24px;box-sizing: border-box;}
	.addPages .info-part{
		background-color: #f2f4f8;
	}

  .addPages .info-part h3.no_border{border-left: none;padding-left: 24px;}
  .addPages .info-part ul.inpWrap li{
    width: 30%;
  }
  .orderPart{
    border-bottom: 3px solid #f2f4f8;
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
	.addPages .roomArea{ height: 33px;margin-top: 20px;margin-left: 20px; }
	.addPages .roomArea ul li { float: left; line-height: 33px; height: 33px; width: auto;padding: 0;}
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
	#infoManagementEditor .file-ul{padding-bottom: 50px;}
	#infoManagementEditor .file-ul .item-box{padding-left: 20px;padding-bottom: 30px;}
	
	#infoManagementEditor .file-ul>li{padding-top: 25px;width: auto;float: none;}
	#infoManagementEditor .file-ul h3{border-left: 3px solid #4db3ff;padding-left: 30px;margin-bottom: 25px;}
	#infoManagementEditor .file-ul>li.file .el-upload-list>li{
		display: inline-block;
		width: 105px;
		padding: 0 10px;
		margin-top: 15px;
		vertical-align: top;
	}
	#infoManagementEditor .file-ul>li.file .el-upload-list>li a.el-upload-list__item-name{
		width: 80px;
		height: 125px;
		box-sizing: border-box;
		background: url(/static/images/file.png) no-repeat;
		background-size: contain;
		padding-top: 95px;
	}
	#infoManagementEditor .file-ul>li.file .el-icon-close{
		top:0;
		right: 10px;
	}
	#infoManagementEditor .file-ul>li.file .el-upload-list__item-status-label{
		top:-6px;
		right: 10px
	}
	#infoManagementEditor .file-ul>li.file .el-icon-document{
		display: none;
	}
	#infoManagementEditor .file-ul>li.file .el-upload-list__item:hover{
		background-color: #fff;
	}
</style>
<style type="text/css">
	#infoManagementEditor .el-upload-list--picture-card .el-upload-list__item { 
		width: 148px; 
		margin: 0 8px 8px 0;
		padding:0;
	}
</style>
