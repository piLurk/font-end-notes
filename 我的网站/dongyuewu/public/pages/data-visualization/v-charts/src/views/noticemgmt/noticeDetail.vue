<template>
  <div class="noticeDetail page-detail">
    <div class="detail-top">
      <h3 class="title">
        <span v-if="form.stickFlag !== '1'" class="setTop-tip">置顶</span>
        {{form.title}}
        <span class="label-tip">{{form.labelMsg}}</span>
      </h3>
      <p class="view-msg">
        <span>发布日期：{{form.gmtModified | toDate('{y}-{m}-{d}')}}</span>
        <span>浏览量：{{form.viewTimes}}</span>
      </p>
      <p class="state-detail">
        <span v-if="form.noticeBelongto.indexOf('0') !== -1" class="state-target">同步到门户</span>
        <span v-if="form.noticeBelongto.indexOf('1') !== -1" class="state-target">管家助手中显示</span>
        

        <span :class="{'state-publish': true,published: form.publishFlag === '1', edit : form.publishFlag === '0'}">{{form.publishFlag === '0' ? '编辑中' : '已发布'}}</span>
      </p>
    </div>
    <div class="detail-content">
      <div v-html="form.content"></div>
    </div>
    <div class="file-box">
      <ul class="file-list" >
        <li v-for="item in form.fileList" :key="item.id">
          <span class="file-name">{{item.fileName}}</span>
          <a href="item.fileUrl" download></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

  import { mapGetters } from 'vuex';

  import { getNoticeDetail } from '@/api/noticemgmt'


  const resetForm = () => {
    return {
      stickFlag:'', //是否置顶
      labelMsg:'', //标签文字
      title:'',
      gmtModified: '', //发布时间
      viewTimes: '', //浏览量
      noticeBelongto:'', // 同步位置
      published: '', //是否发布
      content: '', // 富文本内容
      fileList:[], // 文件文件列表
      
    }
  }
  export default {
    name: 'noticeDetail',
    data() {
      return {
        pageId:'',
        noticeId:'',
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
          
          if(this.$route.name ===  'noticeDetail') {
            if(this.$route.query && this.$route.query.noticeId) {
              this.initAll()
            }else{
              let route = this.$route;
              //没有noticeId，跳转公告列表
              location.href="/noticemgmt/noticeList";
            }
          }
          
          
        }
      }
    },
    methods:{
      pageDataInject(details) {
        let {
          stickFlag='', //是否置顶
          labelMsg='', //标签文字
          title='',
          gmtModified= '', //发布时间
          viewTimes= '', //浏览量
          noticeBelongto='', // 同步位置
          published= '', //是否发布
          content= '', // 富文本内容
          fileList=[] // 文件文件列表
        }  = details;
        this.form = {
          stickFlag, //是否置顶
          labelMsg, //标签文字
          title,
          gmtModified, //发布时间
          viewTimes, //浏览量
          noticeBelongto, // 同步位置
          published, //是否发布
          content, // 富文本内容
          fileList, // 文件文件列表
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
      initAll() {
        let params = this.$route.query;

        //页面所需数据获取
          var pageId = `noticeDetail&${params.noticeId}`;
          this.noticeId = params.noticeId;
          if(!this.pageId || this.pageId !== pageId) {
            this.getNoticeDetail({userId:this.userId, noticeId: params.noticeId})
          }

          // 赋予当前页面一个id，用于判断是否应该重新加载数据
          
          this.pageId = pageId;

      }
      
    }
  }

</script>
<style lang="scss" scoped>

  

</style>

