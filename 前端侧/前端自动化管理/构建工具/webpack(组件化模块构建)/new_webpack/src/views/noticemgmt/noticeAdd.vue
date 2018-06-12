<template>
  <div class="noticeAdd">
    <h3 class="border-l-h3">{{ isEdit ?  '编辑公告' : '新建公告' }}</h3>
    <div class="form-box">
      <el-row :gutter="10">
        <el-col class="item" :sm="{span:12}" :xs="{span:24}">
          <p class="tit">公告标题：</p>
          <div class="inp-box">
            <el-input type="text" v-model="form.title" placeholder="请输入（**个字以内）"></el-input>
          </div>
        </el-col>
        <el-col class="item" :sm="{span:6}" :xs="{span:24}">
          <p class="tit">标签文字：</p>
          <div class="inp-box">
            <el-input type="text" v-model="form.labelMsg" placeholder="请输入（一个字）"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="item" :sm="{span:6}">
          <p class="tit">发布部门：</p>
          <div class="inp-box">
            <el-select v-model="form.departmentName" placeholder="请选择">
							<el-option v-for="(item,key) in departments" :label="item.departmentName" :value="item.departmentName" :key="key"></el-option>
						</el-select>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="item" :xs="{span:24}">
          <p class="tit">设&nbsp;&nbsp;置</p>
          <div class="inp-box">
            <el-checkbox :true-label="1" :false-label="0" v-model="form.stickFlag">置顶</el-checkbox>
            <div class="check-wrap">
              <el-checkbox-group v-model="form.noticeBelongto">
                <el-checkbox label="0">同步到门户</el-checkbox>
                <el-checkbox label="1">管家助手中显示</el-checkbox>
              </el-checkbox-group>
            </div>
            
            
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="notice-wrap">
      <p class="title">公告内容：
        <i v-if="noticeStateName !== ''" :class="{published: publishFlag === '1', edit : publishFlag === '0'}">{{noticeStateName}}</i>
      </p>
      <tinymce :height="300" v-model="content"></tinymce>
    </div>
  </div>
</template>

<script>

  import { createNamespacedHelpers } from 'vuex';
  const { mapGetters, mapActions } = createNamespacedHelpers('noticemgmt');

  // import { noticeUploadFile } from '@/api/noticemgmt';
  import Tinymce from '@/components/Tinymce';

  const resetForm = () => {
    return {
      title:'',
      labelMsg:'',
      departmentName:'',
      fileUrl:'',
      stickFlag:'',
      noticeBelongto:[],
      fileURL:[]
    }
  }
  export default {
    name: 'noticeAdd',
    components: { Tinymce },
    data() {
      return {
        userId:'',
        form: resetForm(),
        isEdit: null,
        publishFlag: '',
        content: '' // 富文本内容
      }
    },
    computed: {
      ...mapGetters({
        departments:'departments'
      }),
      noticeStateName() {
        if(this.isEdit) {
          return  this.publishFlag === '0' ? '编辑中' : '已发布'
        }else {
          return ''
        }
      }
    },
    methods:{
      ...mapActions({
				getAllDepartments:'getAllDepartments'
			}),
      pageReset() {
        this.form = resetForm();
      },
      pageDataInject(details) {
        let {
          title = '',
          labelMsg = '',
          departmentId = '',
          fileUrl = '',
          stickFlag = '',
          noticeBelongto = [],
          fileURL=[],
        } = details;
        this.form ={
          title,
          labelMsg,
          departmentId,
          fileUrl,
          stickFlag,
          noticeBelongto
        }

        this.publishFlag = details.publishFlag;
      },
      pageInit() {
        let departments = this.departments;
        this.userId = this.$store.getters.userId;
        if(!departments || departments.length === 0) {
          this.getAllDepartments()
        }
      },
      getNoticeDetail({userId, noticeId}) {
        let that = this;
        // getNoticeDetail({
        //   params: {
        //     userId,
        //     noticeId
        //   },
        //   cb(data) {
        //     that.pageDataInject({fileURL:data.fileURL, ...data.noticeDetail})
        //   },
        //   errorCb() {
        //     this.$message({
        //       type:'error',
        //       message:'公告详情获取失败！'
        //     })
        //   }
        // })
      } 
    },
    beforeMount() {
      let params = this.$route.params;
      console.log(params)
      let { isEdit } = params;
      this.isEdit = isEdit;

      //页面所需数据获取
      this.pageInit();

      if(isEdit) {
        // 编辑页，请求数据
        this.getNoticeDetail({userId:this.userId, noticeId: params.noticeId})
      }else {
        // 新增页，重置数据
        this.pageReset()
        
      }

      
    }
  }

</script>
<style lang="scss" scoped>
  
  

</style>

