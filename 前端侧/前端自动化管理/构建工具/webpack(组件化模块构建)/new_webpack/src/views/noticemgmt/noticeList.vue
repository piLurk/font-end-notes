<template>
  <div class="noticeList">
    <div class="form-box">
      <el-row :gutter="10">
        <el-col class="item" :md="{span:8}" :lg="{span:6}">
          <p class="tit">分布部门：</p>
          <div class="inp-box">
            <el-select v-model="form.departmentId" placeholder="请选择">
							<el-option v-for="(item,key) in deparments" :label="item.label" :value="item.value" :key="key"></el-option>
						</el-select>
          </div>
        </el-col>
        <el-col class="item middle" :md="{span:8}" :lg="{span:6}">
          <p class="tit middle">关键词搜索：</p>
          <div class="inp-box">
            <el-select v-model="form.code" placeholder="请选择">
							<el-option v-for="(item,key) in deparments" :label="item.label" :value="item.value" :key="key"></el-option>
						</el-select>
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
      <div class="fl">
        <el-button class="icon_button" type="success"><i class="add-icon">+</i>新建公告</el-button>
      </div>
      
      <pagination-table ref="pagenationTable" :initFormQueryFlag='initFormQueryFlag' :pageSize="pageSize" :formQurey="formQurey"  :getData="getAllNotice">
        <template>
          <table class="modtable">
            <thead>
              <th>发布部门</th>
              <th>公告</th>
              <th>状态</th>
              <th>操作</th>
            </thead>
            <tbody>
              <tr v-for="(item, index) in noticeList" :key="index">
                <td>{{item.departmentName}}</td>
                <td>{{item.content}}</td>
                <td>{{item.publishFlag === 0 ? '编辑中' : '已发布'}}</td>
                <td>
                  <span @click="editNotice">
                    <i class="el-icon-edit"></i>
                    编辑
                  </span>
                  
                </td>
              </tr> 
            </tbody>
          </table>
        </template>
      </pagination-table>
    </div>
  </div>
</template>
<script>

  import PaginationTable from '@/components/paginationTable'
  import { getAllNotice } from '@/api/noticemgmt'

  const resetForm = () => {
    return {
      departmentId:'',
      code:''
    }
  }
  export default {
    name: 'noticeList',
    components: { "pagination-table":  PaginationTable },
    data() {
      return {
        pageSize: 10,
        form:{
          userId:'',
          ...resetForm()
        },
        formQurey:{},
        //是否更新子组件fromQuery
        initFormQueryFlag: true,
        noticeList: [],
        deparments:[{
          label:'技术中心',
          id: 10
        }]
      }
    },
    methods: {
      getAllNotice(params) {
        var that = this;
        return getAllNotice({
          params,
          cb(data){
            that.noticeList = data.list;
            that.$message({
              message: '公告列表成功！',
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
        this.formQurey = JSON.parse(JSON.stringify(this.form))

        this.initFormQueryFlag = true;
      },
      noticeReset() {
        this.form = {
          userId: this.form.userId,
          ...resetForm()
        };
        this.formQurey = JSON.parse(JSON.stringify(this.form))
        this.initFormQueryFlag = true;
      },
      editNotice() {

      }
    },
    beforeMount() {
      this.form.userId = this.$store.getters.userId ;
      console.log(this.form.userId)
    }
    
  }
  
</script>
<style lang="scss" scoped>


</style>
