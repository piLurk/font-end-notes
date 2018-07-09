<template>
  <div class="qaDetail page-detail">
    <div class="detail-top">
      <h3 class="title">
        <span class="q-tip"></span>
        {{form.questionTitle}}
      </h3>
      <p class="view-msg">
        <span>发布日期：{{form.gmtCreate | toDate('{y}-{m}-{d}')}}</span>
        <span class="view">浏览量：{{form.viewCount}}</span>
        <span class="good">{{form.resolvedCount}}</span>
        <span class="bad">{{form.unsolvedCount}}</span>
      </p>
      <p class="state-detail">
        
        <span>问题分类：{{form.questionTypeName}}</span>
      </p>
    </div>
    <div class="detail-content">
      <span class="a-tip"></span>
      <div v-html="form.questionAnswer"></div>
    </div>
  </div>
</template>

<script>

  import { mapGetters } from 'vuex';

  import { getQuestionDetail_2 } from '@/api/questioncenter'


  const resetForm = () => {
    return {
      questionTitle:'',
      gmtCreate:'', //发布日期
      viewCount:'', //浏览量
      resolvedCount:'', //赞
      unsolvedCount:'', //踩
      questionTypeName:'', //问题分类名
      questionAnswer: '', //问题内容
    }
  }
  export default {
    name: 'qaDetail',
    data() {
      return {
        pageId:'',
        questionId:'',
        form: resetForm()
      }
    },
    computed: {
      ...mapGetters({
        userId: 'userId'
      })
    },
    watch: {
      '$route': {
        immediate:true,
        handler() {
          
          if(this.$route.name ===  'qaDetail') {
            if(this.$route.query && this.$route.query.questionId) {
              this.initAll()
            }else{
              let route = this.$route;
              //没有noticeId，跳转公告列表
              location.href="/questioncenter/qaList";
            }
          }
          
          
        }
      }
    },
    methods:{
      pageDataInject(details) {
        let {
          questionTitle='',
          gmtCreate='', //发布日期
          viewCount='', //浏览量
          resolvedCount='', //赞
          unsolvedCount='', //踩
          questionTypeName='', //问题分类名
          questionAnswer= '' //问题内容
        }  = details;
        this.form = {
          questionTitle,
          gmtCreate, //发布日期
          viewCount, //浏览量
          resolvedCount, //赞
          unsolvedCount, //踩
          questionTypeName, //问题分类名
          questionAnswer, //问题内容
        }


      },
      getQuestionDetail({userId, questionId}) {
        let that = this;
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        getQuestionDetail_2({
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
        }).finally( () => {
          loading.close()
        })
      },
      initAll() {
        let params = this.$route.query;

        //页面所需数据获取
          var pageId = `qaDetail&${params.questionId}`;
          this.questionId = params.questionId;

          if(!this.pageId || this.pageId !== pageId) {
            this.getQuestionDetail({userId:this.userId, questionId: params.questionId})
          }
          // 赋予当前页面一个id，用于判断是否应该重新加载数据
          this.pageId = pageId;


      }
      
    }
  }

</script>
<style lang="scss" scoped>

  

</style>

