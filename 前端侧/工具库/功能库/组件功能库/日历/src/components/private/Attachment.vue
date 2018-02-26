<template>
	<div :id="pageId">
		<ul class="file-ul">
			<li>
				<h3>个人照片<p  class="tip">支持扩展名：.jpg&nbsp;&nbsp;.jpeg&nbsp;&nbsp;.bmp&nbsp;&nbsp;.png且不能超过10M</p></h3>
				<ul class="clearfix">
					<div class="item-box personAttach">
						<el-upload :with-credentials="true"  :disabled="readOnly" :file-list="personAttach" :before-upload="beforeUploadImage" :data="{id:manId}" list-type="picture-card" class="upload-demo" :action="host+'/employeeInfo/savePersonAttach.json'" :on-success="handleSuccess" :on-preview="handlePreview" :on-remove="handleRemove">
						  <i class="el-icon-plus"></i>
						</el-upload>				
					</div>
					<li>
					</li>
				</ul>
			</li>
			<li class="file">
				<h3>简历<p class="tip">支持扩展名：.doc&nbsp;&nbsp;.docx&nbsp;&nbsp;且不能超过10M</p></h3>	
				<div class="item-box" id="resumeAttachs">
					<el-upload :with-credentials="true" :disabled="readOnly" :file-list="resumeAttachs"  :before-upload="beforeDocUpload" :data="{id:manId}" :action="host+'/employeeInfo/saveResumeAttach'" :on-remove="handleRemove">
					  <el-button  size="small" type="primary">点击上传</el-button>
					</el-upload>
				</div>
			</li>
			<li>
				<h3>征信截图<p  class="tip">支持扩展名：.jpg&nbsp;&nbsp;.jpeg&nbsp;&nbsp;.bmp&nbsp;&nbsp;.png且不能超过10M</p></h3>	
				<div class="item-box" id="creditAttachs">
					<el-upload :with-credentials="true"  :disabled="readOnly" :file-list="creditAttachs" :before-upload="beforeUploadImage" :data="{id:manId}" list-type="picture-card" class="upload-demo" :action="host+'/employeeInfo/saveCreditAttach.json'" :on-preview="handlePreview" :on-remove="handleRemove">
					  <i class="el-icon-plus"></i>
					  
					</el-upload>				
				</div>
			</li>
			<li>
				<h3>毕业证书<p class="tip">支持扩展名：.jpg&nbsp;&nbsp;.jpeg&nbsp;&nbsp;.bmp&nbsp;&nbsp;.png且不能超过10M</p></h3>
				<div class="item-box" id="graduateAttachs">
					<el-upload :with-credentials="true" :disabled="readOnly" :file-list="graduateAttachs" :before-upload="beforeUploadImage" :data="{id:manId}" list-type="picture-card" class="upload-demo" :action="host+'/employeeInfo/saveGraduateAttach.json'" :on-preview="handlePreview" :on-remove="handleRemove">
					  <i class="el-icon-plus"></i>
					</el-upload>				
				</div>
			</li>
			<li>
				<h3>学位证书<p class="tip">支持扩展名：.jpg&nbsp;&nbsp;.jpeg&nbsp;&nbsp;.bmp&nbsp;&nbsp;.png且不能超过10M</p></h3>
				
				<div class="item-box" id="degreeAttachs">
					<el-upload :with-credentials="true" :disabled="readOnly" :file-list="degreeAttachs" :before-upload="beforeUploadImage" :data="{id:manId}" list-type="picture-card" class="upload-demo" :action="host+'/employeeInfo/saveDegreeAttach.json'" :on-preview="handlePreview" :on-remove="handleRemove">
					  <i class="el-icon-plus"></i>
					  
					</el-upload>				
				</div>
			</li>
			<li>
				<h3>学信网截图<p class="tip">支持扩展名：.jpg&nbsp;&nbsp;.jpeg&nbsp;&nbsp;.bmp&nbsp;&nbsp;.png且不能超过10M</p></h3>
				
				<div class="item-box" id="hirerightAttachs">
					<el-upload :with-credentials="true" :disabled="readOnly" :file-list="hirerightAttachs" :before-upload="beforeUploadImage" :data="{id:manId}" list-type="picture-card" class="upload-demo" :action="host+'/employeeInfo/saveHirerightAttach.json'" :on-preview="handlePreview" :on-remove="handleRemove">
					  <i class="el-icon-plus"></i>
					  
					</el-upload>				
				</div>
			</li>
			<li class="file">
				<h3>其他附件<p class="tip">支持扩展名：.jpg&nbsp;&nbsp;.jpeg&nbsp;&nbsp;.bmp&nbsp;&nbsp;.png&nbsp;&nbsp;.doc&nbsp;&nbsp;.docx&nbsp;&nbsp;且不能超过10M</p></h3>			
				<div class="item-box" id="otherAttachs">
					<el-upload :with-credentials="true" :disabled="readOnly" :file-list="otherAttachs" :before-upload="beforeUploadFile" :data="{id:manId}" :action="host+'/employeeInfo/saveOtherAttach.json'" :on-remove="handleRemove">
					  <el-button size="small" type="primary">点击上传</el-button>
					  
					</el-upload>	
				</div>
			</li>
		</ul>
		<div class="btn-wrap">
			<button v-if="!readOnly" @click="pageChange('query')" class="btn btn-primary">确认</button>
		</div>
		<el-dialog v-model="dialogVisible" size="tiny">
	  		<img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
	</div>
