<template>
  <div class="noticeList">
    <div class="form-box">
      <el-row :gutter="10">
        <el-col class="item" :md="{span:8}" :lg="{span:6}">
          <p class="tit">分布部门：</p>
          <div class="inp-box">
            <el-select v-model="form.departmentName" placeholder="请选择">
							<el-option v-for="item in departments" :label="item.departmentName" :value="item.departmentName" :key="item.departmentName"></el-option>
						</el-select>
          </div>
        </el-col>
        <el-col class="item middle" :md="{span:8}" :lg="{span:6}">
          <p class="tit middle">关键词搜索：</p>
          <div class="inp-box">
            <el-input type="text" v-model="form.keywords" placeholder="请输入关键字"></el-input>
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
          :to="{ name: 'noticeAdd', params: { title: '新建公告' }}">
          <el-button class="icon_button" type="success"><i class="add-icon">+</i>新建公告</el-button>
        </router-link>
      </div>
      
      <pagination-table ref="pagenationTable" :formQuery="formQuery" :pageSize="pageSize"  :getData="getAllNotice">
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
                <td>
                  <span v-if="item.stickFlag === '1'" class="tip">置顶</span>
                  <router-link ref='tag'
                    :to="{ name: 'noticeAdd', query: { title: '公告详情',noticeId: item.id }}">
                    <span class="tit" >{{item.title}}</span>
                  </router-link>
                  
                  <div class="b_msg">
                    <span>发布日期：&nbsp;{{item.gmtModified | toDate('{y}-{m}-{d}')}}</span>
                    <span><i class="icon eyes"></i>&nbsp;&nbsp;浏览量：{{item.viewTimes}}</span>
                  </div>


                </td>
                <td :class="{success: item.publishFlag === '0'}">{{item.publishFlag === '0' ? '编辑中' : '已发布'}}</td>
                <td>
                  <router-link ref='tag'
                    :to="{ name: 'noticeAdd', query: { title: '编辑公告', noticeId: item.id } }">
                    <span class="edit operate">
                      <i class="el-icon-edit"></i>
                      编辑
                    </span>
          
                  </router-link>
                  
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
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("noticemgmt");

import PaginationTable from "@/components/paginationTable";
import { getAllNotice } from "@/api/noticemgmt";

const resetForm = () => {
  return {
    departmentName: "",
    keywords: ""
  };
};
export default {
  name: "noticeList",
  components: { "pagination-table": PaginationTable },
  data() {
    return {
      userId: "",
      pageSize: 10,
      form: resetForm(),
      formQuery: resetForm(),
      //是否更新子组件fromQuery
      initFormQueryFlag: true,
      noticeList: []
    };
  },
  computed: {
    ...mapGetters({
      departments: "departments"
    })
  },
  methods: {
    ...mapActions({
      getAllDepartments: "getAllDepartments"
    }),
    getAllNotice(data) {
      var that = this;
      var data = {
        userId: that.userId,
        ...data
      };
      return getAllNotice({
        params: data,
        cb(data) {
          that.noticeList = data.list;
          that.$message({
            message: "公告列表成功！",
            type: "success"
          });
        },
        errorCb() {
          that.$message({
            message: "公告列表请求失败！",
            type: "error"
          });
        }
      });
    },
    noticeQuery() {
      this.formQuery = JSON.parse(JSON.stringify(this.form));
    },
    noticeReset() {
      this.form = resetForm();
      this.formQuery = JSON.parse(JSON.stringify(this.form));
    },
    pageInit() {
      let departments = this.departments;
      this.userId = this.$store.getters.userId;
      if (!departments || departments.length === 0) {
        this.getAllDepartments({ userId: this.userId });
      }
    },
    editNotice(notice) {
      this.$router.push({
        name: "noticeAdd",
        params: { noticeId: notice.id, title:'编辑公告' }
      });
    },
    noticeDetail(notice) {
      this.$router.push({
        name: "noticeDetail",
        params: { noticeId: notice.id, title:'公告详情' }
      });
    }
  },
  beforeMount() {
    // 初始化页面
    this.pageInit();
  }
};
</script>
<style lang="scss" scoped>
  .modtable {
    td {
      position: relative;
      line-height: 25px;
      padding: 5px 0;
      .tip {
        display: inline-block;
        position: absolute;
        left: -40px;
        width: 32px;
        height: 20px;
        line-height: 20px;
        margin-right: 5px;
        color: #fff;
        border-radius: 2px;
        background-color: #ff5569;
        font-size: 12px;
        text-align: center;
        transform: scale(0.9);
        &:after {
          content: "";
          display: inline-block;
          position: absolute;
          top: 6px;
          right: -2px;
          width: 6px;
          height: 6px;
          transform: rotate(45deg);
          background-color: #ff5569;
        }
      }
      .tit {
        font-size: 14px;
        color: #576578;
      }
      .b_msg {
        color: #a3b2c6;
        font-size: 12px;
        span:not(:last-child) {
          margin-right: 35px;
        }
        .icon{
          display: inline-block;
          width:16px;
          height: 11px;
          &.eyes{
            background: url(/static/images/eye.png)
          }
        }
      }
    }
  }
</style>
