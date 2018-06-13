<template>
  <div class="noticeAdd">
    <h3 class="border-l-h3">{{ isEdit ?  '编辑问题' : '新建问题' }}</h3>
    <div class="form-box">
      <el-row :gutter="10">
        <el-col class="item" :sm="{span:12}" :xs="{span:24}">
          <p class="tit">问题标题：</p>
          <div class="inp-box">
            <el-input type="text" v-model="form.questionTitle" placeholder="请输入（20个字以内）"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="item" :sm="{span:6}">
          <p class="tit">问题分类：</p>
          <div class="inp-box">
            <el-select v-model="form.questionTypeId" placeholder="请选择">
							<el-option v-for="(item,key) in questionTypes" :label="item.name" :value="item.id" :key="key"></el-option>
						</el-select>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="notice-wrap">
      <p class="title">问题内容：
        <i v-if="noticeStateName !== ''" :class="{published: publishFlag === '1', edit : publishFlag === '0'}">{{noticeStateName}}</i>
      </p>
      <tinymce :height="300" v-model="content"></tinymce>
    </div>
  </div>
</template>

<script>

  import { createNamespacedHelpers } from 'vuex';
  const { mapGetters, mapActions } = createNamespacedHelpers('questioncenter')

  import { getQuestionDetail } from '@/api/questioncenter'
  // import { noticeUploadFile } from '@/api/noticemgmt';
  import Tinymce from '@/components/Tinymce';

  const resetForm = () => {
    return {
      questionTitle:'',
      departmentName:'',
      stickFlag:''
    }
  }
  export default {
    name: 'questionAdd',
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
        questionTypes:'questionTypes'
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
				getAllquestionType:'getAllquestionType'
			}),
      pageReset() {
        this.form = resetForm();
      },
      pageDataInject(details) {
        let {
          questionTitle = '',
          departmentId = '',
          stickFlag = ''
        } = details;
        this.form ={
          questionTitle,
          departmentId,
          stickFlag,
        }

        this.publishFlag = details.publishFlag;
      },
      pageInit() {
        let questionTypes = this.questionTypes;
        this.userId = this.$store.getters.userId;
        if(!questionTypes || questionTypes.length === 0) {
          this.getAllquestionType()
        }
      },
      getQuestionDetail({userId, questionId}) {
        let that = this;
        getQuestionDetail({
          params: {
            userId,
            questionId
          },
          cb(data) {
            that.pageDataInject(data)
          },
          errorCb() {
            this.$message({
              type:'error',
              message:'问题详情获取失败！'
            })
          }
        })
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
        this.getQuestionDetail({userId:this.userId, questionId: params.questionId})
      }else {
        // 新增页，重置数据
        this.pageReset()
        
      }

      
    }
  }

</script>
<style lang="scss" scoped>
  
  

</style>