</template>
<script type="text/javascript">
	export default{
		props:['addpersonId','isAddPage','personId','currentViewId','readOnly'],
		data(){
			return{
				dialogImageUrl: '',
        		dialogVisible: false,
        		manId:'',
        		pageId:'',
        		personAttach:[], //个人照片
        		resumeAttachs:[], //简历
        		creditAttachs:[],//征信截图
        		graduateAttachs:[],//毕业证书
        		degreeAttachs:[],//学位证书
        		hirerightAttachs:[],//学信网截图
        		otherAttachs:[]//其他附件
			}
		},
		methods:{
			getAttachFile(personId){
				var that=this;
				this.getAjax(this.host,'/employeeInfo/findUserInfoDetailById.json',{id:personId}).success(function(r){
					if (r.code===0) {
						that.resumeAttachs=getAttachArr(r.data.resumeAttachs);
						that.creditAttachs=getAttachArr(r.data.creditAttachs);
						that.graduateAttachs=getAttachArr(r.data.graduateAttachs);
						that.degreeAttachs=getAttachArr(r.data.degreeAttachs);
						that.hirerightAttachs=getAttachArr(r.data.hirerightAttachs);
						that.otherAttachs=getAttachArr(r.data.otherAttachs);
						if (!!r.data.personAttach) {
							that.personAttach=getAttachArr([r.data.personAttach]);
							
						}else{
							that.personAttach=[];
						}
						

						setTimeout(function(){
							if (that.resumeAttachs.length!==0) {
								that.resumeAttachs.forEach(function(item,i){
									$('#resumeAttachs .el-upload-list li').eq(i).append('<a  class="download" href="'+that.host+'/employeeInfo/downloadFile?id='+item.id+'" download="'+item.name+'">下载</a>');
								});
							}
							if (that.otherAttachs.length!==0) {
								that.otherAttachs.forEach(function(item,i){
									$('#otherAttachs .el-upload-list li').eq(i).append('<a  class="download" href="'+that.host+'/employeeInfo/downloadFile?id='+item.id+'" download="'+item.name+'">下载</a>')
								});
							}

						},0)
						
					}else{
						that.$message.error(r.message);
					}
				}).error(function(e){
					that.$message.error('服务器错误');
				})
			},
			handleRemove(file, fileList) {
				//展示或则当前上传的文件
				var id,that=this;
				if (!!file.response) {
					//当前上传的
					id=file.response.data;
				}else{
					//编辑页展示的
					id=file.id;
				}
				this.getAjax(this.host,'/employeeInfo/delAttach.json',{id,id}).success(function(r){
					if (r.code==0) {
						that.$message('删除成功');
					}else{
						that.$message.error(e.message);
					}
				}).error(function(e){
					that.$message.error('服务器错误')
				})
			},
			pageChange(componentName){
				this.$store.dispatch('itemArrAdd',{component:'query',id:'query'});
				this.$store.state.mutations.currentViewId='query';
				var $target=$('#side-menu').find('a.J_menuItem[data-href="query"]');
				$target.trigger('click');

				var dataId=this.pageId.split('-')[1];
				var $close=$('.page-tabs-content a[data-id='+dataId+'] .fa-times-circle');
				$close.trigger('click');
				
			},
		    handlePreview(file) {
		        this.dialogImageUrl = file.url;
        		this.dialogVisible = true;
		    },
		    handleSuccess(res,file,fileList){
		    	var $targetList=$('#'+this.pageId+' .personAttach .el-upload-list');
		    	var str='#'+this.pageId+' .personAttach';
		    	var $targetList=$(str).find('.el-upload-list li');
		    	if ($targetList.length>1) {
		    		$targetList.filter(':not(:last-child)').remove();
		        }
		    },
		    beforeDocUpload(file) {
		        const isDoc = checkType(['application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/msword'],file.type);
		        const isLt10M = file.size / 1024 / 1024 < 10;

		        if (!isDoc) {
		        
		          this.$message.error('上传文件只能是指定格式!')
		        }
		        if (!isLt10M) {
		          this.$message.error('上传文件大小不能超过 10MB!');
		        }
		        return isDoc && isLt10M;
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
		    beforeUploadFile(file) {
		        const isJPG = checkType(['image/jpeg','image/bmp','image/png','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/msword'],file.type);
		        const isLt10M = file.size / 1024 / 1024 < 10;
		        if (!isJPG) {
		         
		          this.$message.error('上传文件只能是指定格式!')
		        }
		        if (!isLt10M) {
		          this.$message.error('上传文件大小不能超过 10MB!');
		        }
		        return isJPG && isLt10M;
		    }
		},
		created:function(){
			this.pageId='personInfo-'+this.currentViewId;
		},
		beforeMount:function(){
			if (this.isAddPage) {
				//新增页面
				this.manId=this.addpersonId;
			}else{
				//编辑页面	
				this.manId=this.personId;
				this.getAttachFile(this.personId);
			}
		}
	}
	function checkType(arr,type) {
		for(var i=0 ;i<arr.length;i++){
			if (arr[i]==type) {
				return true;
			}
		}
		return false;
	}
	//转换为需要的数组
	function getAttachArr(arr){
		if (!!arr && Object.prototype.toString.apply(arr) === '[object Array]' && arr.length!==0) {
			var myArr=[];
			arr.forEach(function(item,i){
				var obj={};
				obj['name']=item.attachName;
				obj['url']=item.attachUrl;
				obj['id']=item.id;
				myArr.push(obj);
			});
			return myArr;
		}else{
			return[];
		}
	}
</script>
<style type="text/css">
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
		background: url(/src/assets/images/file.png) no-repeat;
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