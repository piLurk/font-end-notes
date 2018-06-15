<template>
  <div class="noticeList">
    <div class="form-box">
      <el-row :gutter="10">
        <el-col class="item" :md="{span:8}" :lg="{span:6}">
          <p class="tit">问题类型：</p>
          <div class="inp-box">
            <el-select v-model="form.questionTypeId" placeholder="请选择">
							<el-option v-for="(item, key) in questionTypes" :label="item.name" :value="item.id" :key="key"></el-option>
						</el-select>
          </div>
        </el-col>
        <el-col class="item middle" :md="{span:8}" :lg="{span:6}">
          <p class="tit middle">关键词搜索：</p>
          <div class="inp-box">
            <el-input type="text" v-model="form.keyWord" placeholder="请输入关键字"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="item" :md="{span:12}" :lg="{span:12}">
          <p class="tit"></p>
          <div class="inp-box">
           <el-button type="primary" @click="noticeQuery">确定</el-button>
            <el-button type="info" @click="noticeReset">重置</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="table-box">
      <div class="fl table-top-box">
        <router-link ref='tag'
          :to="{ name: 'questionAdd', params: { isEdit: false }}">
          <el-button class="icon_button" type="success"><i class="add-icon">+</i>新建问题</el-button>
        </router-link>
      </div>
      
      <pagination-table ref="pagenationTable" :formQuery="formQuery" :pageSize="pageSize"  :getData="getQuestionList">
          <table class="modtable">
            <thead>
              <th>问题类型</th>
              <th>问题标题</th>
              <th>操作</th>
            </thead>
            <tbody>
              <tr v-for="(item, index) in questionList" :key="index">
                <td>{{item.questionTypeName}}</td>
                <td>{{item.questionTitle}}</td>
                <td>
                  <span class="edit operate" @click="editQuestion(item)">
                    <i class="el-icon-edit"></i>
                    编辑
                  </span>
                  <span class="edit operate" @click="deleteQuestion(item)">
                    <i class="el-icon-delete"></i>
                    删除
                  </span>
                </td>
              </tr> 
            </tbody>
          </table>
      </pagination-table>
    </div>
    <el-dialog
      width="30%"
      :visible.sync="deleteDialogVisible"
      center>
			<div style="margin-bottom: 20px;margin-top: 25px;text-align: center;">
				<img src="/static/images/tips.png" alt="" />
				<span style="font-size: 18px;font-weight: 600;vertical-align: middle;">确定要删除此项？</span>
			</div>
			<div slot="footer" class="dialog-footer">
		    	<el-button @click="deleteDialogVisible = false">取 消</el-button>
		    	<el-button type="primary" @click="sureDelete" >提 交</el-button>
		  	</div>
		</el-dialog>
  </div>
</template>
<script>
  import { createNamespacedHelpers } from 'vuex';
  const { mapGetters, mapActions } = createNamespacedHelpers('questioncenter')

  import PaginationTable from '@/components/paginationTable'
  import { getQuestionList, deleteQuestion } from '@/api/questioncenter'


  const resetForm = () => {
    return {
      questionTypeId:'',
      keyWord:''
    }
  }
  export default {
    name: 'qaList',
    components: { "pagination-table":  PaginationTable },
    data() {
      return {
        userId:'',
        pageSize: 10,
        form: resetForm(),
        formQuery: resetForm(),
        deleteDialogVisible: false,
        questionList: [],
        deleteItem:{},
      }
    },
    computed: {
      ...mapGetters({
        questionTypes:'questionTypes'
      })
    },
    methods: {
      ...mapActions({
				getAllquestionType:'getAllquestionType'
      }),
      refreshList() {
        this.formQuery = JSON.parse(JSON.stringify(this.formQuery));
      },
      getQuestionList(data) {
        var that = this;
        var data = {
          userId: that.userId,
          ...data
        }
        return getQuestionList({
          params:data,
          cb(data){
            that.questionList = data.list;
            that.$message({
              message: '问题列表成功！',
              type: 'success'
            })
          },
          errorCb(){
            that.$message({
              message: '公告列表失败！',
              type: 'error'
            })
          }
        })
      },
      noticeQuery(){
        this.formQuery = JSON.parse(JSON.stringify(this.form))
      },
      noticeReset() {
        this.form = resetForm()
        this.formQuery = JSON.parse(JSON.stringify(this.form))
      },
      pageInit() {
        let questionTypes = this.questionTypes;
        this.userId = this.$store.getters.userId;
        this.getAllquestionType()
        
      },
      editQuestion(question) {
        this.$router.push({ 
          name: 'questionAdd', 
          query: { questionId: question.id}
        })
      },
      deleteQuestion(question) {
        this.deleteItem = question;
        this.deleteDialogVisible = true;

      },
      sureDelete() {
        var that = this;
        deleteQuestion({
          params:{questionId: this.deleteItem.id, userId: this.userId },
          cb() {
            that.refreshList();
            that.$message({
              message: '删除问题成功！',
              type: 'success'
            })
          },
          errorCb(message) {
            that.$message({
              message: message || '删除问题失败！',
              type: 'error'
            })
          }
        }).finally( () => {
          that.deleteDialogVisible = false
        })
      }

    },
    beforeMount() {
      // 初始化页面
      this.pageInit();
    }
    
  }
  
</script>

<style lang="scss" scoped>


</style>
