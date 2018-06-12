<template>
  <div class="noticeList">
    <div class="form-box">
      <el-row :gutter="10">
        <el-col class="item" :md="{span:8}" :lg="{span:6}">
          <p class="tit">问题类型：</p>
          <div class="inp-box">
            <el-select v-model="form.departmentName" placeholder="请选择">
							<el-option v-for="(item, key) in departments" :label="item.departmentName" :value="item" :key="key"></el-option>
						</el-select>
          </div>
        </el-col>
        <el-col class="item middle" :md="{span:8}" :lg="{span:6}">
          <p class="tit middle">关键词搜索：</p>
          <div class="inp-box">
            <el-input type="text" v-model="form.code" placeholder="请输入关键字"></el-input>
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
          :to="{ name: 'noticeAdd', params: { isEdit: false }}">
          <el-button class="icon_button" type="success"><i class="add-icon">+</i>新建公告</el-button>
        </router-link>
      </div>
      
      <pagination-table ref="pagenationTable" :formQuery="formQuery" :pageSize="pageSize"  :getData="getAllNotice">
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
                <td :class="{success: item.publishFlag === 0}">{{item.publishFlag === 0 ? '编辑中' : '已发布'}}</td>
                <td>
                  <span class="edit operate" @click="editNotice(item)">
                    <i class="el-icon-edit"></i>
                    编辑
                  </span>
                </td>
              </tr> 
            </tbody>
          </table>
      </pagination-table>
    </div>
  </div>
</template>
<script>
  import { createNamespacedHelpers } from 'vuex';
  const { mapGetters, mapActions } = createNamespacedHelpers('noticemgmt')

  import PaginationTable from '@/components/paginationTable'
  import { getAllNotice } from '@/api/noticemgmt'


  const resetForm = () => {
    return {
      departmentId:'',
      code:''
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
        //是否更新子组件fromQuery
        initFormQueryFlag: true,
        noticeList: []
      }
    },
    computed: {
      ...mapGetters({
        departments:'departments'
      })
    },
    methods: {
      ...mapActions({
				getAllDepartments:'getAllDepartments'
			}),
      getAllNotice(data) {
        var that = this;
        return getAllNotice({
          data,
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
        this.formQuery = JSON.parse(JSON.stringify(this.form))
      },
      noticeReset() {
        this.form = resetForm()
        this.formQuery = JSON.parse(JSON.stringify(this.form))
      },
      pageInit() {
        let departments = this.departments;
        this.userId = this.$store.getters.userId;
        if(!departments || departments.length === 0) {
          this.getAllDepartments()
        }
      },
      editNotice(notice) {
        this.$route.to({ 
          name: 'noticeAdd', 
          params: { isEdit: true,  noticeId: notice.id}})
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
