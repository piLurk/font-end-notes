<template>
  <div class="noticeAdd">
    <el-form
      ref="form"
      :model="form">
      <h3 class="border-l-h3">{{ isEdit ?  '编辑公告' : '新建公告' }}</h3>
      <div class="form-box">
        <el-row :gutter="10">
          <el-col class="item" :sm="{span:12}" :xs="{span:24}">
            <p class="tit">公告标题：</p>
            <div class="inp-box">
              <el-form-item
                prop="title"
                :rules="rules.checkNoticeTitle">
                <el-input type="text" v-model="form.title" placeholder="请输入（15个字以内）"></el-input>
              </el-form-item>
              
            </div>
          </el-col>
          <el-col class="item" :sm="{span:6}" :xs="{span:24}">
            <p class="tit">标签文字：</p>
            <div class="inp-box">
              <el-form-item
                prop="labelMsg"
                :rules="rules.checkLabelMsg">
                <el-input type="text" v-model="form.labelMsg" placeholder="请输入（一个字）"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="item" :sm="{span:6}">
            <p class="tit">发布部门：</p>
            <div class="inp-box">
              <el-form-item
                prop="departmentName"
                :rules="rules.isRequired">
                <el-select v-model="form.departmentName" placeholder="请选择">
                  <el-option v-for="(item,key) in departments" :label="item.departmentName" :value="item.departmentName" :key="key"></el-option>
                </el-select>
              </el-form-item>
              
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="item" :xs="{span:24}">
            <p class="tit">设&nbsp;&nbsp;置</p>
            <div class="inp-box">
              <el-checkbox :true-label="1" :false-label="0" v-model="form.stickFlag">置顶</el-checkbox>
              <div class="check-wrap">
                <el-form-item
                  prop="noticeBelongto"
                  :rules="rules.checkNoticeBelongto">
                  <el-checkbox-group v-model="form.noticeBelongto">
                    <el-checkbox label="0">同步到门户</el-checkbox>
                    <el-checkbox label="1">管家助手中显示</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                
              </div>
              
              
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="notice-wrap">
        <p class="title">公告内容：
          <i v-if="noticeStateName !== ''" :class="{published: publishFlag === '1', edit : publishFlag === '0'}">{{noticeStateName}}</i>
        </p>
        <el-form-item
          prop="content"
          :rules="rules.isRequired">
          <tinymce :height="300" v-model="form.content"></tinymce>
        </el-form-item>
        
      </div>
      <div class="upload-wrap">
        <p class="title">附件：</p>
        <el-upload
          class="upload-box"
          :data="{userId}"
          :action="host + '/notice/uploadNoticeFile'"
          :before-remove="handleRemove"
          :on-success="handleSuccess"
          :on-error="handleError"
          :file-list="form.fileList">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </div>
    </el-form>
    <div class="btn-wrap">
      <el-button type="primary" @click="publishNotice">发布</el-button>
      <el-button type="info" @click="saveNotice">保存</el-button>
    </div>
  </div>
</template>

