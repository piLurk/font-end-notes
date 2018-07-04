<template>
  <div class="noticeList">
    <div class="table-box">
      <div class="fl table-top-box">
          <el-button @click="createQaType" class="icon_button" type="success"><i class="add-icon">+</i>新建分类</el-button>
      </div>
      
      <pagination-table ref="pagenationTable" :formQuery="formQuery" :pageSize="pageSize"  :getData="getQuestionList">
          <table class="modtable">
            <thead>
              <th>分类名称</th>
              <th>操作</th>
            </thead>
            <tbody>
              <tr v-for="(item, index) in questionTypeList" :key="index">
                <td>{{item.typeName}}</td>
                <td>
                  <span class="edit operate" @click="editQaType(item)">
                    <i class="el-icon-edit"></i>
                    编辑
                  </span>
                  <span class="edit operate" @click="deleteQuestion(item)">
                    <el-switch
                      v-model="item.stopFlag"
                      active-value = "0"
                      inactive-value = "1"
                      active-color="#13ce66"
                      inactive-color="#B3B7BC"
                      @change = "toggleQuestionTypeState(item)">
                    </el-switch>
                  </span>
                </td>
              </tr> 
            </tbody>
          </table>
      </pagination-table>
    </div>

    
    <el-dialog
      width="30%"
      :visible.sync="createDialogVisible"
      class="has-header"
      >
      <h3 slot="title" class="el-dialog__title">{{dialogType == 'add'?'新建':'编辑'}}分类</h3>
      <div class="dialog-form-wrap">
        <el-form
          ref = "createTypeForm" 
          :model="createTypeForm"
          label-width="85px"
          label-position="left">
          <el-form-item
            prop="typeName"
            label="分类名称："
            :rules="rules.checkTypeName">
            <el-input type="text" v-model.trim="createTypeForm.typeName"></el-input>
          </el-form-item>
        </el-form>
        <div class="inp-box">
          <el-button type="info"  @click="createDialogVisible = false">取消</el-button>
          <el-button type="primary"  @click="createTypeSave">保存</el-button>
        </div>
      </div>
      
    </el-dialog>
  </div>
</template>
<script>
  import { createNamespacedHelpers } from 'vuex';
  const { mapActions } = createNamespacedHelpers('questioncenter')
  import PaginationTable from '@/components/paginationTable'
  import { 
    getQuestionTypeList,  
    toggleQuestionTypeState,
    addQuestionType,
    editQuestionType
  } from '@/api/questioncenter'

  const resetCreateTypeForm = () =>  {
    return {
      typeName:'',
      questionTypeId:''
    }
  }

  export default {
    name: 'qaList',
    components: { "pagination-table":  PaginationTable },
    data() {
      var checkTypeName = (rule, value, cb) => {
        if(value === '') {
          return cb(new Error('输入不能为空'))
        }else if(value.length > 6) {
          return cb(new Error('输入字符不能超过6个'))
        }
        cb()
      }
      return {
        userId:'',
        pageSize: 10,
        formQuery: {},
        //是否更新子组件fromQuery
        initFormQueryFlag: true,
        questionTypeList: [],
        createDialogVisible: false,
        createTypeForm: resetCreateTypeForm(),
        rules:{
          checkTypeName: {validator: checkTypeName, trigger:'blur'}
        },
        dialogType:''

      }
    },
    computed: {
    },
    methods: {
      ...mapActions({
				getAllquestionType:'getAllquestionType'
      }),
      getQuestionList(data) {
        var that = this;
        data['userId'] = this.userId;
        return getQuestionTypeList({
          params: data,
          cb(data){
            that.questionTypeList = data.list;
            
          },
          errorCb(){
            that.$message({
              message: '问题分类列表获取失败！',
              type: 'error'
            })
          }
        })
      },
      refreshList() {
        this.formQuery = JSON.parse(JSON.stringify(this.formQuery));
      },
      pageInit() {
        this.userId = this.$store.getters.userId;
      },
      editQaType(questionType) {
        setTimeout( () => {
          this.$refs['createTypeForm'].clearValidate()
        }, 0)
        this.createTypeForm['typeName'] = questionType.typeName;
        this.createTypeForm['questionTypeId'] = questionType.id;
        this.dialogType = 'edit';
        this.createDialogVisible = true;
      },
      deleteQuestion(questionType) {
        
      },
      createQaType() {
        // 先初始化dialog
        setTimeout( () => {
          this.$refs['createTypeForm'].clearValidate()
        }, 0)
        this.createTypeForm['typeName'] = '';
        this.createDialogVisible = true;
        this.dialogType = 'add';
      },
      createTypeSave() {
        var that = this;
        this.$refs['createTypeForm'].validate(valid => {
          if(valid) { 
            let data = {
              typeName: this.createTypeForm.typeName,
              userId: this.userId
            }
            let type = this.dialogType;
            let saveApi = ( type === 'edit' ?  editQuestionType : addQuestionType );

            if(type === 'edit') {
              data['questionTypeId'] = this.createTypeForm.questionTypeId;
            }
            saveApi({
              params:data,
              cb() {
                that.refreshList();
                that.$message({
                  message: type === 'edit' ? '分类新建成功！' : '分类修改成功！',
                  type: 'success'
                });
                that.getAllquestionType();
              
              },
              errorCb(message) {
                that.$message({
                  message: message || type === 'edit' ? '分类新建失败！' : '分类修改失败！',
                  type: 'error'
                })
              }
            }).finally(() => {
              that.createDialogVisible = false
            })
          }
        })
        
      },
      getStateName(stopFlag) {
        if(stopFlag === '1') {
          return '停用'
        }
        return '启用'
      },
      toggleQuestionTypeState (item) {
        var that = this;
        toggleQuestionTypeState({
          params: {
            userId: this.userId,
            questionTypeId:item.id
          },
          cb() {
            let statName = that.getStateName(item.stopFlag);
            that.$message({
              message: `${item.typeName}${statName}成功！`,
              type: 'success'
            })
            that.getAllquestionType();
          },
          errorCb() {
            let statName = that.getStateName(item.stopFlag);
            if(item.stopFlag === '0') {
              item.stopFlag = '1'
            }else {
              item.stopFlag = '0'
            }
            that.$message({
              message: `${item.typeName}${statName}失败！`,
              type: 'error'
            })
          }
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
  .dialog-form-wrap {
    padding: 8px 30px 10px;
  }

</style>
