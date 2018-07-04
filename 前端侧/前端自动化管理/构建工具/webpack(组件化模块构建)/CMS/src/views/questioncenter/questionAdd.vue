<template>
  <div class="noticeAdd">
    <el-form
      ref = "form"
      :model="form">
      <h3 class="border-l-h3">{{ isEdit ?  '编辑问题' : '新建问题' }}</h3>
      <div class="form-box">
        <el-row :gutter="10">
          <el-col class="item" :sm="{span:12}" :xs="{span:24}">
            <p class="tit">问题标题：</p>
            <div class="inp-box">
              <el-form-item
                prop="questionTitle"
                :rules="rules.checkQuestionTitle">
                <el-input type="text" v-model.trim="form.questionTitle" placeholder="请输入（50个字符以内）"></el-input>
              </el-form-item>
              
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="item" :sm="{span:6}">
            <p class="tit">问题分类：</p>
            <div class="inp-box">
              <el-form-item
                prop="questionTypeId"
                :rules="rules.isRequired">
                <el-select v-model="form.questionTypeId" placeholder="请选择">
                  <el-option v-for="(item,key) in notStopuestionTypes" :label="item.name" :value="item.id" :key="key"></el-option>
                </el-select>
              </el-form-item>
              
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="notice-wrap">
        <p class="title">问题内容：
          <i v-if="noticeStateName !== ''" :class="{published: publishFlag === '1', edit : publishFlag === '0'}">{{noticeStateName}}</i>
        </p>
        <el-form-item
          prop="questionAnswer"
          :rules="rules.isRequired">
          <tinymce ref="tinymce" :height="400" v-model.trim="form.questionAnswer"></tinymce>
        </el-form-item>
        
        <div class="btn-wrap">
          <el-button type="primary" @click="publishQa">发布</el-button>
          <el-button type="info" @click="resetQa">取消</el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>

  import { createNamespacedHelpers } from 'vuex';
  const { mapGetters, mapActions } = createNamespacedHelpers('questioncenter')

  import { getQuestionDetail, addQuestion, editQuestion } from '@/api/questioncenter'
  // import { noticeUploadFile } from '@/api/noticemgmt';
  import Tinymce from '@/components/Tinymce';

  import { isRequired, isMax } from 'utils/validate'

  const resetForm = () => {
    return {
      questionTitle:'',
      questionTypeId:'',
      questionAnswer:''
    }
  }
  export default {
    name: 'questionAdd',
    components: { Tinymce },
    data() {
      return {
        pageId:'',
        userId:'',
        form: resetForm(),
        publishFlag: '',
        rules: {
          isRequired:{validator: isRequired },
          checkQuestionTitle: { validator: isMax(50), trigger:'blur'}
        },
        questionId:''
      }
    },
    computed: {
      ...mapGetters({
        questionTypes:'questionTypes'
      }),
      notStopuestionTypes() {
        return this.questionTypes.filter( (item) => {
          return item.stopFlag === '0'
        })
      },
      isEdit() {
        return !!this.$route.query.questionId
      },
      noticeStateName() {
        if(this.isEdit) {
          return  this.publishFlag === '0' ? '编辑中' : '已发布'
        }else {
          return ''
        }
      }
    },
    watch: {
      'form.questionAnswer':{
        handler() {
          // 对于没有change表单元素进行验证检测
          this.$refs['form'].validateField('questionAnswer', () => {
          })
        }
      },
      '$route': {
        immediate:true,
        handler() {
          if(this.$route.name ===  'questionAdd') {
            this.initAll()
          }
        }
      }
    },
    methods:{
      ...mapActions({
				getAllquestionType:'getAllquestionType'
      }),
      getText() {
        return this.$refs['tinymce'].getText();
      },
      pageReset() {
        this.clearFormValidate();
        this.form = resetForm();
      },
      pageDataInject(details) {
        let {
          questionTitle = '',
          questionTypeId = '',
          questionAnswer = ''
        } = details;
        this.form = {
          questionTitle,
          questionTypeId,
          questionAnswer,
        }
        this.clearFormValidate()
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
            that.$message({
              type:'error',
              message:'问题详情获取失败！'
            })
          }
        })
      },
      pageChange(view) {
        this.$store.dispatch('delVisitedViews', view).then((views) => {
          const latestView = views.slice(-1)[0]
          this.$router.push({name: 'qaList'})
        })
      },
      publishQa() {
        var that = this,
            route = this.$route;

        this.$refs['form'].validate( ( valid ) => {
          if(!valid) return
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          let contentAbbr = this.getText();
          if(this.isEdit){
            editQuestion({
              data:{
                userId: this.userId,
                id: this.questionId,
                contentAbbr,
                ...this.form
              },
              cb() {
                that.$message({
                  message: '问题发布成功！',
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
                  message: message || '问题发布失败！',
                  type: 'error'
                })
              }
            }).finally( () => {
              loading.close()
            })

          } else {
            addQuestion({
              data:{
                userId:this.userId,
                contentAbbr,
                ...this.form
              },
              cb() {
                that.$message({
                  message: '问题发布成功！',
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
                  message: message || '问题发布失败！',
                  type: 'error'
                })
              }
            }).finally( () => {
              loading.close()
            })
          }

        })
        
      },
      resetQa() {
        let route = this.$route;
        this.pageChange({
          name: route.name,
          path: route.path,
          title: route.meta.title
        });
      },
      initAll() {
        let params = this.$route.query;
        //页面所需数据获取
        this.pageInit();

        if(this.isEdit) {
          // 编辑页，请求数据
          var pageId = `questionAdd&${params.questionId}`;
          if(!this.pageId || this.pageId !== pageId) {
            this.getQuestionDetail({userId:this.userId, questionId: params.questionId})
          }
          this.pageId = pageId;
          this.questionId = params.questionId;
          
        }else {
          // 新增页，重置数据
          this.pageReset()
          
        }
      },
      clearFormValidate() {
        this.$nextTick(() => {
          this.$refs['form'].clearValidate()
        })
      }

    }
   
  }


</script>
<style lang="scss" scoped>
  .btn-wrap {
    padding:20px 0;
    text-align: center;
  }
  

</style>