<script>

  import { createNamespacedHelpers } from 'vuex';
  const { mapGetters, mapActions } = createNamespacedHelpers('noticemgmt');

  import { getNoticeDetail, addNotice, editNotice, deleteFile, publishNotice } from '@/api/noticemgmt'
  // import { noticeUploadFile } from '@/api/noticemgmt';
  import Tinymce from '@/components/Tinymce';

  import { isRequired, isMax, isLength, checkboxRequired } from 'utils/validate'
  const resetForm = () => {
    return {
      title:'',
      labelMsg:'',
      departmentName:'',
      stickFlag:'',
      noticeBelongto:[],
      fileList:[], // 文件id数组
      content: '', // 富文本内容
    }
  }
  export default {
    name: 'noticeAdd',
    components: { Tinymce },
    data() {
      return {
        pageId:'',
        noticeId:'',
        userId:'',
        form: resetForm(),
        publishFlag: '',
        rules: {
          isRequired:{validator: isRequired },
          checkNoticeTitle: { validator: isMax(15), trigger:'blur'},
          checkLabelMsg: { validator: isLength(1), trigger:'blur'},
          checkNoticeBelongto: { validator: checkboxRequired, trigger:'change'}
        }
        
      }
    },
    computed: {
      ...mapGetters({
        departments:'departments'
      }),
      noticeStateName() {
        if(this.isEdit) {
          return  this.publishFlag === '0' ? '编辑中' : '已发布'
        } else {
          return ''
        }
      },
      isEdit() {
        return !!this.$route.query.noticeId
      }
    },
    watch: {
      'form.content':{
        handler() {
          // 对于没有change表单元素进行验证检测
            this.$refs['form'].validateField('content', () => {
          })
        }
      },
      '$route': {
        immediate:true,
        handler() {
          let $route = this.$route;
          if($route.name === 'noticeAdd') {
            this.initAll()
          }
        }
      }
    },
    methods:{
      ...mapActions({
				getAllDepartments:'getAllDepartments'
			}),
      pageReset() {
        this.clearFormValidate();
        this.form = resetForm();
        
      },
      pageDataInject(details) {
        details.noticeBelongto = details.noticeBelongto || '';
        let noticeBelongto = details.noticeBelongto.split(',');
        let {
          title = '',
          content = '',
          labelMsg = '',
          departmentName = '',
          stickFlag = ''
        } = details;
        details.fileList = details.fileList || [];
        var fileList = details.fileList.map( (item) => {
          return {
            name: item.fileName,
            url: item.fileUrl,
            fileId: item.id
          }
        })
        this.form ={
          title,
          content,
          labelMsg,
          departmentName,
          stickFlag,
          noticeBelongto,
          fileList
        }

        this.publishFlag = details.publishFlag;
        this.clearFormValidate()
      },
      pageInit() {
       
        let departments = this.departments;
        this.userId = this.$store.getters.userId;
        if(!departments || departments.length === 0) {
          this.getAllDepartments({userId:this.userId})
        }
      },
      getNoticeDetail({userId, noticeId}) {
        let that = this;
        getNoticeDetail({
          params: {
            userId,
            noticeId
          },
          cb(data) {

            that.pageDataInject({fileList: data.portalYunFiles, ...data.noticeDetail})
          },
          errorCb() {
            that.$message({
              type:'error',
              message:'公告详情获取失败！'
            })
          }
        })
      },
      handleRemove(file, fileList) {
        var that = this;
        return new Promise((resolve, reject) => {
          deleteFile({
            params:{
              fileId: file.fileId,
              noticeId: that.noticeId,
              userId: that.userId
            },
            cb() {
              var index = that.form.fileList.findIndex( (ele) => {
                return file.fileId === ele.fileId
              })
              that.form.fileList.splice(index, 1)

              resolve(true)
              that.$message({
                type:'success',
                message:'附件删除成功！'
              })
            },
            errorCb() {
              reject(false)
              that.$message({
                type:'error',
                message:'附件删除失败！'
              })
            }
          })
          
        })
        
      },
      handleSuccess(res, file, fileList) {
        if(res.code !== 0) {
					this.$message.error('文件上传失败！')
					var index = fileList.findIndex( (ele) =>{
						return file.fileId === ele.fileId;
					} )
					fileList.splice(index,1)
				} else {
          var data = res.data;
					var file = {
            name: file.name,
            fileId: data.fileId,
            url: data.fileUrl
          };

				  this.form.fileList.push(file);

				}
      },
      handleError() {
        this.$message.error('文件上传失败')
      },
      pageChange(view) {
        this.$store.dispatch('delVisitedViews', view).then((views) => {
          const latestView = views.slice(-1)[0]
          if (latestView) {
            this.$router.push(latestView.path)
          } else {
            this.$router.push('/')
          }
        })
      },
      publishNotice() {
        var that = this,
            route = this.$route;
        this.$refs['form'].validate( ( valid ) => {
          if(!valid) return
          var form = JSON.parse(JSON.stringify(this.form));
            form.fileIds = that.getfileIds(form);
            form.noticeBelongto = form.noticeBelongto.join(',');
            delete form['fileList']
          
            var publishNoticeApi = this.isEdit ? editNotice : publishNotice;
            publishNoticeApi({
              data: {
                userId: this.userId,
                id: this.noticeId,
                publishFlag: this.isEdit ? '0' : '1',
                ...form
              },
              cb() {
                that.$message({
                  message: '公告发布成功！',
                  type: 'success'
                });
                that.pageChange({
                  name: route.name,
                  path: route.path,
                  title: route.meta.title
                });
              },
              errorCb(message) {
                that.$message({
                  message: message || '公告发布失败！',
                  type: 'error'
                })
              }
            })
          

        })
      },
      getfileIds(form) {
        return form.fileList.map( (item, index) => {
          return item.fileId
        })
      },
      saveNotice() {
        var that = this;
        this.$refs['form'].validate( ( valid ) => {
          if(!valid) return

          var form = JSON.parse(JSON.stringify(this.form));
          

          form.fileIds = that.getfileIds(form);
          form.noticeBelongto = form.noticeBelongto.join(',');
          delete form['fileList']

          var noticeApi = this.isEdit ? editNotice : addNotice;

          noticeApi({
            data:{
              userId: this.userId,
              id: this.noticeId,
              ...form
            },
            cb() {
              that.$message({
                message: '公告保存成功！',
                type: 'success'
              });
            },
            errorCb(message) {
              that.$message({
                message: message || '公告保存失败！',
                type: 'error'
              })
            }
          })
          

        })
      },
      initAll() {
        let params = this.$route.query;

        //页面所需数据获取
        this.pageInit();

        if(this.isEdit) {

          var pageId = `noticeAdd&${params.noticeId}`;
          this.noticeId = params.noticeId;
          if(!this.pageId || this.pageId !== pageId) {
            this.getNoticeDetail({userId:this.userId, noticeId: params.noticeId})
          }

          // 赋予当前页面一个id，用于判断是否应该重新加载数据
          
          this.pageId = pageId;

        }else {
          
          // 新增页，重置数据,并清空检测
          this.pageReset()
          
        }
      },
      clearFormValidate() {
        this.$nextTick(() => {
          this.$refs['form'].clearValidate()
        })
      }
      
    }, 
    activated() {

      

      
    }
  }

</script>
<style lang="scss" scoped>
  .btn-wrap {
    padding:20px 0;
    text-align: center;
  }
  .el-form-item {
      margin-bottom: 0;
  }
  

</style>

